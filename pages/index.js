import { Grid } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../components/context/authUserContext";
import Description from "../components/mainPage/Description";
import Cardmedia from "../components/Cards/Cardmedia";

const Home = () => {

  return (
    <>
      <Description />
      <Cardmedia />
      <Link href={"/mainPageSections/jobs"} passHref>
        <h3>Jobs and Career</h3>
      </Link>

      <Link href={"/mainPageSections/housingfood"} passHref>
        <h3>Housing And Food</h3>
      </Link>

      <Link href={"/mainPageSections/educationlanguage"} passHref>
        <h3>Education and Language</h3>
      </Link>
    </>
  );
};
export default Home;
