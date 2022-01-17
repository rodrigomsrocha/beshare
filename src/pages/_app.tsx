import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GlobalProvider } from "../contexts/GlobalContext";
import { ModalProvider } from "../contexts/ModalContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </GlobalProvider>
  );
}

export default MyApp;
