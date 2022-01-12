import Link from "next/link";
import Layout from "../components/Layout";
import Description from "../components/mainPage/Description";
const Home = () => {
 
  return (
    <Layout home>
      <Description />
      <Link href={"/mainPageSections/Resources"} passHref>
        <h3>Legal Help</h3>
      </Link>
    </Layout>
  );
};
export default Home;
