import { request, gql } from "graphql-request";
import { Address, useQuery } from "wagmi";

const ensQuery = gql/* GraphQL */ `
  query getEns($id: ID!) {
    domain(id: $id) {
      name
    }
  }
`;

const useEns = (address: string) =>
  useQuery(
    ["ens-name", address],
    () =>
      request(
        "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
        ensQuery,
        { id: address }
      ).then((r) => (r as { domain: any }).domain?.name),
    { enabled: Boolean(address) }
  );

export const EnsName = ({ address }: { address: Address }) => {
  const name = useEns(address);
  console.log(name.data);
  return <>{name.data || address}</>;
};
