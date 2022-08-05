import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
