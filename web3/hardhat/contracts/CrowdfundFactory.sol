//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Crowdfund } from "./Crowdfund.sol";

contract CrowdfundFactory {
    uint256 public totalCrowdfunds;

    event crowdfundCreated(address creator, Crowdfund crowdfund);

    function createCrowdfund(bytes calldata meta) public {
        Crowdfund _crowdfund = new Crowdfund(meta);
        
        emit crowdfundCreated(msg.sender, _crowdfund);
    }
}
