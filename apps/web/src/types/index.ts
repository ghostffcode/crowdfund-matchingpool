type Metadata = { title: string; description: string };

export type Organizer = { address: string; amount: number };
export type Contributor = { address: string; amount: number };
export type Funds = { raised: string; goal: string; percentage: number };
export type MatchingPool = {
  address: string;
  title: string;
  description: string;
  funds: Funds;
  organizers: Organizer[];
  contributors: Contributor[];
};
