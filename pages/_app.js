import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthUserProvider } from "./authUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </Layout>
  );
}

export default MyApp;
