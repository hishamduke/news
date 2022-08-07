import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Layout from "../components/layout";
import Index from "../components/index";
import Link from "next/link";

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
