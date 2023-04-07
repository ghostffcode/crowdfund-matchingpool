type Metadata = { title: string; description: string };

export type Organizer = { address: string };
export type Contributor = { address: string; amount: string };
export type Funds = { raised: string; goal: string; percentage: number };
export type MatchingPool = {
  address: string;
  title: string;
  description: string;
  funds: Funds;
  organizers: Organizer[];
  contributors: Contributor[];
};
