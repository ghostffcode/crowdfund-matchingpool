import { gql, GraphQLClient } from "graphql-request";

const crowdfundQuery = gql/* GraphQL */ `
  query getCrowdfund($address: ID!, $first: Int, $skip: Int) {
    crowdfund(id: $address) {
      creator {
        address
      }
      safe
      token
      metaPtr
      goal
      totalDonations
      donations(
        first: $first
        skip: $skip
        orderBy: amount
        orderDirection: desc
      ) {
        amount
        balance
        user {
          address
        }
      }
    }
  }
`;

export async function queryCrowdfund({
  address,
  first = 100,
  skip = 0,
}: {
  address: string;
  first?: number;
  skip?: number;
}) {
  const subgraphUrl = process.env.NEXT_PUBLIC_SUBGRAPH_URL || "";
  const { crowdfund } = await new GraphQLClient(subgraphUrl, {
    fetch,
  }).request<{ crowdfund: any }>(crowdfundQuery, {
    address,
    first,
    skip,
  });
  return crowdfund;
}

// TODO: Add query for pagination
