// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "./UserDataMapping.sol";

contract UserDataMappingFactory {
    mapping(string => address) public userTagMappings;

    event NewUser(string userAddress);
    uint256 public userCount;

    function createUserDataMapping(
        string memory user_address,
        string memory nft_attitude_oracle,
        string memory token_attitude_oracle,
        string memory recent_active_trader_type_oracle,
        string memory active_trader_type_oracle,
        string memory whale_type_oracle,
        string memory dealer_oracle,
        string memory higher_risk_appetite_oracle
    ) public {
        UserDataMapping c = new UserDataMapping(
            user_address,
            nft_attitude_oracle,
            token_attitude_oracle,
            recent_active_trader_type_oracle,
            active_trader_type_oracle,
            whale_type_oracle,
            dealer_oracle,
            higher_risk_appetite_oracle
        );
        userTagMappings[user_address] = address(c);
        userCount +=1;
        emit NewUser(user_address);
    }

    function getUserNumber() public view returns (uint256) {
        return userCount;
    }
}
