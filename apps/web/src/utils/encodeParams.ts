import { BytesLike, utils } from "ethers";

export const encodeParams = (params: any[], types: string[]): string =>
  utils.defaultAbiCoder.encode(types, params);

export const decodeParams = (
  params: BytesLike,
  types: string[]
): utils.Result => utils.defaultAbiCoder.decode(types, params);

const crowdfundParams = [
  "address",
  "address",
  "uint256",
  "uint256",
  "uint256",
  "bytes",
];

export const encodeCrowdfundParams = (params: any[]): string => {
  return utils.defaultAbiCoder.encode(crowdfundParams, params);
};
