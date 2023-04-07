import { ethers } from "ethers";

export const pool = {
  owner: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  metadata: "ipfsHash",
  goal: ethers.utils.parseEther(String(35_000)),
};
export const poolMetadata = {
  title: "Metacrisis.xyz Matching Round",
  description:
    "The buzz around metacrisis.xyz shows there's enthusiasm for this type of work. But without funding, the work will only get so far/only the independently wealthy will be able to devote significant time to it.",
};

export const organizers = [
  { address: "owocki.eth", image: "" },
  { address: "stephenreid.eth", image: "" },
  { address: "octav.eth", image: "" },
];

export const contributors = [
  { address: "supermodular.eth", image: "", amount: "9k" },
  { address: "bliss.eth", image: "", amount: "9k" },
  { address: "noyesno.eth", image: "", amount: "200" },
];
