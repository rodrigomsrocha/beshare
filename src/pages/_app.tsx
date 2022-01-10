import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GlobalProvider } from "../contexts/GlobalContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}

export default MyApp;
