import Oracle from "../mongodb/models/oracle.js";
import Holder from "../mongodb/models/holder.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";

const getHolderOracleDetail = async (req, res) => {
  const { address } = req.params;
  const holder = await Holder.findOne({ wallet_address: address });

  if (holderExists) {
    // 1. get all the labels
    var labelSet = new Set();
    holder.assets.crypto_holdings.tokens.map((token) => {
      for (let label of token.label) {
        labelSet.add(label);
      }
    });
    holder.assets.crypto_holdings.transaction_activities.label.map((label) => {
      labelSet.add(label);
    });
    holder.assets.nft_holdings.tokens.map((token) => {
      for (let label of token.label) {
        labelSet.add(label);
      }
    });
    holder.assets.nft_holdings.transaction_activities.label.map((label) => {
      labelSet.add(label);
    });
    holder.social.social_activities.map((activity) => {
      for (let label of activity.label) {
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

    var nft_attitude_oracle = 0;
    var token_attitude_oracle = 0;
    var recent_active_trader_type_oracle = 0;
    var active_trader_type_oracle = 0;
    var whale_type_oracle = 0;
    var dealer_oracle = 0;
    var higher_risk_appetite_oracle = 0;

    if (labelSet.has("nft_positive")) nft_attitude_oracle = 1;
    else nft_attitude_oracle = 0;
    if (labelSet.has("nft_negative")) nft_attitude_oracle = 0;
    else nft_attitude_oracle = 1;

    if (labelSet.has("token_positive")) token_attitude_oracle = 1;
    else token_attitude_oracle = 0;
    if (labelSet.has("token_negative")) token_attitude_oracle = 0;
    else token_attitude_oracle = 1;

    if (labelSet.has("recent_active_nft_trader") && !labelSet.has("recent_active_token_trader")) {
        recent_active_trader_type_oracle = 2;
    } else if (!labelSet.has("recent_active_nft_trader") && labelSet.has("recent_active_token_trader")) {
        recent_active_trader_type_oracle = 1;
    } else if (labelSet.has("recent_active_nft_trader") && labelSet.has("recent_active_token_trader")) {
        recent_active_trader_type_oracle = 3;
    } else {
        recent_active_trader_type_oracle = 0;
    }

    if (labelSet.has("active_nft_trader") && !labelSet.has("active_token_trader")) {
        active_trader_type_oracle = 2;
    } else if (!labelSet.has("active_nft_trader") && labelSet.has("active_token_trader")) {
        active_trader_type_oracle = 1;
    } else if (labelSet.has("active_nft_trader") && labelSet.has("active_token_trader")) {
        active_trader_type_oracle = 3;
    } else {
        active_trader_type_oracle = 0;
    }

    if (labelSet.has("nft_whale") && !labelSet.has("token_whale")) {
        whale_type_oracle = 2;
    } else if (!labelSet.has("nft_whale") && labelSet.has("token_whale")) {
        whale_type_oracle = 1;
    } else if (labelSet.has("nft_whale") && labelSet.has("token_whale")) {
        whale_type_oracle = 3;
    } else {
        whale_type_oracle = 0;
    }

    if (labelSet.has("dealer")) dealer_oracle = 1;
    else dealer_oracle = 0;

    if (labelSet.has("higher_risk_appetite")) higher_risk_appetite_oracle = 1;
    else higher_risk_appetite_oracle = 0;

    const newOracle = await Oracle.create({
      "nft_attitude_oracle": nft_attitude_oracle,
      "token_attitude_oracle": token_attitude_oracle,
      "recent_active_trader_type_oracle": recent_active_trader_type_oracle,
      "active_trader_type_oracle": active_trader_type_oracle,
      "whale_type_oracle": whale_type_oracle,
      "dealer_oracle": dealer_oracle,
      "higher_risk_appetite_oracle": higher_risk_appetite_oracle,
    });
    res.status(200).json(newOracle);
  } else {
    res.status(404).json({ message: "Holder not found" });
  }
};

export {
    getHolderOracleDetail
}