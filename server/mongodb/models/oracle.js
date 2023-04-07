import mongoose from "mongoose";

const Oracle = new mongoose.Schema({
  nft_attitude_oracle: {
    type: Number
  },
  token_attitude_oracle: {
    type: Number
  },
  recent_active_trader_type_oracle: {
    type: Number
  },
  active_trader_type_oracle: {
    type: Number
  },
  whale_type_oracle: {
    type: Number
  },
  dealer_oracle: {
    type: Number
  },
  higher_risk_appetite_oracle: {
    type: Number
  },
});

const userOracleModel = mongoose.model("user_oracle", Oracle);

export default userOracleModel;
