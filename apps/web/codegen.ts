import type { CodegenConfig } from "@graphql-codegen/cli";

require("dotenv").config();

const subgraph = process.env.NEXT_PUBLIC_SUBGRAPH_URL as string;
const config: CodegenConfig = {
  schema: [subgraph, "https://api.thegraph.com/subgraphs/name/ensdomains/ens"],
  documents: ["src/**/*.(ts|tsx)"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};
export default config;
