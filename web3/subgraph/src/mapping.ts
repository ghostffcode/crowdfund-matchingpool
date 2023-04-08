// import { BigInt, Address } from "@graphprotocol/graph-ts";
import { CrowdfundCreated } from "../generated/CrowdfundFactory/CrowdfundFactory"
import { Crowdfund as CrowdfundSchema, User } from "../generated/schema";
import { Crowdfund as CrowdfundContract } from "../generated/templates";
import { Crowdfund } from "../generated/templates/Crowdfund/Crowdfund";

export function handleNewCrowdfund(event: CrowdfundCreated): void {
  let creatorString = event.params.creator.toHexString();
  let crowdfundContractAddress = event.params.crowdfund.toHexString();

  let crowdfund = new CrowdfundSchema(crowdfundContractAddress);
  let crowdfundContract = Crowdfund.bind(event.params.crowdfund);

  // create the user
  let creator = User.load(creatorString);

  if (creator === null) {
    creator = new User(creatorString);
    creator.address = event.params.creator;
    creator.createdAt = event.block.timestamp;
  }

  // update the crowdfund entity
  crowdfund.creator = creator.id;
  crowdfund.token = crowdfundContract.token();
  crowdfund.startsAt = crowdfundContract.startsAt();
  crowdfund.endsAt = crowdfundContract.endsAt();
  crowdfund.goal = crowdfundContract.goal();
  crowdfund.metaPtr = crowdfundContract.metaPtr().toString();
  crowdfund.canRefund = crowdfundContract.canRefund();
  crowdfund.createdAt = event.block.timestamp;
  crowdfund.transactionHash = event.transaction.hash.toHexString();

  // save
  creator.save();
  crowdfund.save();

  // start indexing the new contract
  CrowdfundContract.create(event.params.crowdfund);
}
