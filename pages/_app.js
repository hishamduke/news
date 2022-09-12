import Layout from "../components/layout/layout";
import "../styles/globals.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  console.log(" app mounted");
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
