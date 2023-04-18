import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
donations(first: $first, skip: $skip) {
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
  ...rest
}: {
  address: string;
  first?: number;
  skip?: number;
}) {
  console.log(123123, { first, skip }, rest);
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
  params: { address: string },
  donations: Donation[]
) {
  const first = 20;
  const query = useInfiniteQuery({
    queryKey: ["donations"],
    queryFn: async ({ pageParam = 0 }) =>
      queryCrowdfund({ ...params, first, skip: pageParam * first }).then(
        (crowdfund) => crowdfund.donations || []
      ),
    getNextPageParam: (lastPage, pages) => pages.length,
    keepPreviousData: true,
    enabled: Boolean(params.address),
  });

  return query;
}
