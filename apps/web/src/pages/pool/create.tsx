import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Address, useWaitForTransaction } from "wagmi";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import {
  Form,
  FormControl,
  Input,
  Select,
  Textarea,
} from "~/components/ui/Form";
import { poolMetadata } from "~/data/mock";
import { useCrowdfundCreate } from "~/hooks/useCrowdfundCreate";
import { useIpfsUpload } from "~/hooks/useIpfsUpload";
import { Layout } from "~/layouts/Layout";
import { encodeCrowdfundParams } from "~/utils/encodeParams";

export const CreateCrowdfundSchema = z.object({
  title: z.string().min(3).max(40),
  description: z.string().nullable(),
  token: z.string(),
  safe: z.string(),
  goal: z.string(),
  startsAt: z.string().nullish(),
  endsAt: z.string().nullish(),
});

const tokens = [
  {
    label: "ETH",
    address: "0x0000000000000000000000000000000000000000",
  },
  {
    label: "LINK",
    address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
  },
  // {
  //   label: "USDC",
  //   address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // },
];
const CreateForm = () => {
  const router = useRouter();

  const hash = router.query.tx as Address;
  const create = useCrowdfundCreate({
    onSuccess: ({ hash }) => {
      // Redirect to the hash so we can track the transaction if the browser is reloaded
      router.push(`/pool/create?tx=${hash}`);
    },
  });
  const uploadMeta = useIpfsUpload();

  console.log("create", create);
  const tx = useWaitForTransaction({
    hash,
    enabled: Boolean(hash),
    onSuccess(data) {
      const log = data.logs[2];
      if (log) {
        const { crowdfund } = create.iface.parseLog(log).args;
        router.push(`/pool/${crowdfund}`);
      }
    },
  });

  const isLoading = uploadMeta.isLoading || create.isLoading || tx.isLoading;
  const error = uploadMeta.error || create.error || tx.error;

  return (
    <Form
      defaultValues={{
        ...poolMetadata,
        goal: "100",
        safe: "0x2a5b1b6188669da07947403da21f1cab501374e6",
        token: "0x0000000000000000000000000000000000000000",
      }}
      schema={CreateCrowdfundSchema}
      onSubmit={async ({ title, description, safe, token, goal }) => {
        const metaPtr = await uploadMeta.mutateAsync({ title, description });

        const endsAt = Math.floor(
          (Date.now() + 1000 * 60 * 60 * 24 * 30) / 1000
        );

        const params = encodeCrowdfundParams([
          safe,
          token,
          0,
          endsAt,
          ethers.utils.parseUnits(goal, 18), // TODO: Fetch token decimals!
          ethers.utils.toUtf8Bytes(metaPtr),
        ]);
        create.write({ recklesslySetUnpreparedArgs: [params] });
      }}
    >
      <FormControl label="Title" name="title">
        <Input autoFocus placeholder="Enter a title..." />
      </FormControl>
      <FormControl label="Description" name="description">
        <Textarea
          rows={4}
          placeholder="Describe the project or initiative..."
        />
      </FormControl>
      <FormControl label="Safe address" name="safe">
        <Input placeholder="0x..." />
      </FormControl>
      <FormControl label="Fundraising goal" name="goal">
        <Input type="number" placeholder="1000" />
      </FormControl>

      <FormControl label="Token" name="token">
        <Select>
          {tokens.map((token) => (
            <option key={token.address} value={token.address}>
              {token.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <div className="flex justify-end">
        <Button color="primary" type="submit" disabled={isLoading}>
          Create Crowdfund
        </Button>
      </div>
      <div className="flex items-center py-8 text-red-500">
        {error?.toString()}
      </div>
    </Form>
  );
};

const CreateCrowdfund: NextPage = () => {
  return (
    <Layout>
      <div className="mb-6">
        <span>Temporary connect wallet</span>
        <ConnectButton />
      </div>
      <h4 className="mb-6 text-center text-xl font-bold">
        Create new crowdfund
      </h4>
      <CreateForm />
    </Layout>
  );
};
export default CreateCrowdfund;
