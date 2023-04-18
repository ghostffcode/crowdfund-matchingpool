import { useQuery } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { Donation } from "~/types";

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
donations {
  user { id}
  amount
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

export function useDonations(
  params: { address: string; first: number; skip: number },
  donations: Donation[]
) {
  return useQuery(
    ["donations", params],
    async () => {
      return queryCrowdfund(params).then(
        (crowdfund) => crowdfund.donations || []
      );
    },
    {
      initialData: donations,
      keepPreviousData: true,
      enabled: Boolean(params.address),
    }
  );
}
