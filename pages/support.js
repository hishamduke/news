import Support from "../components/support";
import BackButton from "../components/buttons/backButton";

export default function Home() {
  console.log(" index mounted");

  return (
    <>
      <BackButton />
      <Support />
    </>
  );
}

// Home.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <Index />
//     </Layout>
//   );
// };
