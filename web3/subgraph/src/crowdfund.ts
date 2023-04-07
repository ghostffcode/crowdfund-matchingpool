import { Crowdfund, User, Donor } from "../generated/schema";
import { Donated, Funded, RefundActive, UserBalanceWithdrawn } from '../generated/templates/Crowdfund/Crowdfund';

export function donationHandler(event: Donated): void {
  let crowdfundContractAddress = event.address.toHexString();
  let donorAddress = event.params.sender.toHexString();
  let amount = event.params.amount;

  let crowdfund = Crowdfund.load(crowdfundContractAddress);

  if (crowdfund === null) {
    // this shouldn't be indexed given that it was never instantiated
    return;
  }

  let user = User.load(donorAddress);

  if (user === null) {
    user = new User(donorAddress);
    user.address = event.params.sender;
    user.createdAt = event.block.timestamp;
  }

  let fundDonor = Donor.load(`${crowdfund.id}-${user.id}`)

  if (fundDonor === null) {
    fundDonor = new Donor(`${crowdfund.id}-${user.id}`)
    fundDonor.amount = amount;
    fundDonor.balance = amount;
    fundDonor.crowdfund = crowdfund.id;
    fundDonor.createdAt = event.block.timestamp;
  } else {
    // increment balance & amount
    fundDonor.amount = fundDonor.amount.plus(amount);
    fundDonor.balance = fundDonor.balance.plus(amount);
  }

  crowdfund.totalDonations = crowdfund.totalDonations.plus(amount);

  user.save();
  fundDonor.save();
  crowdfund.save();
}

export function fundingHandler(event: Funded): void {
  let crowdfundContractAddress = event.address.toHexString();
  let amount = event.params.amount;

  let crowdfund = Crowdfund.load(crowdfundContractAddress);

  if (crowdfund === null) {
    // this shouldn't be indexed given that it was never instantiated
    return;
  }

  crowdfund.funded = crowdfund.funded.plus(amount);

  crowdfund.save();
}

export function refundActivationHandler(event: RefundActive): void {
  let crowdfundContractAddress = event.address.toHexString();
  let refundStatus = event.params.refunding;

  let crowdfund = Crowdfund.load(crowdfundContractAddress);

  if (crowdfund === null) {
    // this shouldn't be indexed given that it was never instantiated
    return;
  }

  crowdfund.canRefund = refundStatus;

  crowdfund.save();
}

export function refundHandler(event: UserBalanceWithdrawn): void {
  let crowdfundContractAddress = event.address.toHexString();
  let donorAddress = event.params.user.toHexString();
  let amount = event.params.balance;

  let crowdfund = Crowdfund.load(crowdfundContractAddress);

  if (crowdfund === null) {
    // this shouldn't be indexed given that it was never instantiated
    return;
  }

  let user = User.load(donorAddress);

  if (user === null) {
    user = new User(donorAddress);
    user.address = event.params.user;
    user.createdAt = event.block.timestamp;
  }

  let fundDonor = Donor.load(`${crowdfund.id}-${user.id}`)

  if (fundDonor === null) {
    // this donor doesn't exist
    return;
  } else {
    // increment balance & amount
    fundDonor.balance = fundDonor.balance.minus(amount);
  }

  user.save();
  fundDonor.save();
  crowdfund.save();
}

