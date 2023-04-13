import { ethers } from "ethers";

// Data from ipfs metadata
export const poolMetadata = {
  title: "Metacrisis.xyz Matching Round",
  description:
    "The buzz around metacrisis.xyz shows there's enthusiasm for this type of work. But without funding, the work will only get so far/only the independently wealthy will be able to devote significant time to it.",
};

// Address could be just an 0x123 and we can resolve the ENS name and Avatar on the client
export const organizers = [
  { user: { address: "owocki.eth" }, image: "" },
  { user: { address: "stephenreid.eth" }, image: "" },
  { user: { address: "octav.eth" }, image: "" },
];

// again, image might not be necessary if we resolve on client
export const contributors = [
  { user: { address: "supermodular.eth" }, image: "", amount: "9000" },
  { user: { address: "bliss.eth" }, image: "", amount: "9000" },
  { user: { address: "noyesno.eth" }, image: "", amount: "200" },
];

// Data from contract
export const pool = {
  creator: { address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" },
  token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  metaPtr: "ipfsHash",
  goal: ethers.utils.parseEther("35000").toString(),
  totalDonations: ethers.utils.parseEther("25000").toString(),
  donations: contributors,
};
