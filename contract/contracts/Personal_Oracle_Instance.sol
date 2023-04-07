// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@redstone-finance/evm-connector/contracts/data-services/CustomUrlsConsumerBase.sol";

contract CustomUrlsExample is CustomUrlsConsumerBase {
    bytes32 private _nft_attitude_oracle;
    bytes32 private _token_attitude_oracle;
    bytes32 private _recent_active_trader_type_oracle;
    bytes32 private _active_trader_type_oracle;
    bytes32 private _whale_type_oracle;
    bytes32 private _dealer_oracle;
    bytes32 private _higher_risk_appetite_oracle;
    address public _user_address;


    constructor(
        bytes32 nft_attitude_oracle,
        bytes32 token_attitude_oracle,
        bytes32 recent_active_trader_type_oracle,
        bytes32 active_trader_type_oracle,
        bytes32 whale_type_oracle,
        bytes32 dealer_oracle,
        bytes32 higher_risk_appetite_oracle,
        address user_address
    ) {
        _nft_attitude_oracle = nft_attitude_oracle;
        _token_attitude_oracle = token_attitude_oracle;
        _recent_active_trader_type_oracle = recent_active_trader_type_oracle;
        _active_trader_type_oracle = active_trader_type_oracle;
        _whale_type_oracle = whale_type_oracle;
        _dealer_oracle = dealer_oracle;
        _higher_risk_appetite_oracle = higher_risk_appetite_oracle;
        _user_address = user_address;
    }

function get_nft_attitude_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_nft_attitude_oracle);
}

function get_token_attitude_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_token_attitude_oracle);
}

function get_recent_active_trader_type_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_recent_active_trader_type_oracle);
}

function get_active_trader_type_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_active_trader_type_oracle);
}

function get_whale_type_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_whale_type_oracle);
}

function get_dealer_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_dealer_oracle);
}

function get_higher_risk_appetite_oracle_value() public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(_higher_risk_appetite_oracle);
}

}
