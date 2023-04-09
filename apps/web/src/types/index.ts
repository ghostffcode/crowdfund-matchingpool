import { Address } from "wagmi";

export type Organizer = { address: string };
export type Contributor = { address: string; amount: string };
export type Funds = { raised: string; goal: string; percentage: number };

export type MatchingPool = {
  address: Address;
  token: Address;
  title: string;
  description: string;
  funds: Funds;
  organizers: Organizer[];
  contributors: Contributor[];
};
