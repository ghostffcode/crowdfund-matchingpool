import { useMutation } from "wagmi";
import { ipfsUpload } from "~/utils/ipfs";

export function useIpfsUpload() {
  return useMutation(ipfsUpload);
}
