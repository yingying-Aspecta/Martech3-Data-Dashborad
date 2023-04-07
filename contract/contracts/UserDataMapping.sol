// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@redstone-finance/evm-connector/contracts/data-services/CustomUrlsConsumerBase.sol";

contract UserDataMapping is CustomUrlsConsumerBase {
    string public _user_address;
    string private _nft_attitude_oracle;
    string private _token_attitude_oracle;
    string private _recent_active_trader_type_oracle;
    string private _active_trader_type_oracle;
    string private _whale_type_oracle;
    string private _dealer_oracle;
    string private _higher_risk_appetite_oracle;

    constructor(
        string memory user_address,
        string memory nft_attitude_oracle,
        string memory token_attitude_oracle,
        string memory recent_active_trader_type_oracle,
        string memory active_trader_type_oracle,
        string memory whale_type_oracle,
        string memory dealer_oracle,
        string memory higher_risk_appetite_oracle
    ) {
        _user_address = user_address;
        _nft_attitude_oracle = nft_attitude_oracle;
        _token_attitude_oracle = token_attitude_oracle;
        _recent_active_trader_type_oracle = recent_active_trader_type_oracle;
        _active_trader_type_oracle = active_trader_type_oracle;
        _whale_type_oracle = whale_type_oracle;
        _dealer_oracle = dealer_oracle;
        _higher_risk_appetite_oracle = higher_risk_appetite_oracle;
    }

    function get_nft_attitude_oracle_value() public view returns (uint256) {
        bytes32 dataFeedId = stringToBytes32(_nft_attitude_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function get_token_attitude_oracle_value() public view returns (uint256) {
        bytes32 dataFeedId = stringToBytes32(_token_attitude_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function get_recent_active_trader_type_oracle_value()
        public
        view
        returns (uint256)
    {
        bytes32 dataFeedId = stringToBytes32(_recent_active_trader_type_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function get_active_trader_type_oracle_value()
        public
        view
        returns (uint256)
    {
        bytes32 dataFeedId = stringToBytes32(_active_trader_type_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function get_whale_type_oracle_value() public view returns (uint256) {
        bytes32 dataFeedId = stringToBytes32(_whale_type_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function get_dealer_oracle_value() public view returns (uint256) {
        bytes32 dataFeedId = stringToBytes32(_dealer_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function get_higher_risk_appetite_oracle_value()
        public
        view
        returns (uint256)
    {
        bytes32 dataFeedId = stringToBytes32(_higher_risk_appetite_oracle);
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function stringToBytes32(string memory source)
        public
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
