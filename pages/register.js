import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Register from "../components/register";
import Login from "../components/login";
import Footer from "../components/footer";
export default function Home() {
  return (
    <>
      <Header />
      <Register />
      {/* <Login /> */}
      <Footer />
    </>
  );
}
