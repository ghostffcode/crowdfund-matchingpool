import { gql, GraphQLClient } from "graphql-request";

const subgraphUrl = process.env.NEXT_PUBLIC_SUBGRAPH_URL || "";
const client = new GraphQLClient(subgraphUrl, {
  fetch,
});

const FRAGMENT = `
id
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
`;
const crowdfundQuery = gql/* GraphQL */ `
  query getCrowdfund($address: ID!, $first: Int, $skip: Int) {
    crowdfund(id: $address) {
      ${FRAGMENT}
    }
  }
`;

const crowdfundsQuery = gql/* GraphQL */ `
  query getCrowdfunds($first: Int, $skip: Int) {
    crowdfunds {
      ${FRAGMENT}
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
  const { crowdfund } = await client.request<{ crowdfund: any }>(
    crowdfundQuery,
    {
      address,
      first,
      skip,
    }
  );
  return crowdfund;
}

// TODO: Add query for pagination

export async function queryCrowdfunds({
  first = 100,
  skip = 0,
}: {
  first?: number;
  skip?: number;
}) {
  const { crowdfunds } = await client.request<{ crowdfunds: any }>(
    crowdfundsQuery,
    {
      first,
      skip,
    }
  );
  return crowdfunds;
}
