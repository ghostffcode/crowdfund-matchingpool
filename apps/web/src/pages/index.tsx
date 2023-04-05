import { type NextPage } from "next";
import { Link } from "~/components/ui/Link";
import { Layout } from "~/layouts/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Link href={`/pool/test`}>Navigate to TestPool</Link>
    </Layout>
  );
};

export default Home;
