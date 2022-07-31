import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Index from "../components/index";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Index />
      <Footer />
    </>
  );
}
