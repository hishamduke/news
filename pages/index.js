import Index from "../components/index";

export default function Home() {
  console.log(" index mounted");

  return (
    <>
      <Index />
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
