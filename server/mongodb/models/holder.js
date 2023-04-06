import mongoose from "mongoose";

const HolderSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  wallet_address: {
    type: String,
  },
  assets: {
    crypto_holdings: {
      current_time_stamp: {
        type: Number,
      },
      tokens: {
        type: [
          {
            name: String,
            symbol: String,
            network: String,
            Amount: Number,
            decimals: Number,
            USDTvalue: Number,
            value: Number,
            contract_address: String,
            first_purchase_at: Number,
            last_time_activity: String,
            total_supply: Number,
            first_deploy_at: Number,
            label: [String],
          },
        ],
      },
      total_asset_value: {
        type: Number,
      },
      transaction_activities: {
        total_number: {
          type: Number,
        },
        "30d_number": {
          type: Number,
        },
        "30d_buy": {
          type: Number,
        },
        "30d_sell": {
          type: Number,
        },
        label: {
          type: [String],
        },
      },
    },
    nft_holdings: {
      tokens: {
        type: [
          {
            nft_name: String,
            network: String,
            amount: Number,
            value: Number,
            holding_value: Number,
            first_purchase_at: Number,
            rarity: Number,
            label: [String],
          },
        ],
      },
      total_asset_value: {
        type: Number,
      },
      transaction_activities: {
        total_number: {
          type: Number,
        },
        "30d_number": {
          type: Number,
        },
        "30d_buy": {
          type: Number,
        },
        "30d_sell": {
          type: Number,
        },
        label: {
          type: [String],
        },
      },
    },
  },
  social: {
    social_activities: {
      type: [
        {
          name: String,
          id: Number,
          network: String,
          type: String,
          label: [String],
        },
      ],
    },
  },
  third_party_recommendations: {
    token_labels: {
      type: [String],
    },
    token_recommendations: {
      type: [
        {
          name: String,
          contractAddress: String,
          score: Number,
          labels: [String],
        },
      ],
    },
  },
});

const holderModel = mongoose.model("Holder", HolderSchema);

export default holderModel;
