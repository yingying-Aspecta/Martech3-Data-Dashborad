import Holder from "../mongodb/models/holder.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllHolders = async (req, res) => {
  const { _end, _order, _start, _sort } = req.query;

  const query = {};

  try {
    const count = await Holder.countDocuments({ query });

    const holders = await Holder.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(holders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHolderDetail = async (req, res) => {
  const { id } = req.params;
  const holderExists = await Holder.findOne({ _id: id });

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
    const { id } = req.params;

    await Holder.findByIdAndUpdate(
      { _id: id },
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
    const { id } = req.params;

    const holderToDelete = await Holder.findById({ _id: id });

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

  try {
    const holders = await Holder.find({
      "assets.crypto_holdings.tokens": {
        $elemMatch: {
          contract_address: contract_address,
        },
      },
    });

    if (holders) {
      var holderResponse = holders.map((holder) => {
        return {
          wallet_address: holder.wallet_address,
          value: holder.assets.crypto_holdings.tokens.find(
            (token) => token.contract_address === contract_address
          ).Amount,
        };
      });
      res.status(200).json(holderResponse);
    } else {
      res.status(404).json({ message: "Holder not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabelAndHolder = async (req, res) => {
  const { contract_address } = req.params;

  try {
    const holders = await Holder.find({
      "assets.crypto_holdings.tokens": {
        $elemMatch: {
          contract_address: contract_address,
        },
      },
    });

    if (holders) {
        // 1. get all the labels
        var labelSet = new Set();
        holders.map((holder) => {
            holder.assets.crypto_holdings.tokens.map((token) => {
                for (let label of token.label) {
                    labelSet.add(label);
                }
            });
        });
        var labels = Array.from(labelSet);

        // 2. get the number of each label
        var counts = [];
        labels.map((label) => {
            var count = 0;
            holders.map((holder) => {
                holder.assets.crypto_holdings.tokens.map((token) => {
                    if (token.label.includes(label)) {
                        count += 1;
                    }
                });
            });
            counts.push(count);
        });

        res.status(200).json({
            labels: labels,
            counts: counts,
        }); 
    } else {
      res.status(404).json({ message: "Holder not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllHolders,
  getHolderDetail,
  createHolder,
  updateHolder,
  deleteHolder,
  getHolderAndAsset,
  getLabelAndHolder,
};
