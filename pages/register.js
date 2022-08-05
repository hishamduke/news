import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Register from "../components/register";
import Layout from "../components/layout";

import Login from "../components/login";
import Footer from "../components/footer";
import Message from "../components/message";
export default function Home() {
  return (
    <>
      <Register />
    </>
  );
}
