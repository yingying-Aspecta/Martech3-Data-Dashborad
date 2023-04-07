// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "./Personal_Oracle_Instance.sol";

contract CustomUrlsExampleFactory {
    mapping(address => address) public userTagMappings;
    address[] public deployedContracts;

    event NewUser(address contractAddress);

    function createCustomUrlsExample(
        address user_address,
        bytes32 nft_attitude_oracle,
        bytes32 token_attitude_oracle,
        bytes32 recent_active_trader_type_oracle,
        bytes32 active_trader_type_oracle,
        bytes32 whale_type_oracle,
        bytes32 dealer_oracle,
        bytes32 higher_risk_appetite_oracle
    ) public {
        CustomUrlsExample c = new CustomUrlsExample(
            nft_attitude_oracle,
            token_attitude_oracle,
            recent_active_trader_type_oracle,
            active_trader_type_oracle,
            whale_type_oracle,
            dealer_oracle,
            higher_risk_appetite_oracle,
            user_address
        );
        userTagMappings[user_address] = address(c);
        deployedContracts.push(address(c));
        emit NewUser(address(c));
    }

    function getUserCount() public view returns (uint256) {
        return deployedContracts.length;
    }
}
