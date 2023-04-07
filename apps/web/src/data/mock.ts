import { ethers } from "ethers";

// Data from contract
export const pool = {
  owner: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  metadata: "ipfsHash",
  goal: "35000",
};

// Data from ipfs metadata
export const poolMetadata = {
  title: "Metacrisis.xyz Matching Round",
  description:
    "The buzz around metacrisis.xyz shows there's enthusiasm for this type of work. But without funding, the work will only get so far/only the independently wealthy will be able to devote significant time to it.",
};

// Address could be just an 0x123 and we can resolve the ENS name and Avatar on the client
export const organizers = [
  { address: "owocki.eth", image: "" },
  { address: "stephenreid.eth", image: "" },
  { address: "octav.eth", image: "" },
];

// again, image might not be necessary if we resolve on client
export const contributors = [
  { address: "supermodular.eth", image: "", amount: "9000" },
  { address: "bliss.eth", image: "", amount: "9000" },
  { address: "noyesno.eth", image: "", amount: "200" },
];
