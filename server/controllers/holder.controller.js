import Holder from "../mongodb/models/holder.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import axios from "axios";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllHolders = async (req, res) => {
  const { _limit } = req.query;

  const query = {};

  try {
    const count = await Holder.countDocuments({ query });

    const holders = await Holder.find(query).limit(_limit);

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(holders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHolderWalletAddress = async (req, res) => {
  const { _limit } = req.query;

  const query = {};

  try {
    const holders = await Holder.find(query).select("wallet_address -_id").limit(_limit);

    res.status(200).json(holders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHolderDetail = async (req, res) => {
  const { address } = req.params;
  const holderExists = await Holder.findOne({ wallet_address: address });

  if (holderExists) {
    res.status(200).json(holderExists);
  } else {
    res.status(404).json({ message: "Holder not found" });
  }
};

const createHolder = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const newHolder = await Holder.create({
      ...req.body,
    });

    await session.commitTransaction();

    res.status(200).json({ message: "Holder created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHolder = async (req, res) => {
  try {
    const { address } = req.params;

    await Holder.findOneAndUpdate(
      { wallet_address: address },
      {
        ...req.body,
      }
    );

    res.status(200).json({ message: "Holder updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHolder = async (req, res) => {
  try {
    const { address } = req.params;

    const holderToDelete = await Holder.findOne({ wallet_address: address });

    if (!holderToDelete) throw new Error("Holder not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    holderToDelete.remove({ session });
    holderToDelete.creator.allHolders.pull(holderToDelete);

    await holderToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Holder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHolderAndAsset = async (req, res) => {
  const { contract_address } = req.params;
  
  var num = 1000;
  try {
    const params = new URLSearchParams();
    params.append("module", "token");
    params.append("action", "getTokenHolders");
    params.append("contractaddress", contract_address);
    params.append("page", 1);
    params.append("offset", num);
    axios
      .get("https://blockscout.scroll.io/api?" + params.toString())
      .then((response) => {
        var result = response.data.result;
        var sum = 0;
        result.map((holder) => {
          sum += parseInt(holder.value);
        });
        
        var percent1 = 0;
        var percent_5 = 0;
        var percent_2 = 0;
        var percent_1 = 0;
        var percent_other = 0;

        result.map((holder) => {
          var percent = parseFloat(holder.value) * 100 / sum;
          if (percent >= 1) {
            percent1 += 1;
          } else if (percent >= 0.5) {
            percent_5 += 1;
          } else if (percent >= 0.2) {
            percent_2 += 1;
          } else if (percent >= 0.1) {
            percent_1 += 1;
          }
        });

        percent_other = num - percent1 - percent_5 - percent_2 - percent_1;
        
        res.status(200).json({
          "> 1%": percent1 * 100 / num,
          "> 0.5%": percent_5 * 100 / num,
          "> 0.2%": percent_2 * 100 / num,
          "> 0.1%": percent_1 * 100 / num,
          "other": percent_other * 100 / num,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabelAndHolder = async (req, res) => {
  const { contract_address } = req.params;
  const { _limit } = req.query;

  try {
    const holders = await Holder.find({
      "assets.crypto_holdings.tokens": {
        $elemMatch: {
          contract_address: contract_address,
        },
      },
    }).limit(_limit);

    if (holders) {
      // 1. get all the labels
      var labelSet = new Set();
      holders.map((holder) => {
        holder.assets.crypto_holdings.tokens.map((token) => {
          for (let label of token.label) {
            labelSet.add(label);
          }
        });
        holder.assets.crypto_holdings.transaction_activities.label.map(
          (label) => {
            labelSet.add(label);
          }
        );
        holder.assets.nft_holdings.tokens.map((token) => {
          for (let label of token.label) {
            labelSet.add(label);
          }
        });
        holder.assets.nft_holdings.transaction_activities.label.map((label) => {
          labelSet.add(label);
        });
        holder.social.social_activities.map((activity) => {
          for (let label of activity.labels) {
            labelSet.add(label);
          }
        });
        holder.third_party_recommendations.token_labels.map((label) => {
          labelSet.add(label);
        });
        holder.third_party_recommendations.token_recommendations.map(
          (recommendation) => {
            for (let label of recommendation.label) {
              labelSet.add(label);
            }
          }
        );
      });
      var labels = Array.from(labelSet);

      var response = [];
      // 2. get the number of each label
      labels.map((label) => {
        var label12 = {
          label: {},
          other_labels: [],
        };
        var obj = {};
        obj[label] = getHolderNumOfLabel(label, holders);
        label12["label"] = obj;
        labels.map((label2) => {
          if (label2 == label) return;
          var obj = {};
          obj[label2] = getHolderNumOfTwoLabel(label, label2, holders);
          if (obj[label2] != 0) label12["other_labels"].push(obj);
        });
        response.push(label12);
      });

      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Holder not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getHolderNumOfLabel(label, holders) {
  var count = 0;
  holders.map((holder) => {
    holder.assets.crypto_holdings.tokens.map((token) => {
      if (token.label.includes(label)) {
        count += 1;
      }
    });
    if (
      holder.assets.crypto_holdings.transaction_activities.label.includes(label)
    ) {
      count += 1;
    }
    holder.assets.nft_holdings.tokens.map((token) => {
      if (token.label.includes(label)) {
        count += 1;
      }
    });
    if (
      holder.assets.nft_holdings.transaction_activities.label.includes(label)
    ) {
      count += 1;
    }
    holder.social.social_activities.map((activity) => {
      if (activity.labels.includes(label)) {
        count += 1;
      }
    });
    if (holder.third_party_recommendations.token_labels.includes(label)) {
      count += 1;
    }
    holder.third_party_recommendations.token_recommendations.map(
      (recommendation) => {
        if (recommendation.label.includes(label)) {
          count += 1;
        }
      }
    );
  });
  return count;
}

function getHolderNumOfTwoLabel(label1, label2, holders) {
  var count = 0;
  holders.map((holder) => {
    holder.assets.crypto_holdings.tokens.map((token) => {
      if (token.label.includes(label1) && token.label.includes(label2)) {
        count += 1;
      }
    });
    if (
      holder.assets.crypto_holdings.transaction_activities.label.includes(
        label1
      ) &&
      holder.assets.crypto_holdings.transaction_activities.label.includes(
        label2
      )
    ) {
      count += 1;
    }
    holder.assets.nft_holdings.tokens.map((token) => {
      if (token.label.includes(label1) && token.label.includes(label2)) {
        count += 1;
      }
    });
    if (
      holder.assets.nft_holdings.transaction_activities.label.includes(
        label1
      ) &&
      holder.assets.nft_holdings.transaction_activities.label.includes(label2)
    ) {
      count += 1;
    }
    holder.social.social_activities.map((activity) => {
      if (activity.labels.includes(label1) && activity.labels.includes(label2)) {
        count += 1;
      }
    });
    if (
      holder.third_party_recommendations.token_labels.includes(label1) &&
      holder.third_party_recommendations.token_labels.includes(label2)
    ) {
      count += 1;
    }
    holder.third_party_recommendations.token_recommendations.map(
      (recommendation) => {
        if (
          recommendation.label.includes(label1) &&
          recommendation.label.includes(label2)
        ) {
          count += 1;
        }
      }
    );
  });
  return count;
}

export {
  getAllHolders,
  getHolderDetail,
  createHolder,
  updateHolder,
  deleteHolder,
  getHolderAndAsset,
  getLabelAndHolder,
  getAllHolderWalletAddress
};
