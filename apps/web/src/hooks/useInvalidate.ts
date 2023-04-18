import { useCallback, useEffect } from "react";
import { Address, useQueryClient, useWaitForTransaction } from "wagmi";

export function useInvalidate(hash: Address | undefined, match: object) {
  const client = useQueryClient();
  const tx = useWaitForTransaction({ hash, enabled: Boolean(hash) });

  const invalidate = useCallback(
    () =>
      client.invalidateQueries({
        predicate: (query) => {
          return true;
          const key = query.queryKey[0] as keyof typeof match;
          return Object.entries(match).every(([k, v]) => key[k] === v);
        },
      }),
    []
  );

  useEffect(() => {
    hash && tx.data && invalidate();
  }, [hash, tx.data, invalidate]);

  return tx;
}
