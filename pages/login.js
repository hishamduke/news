import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Register from "../components/register";
import Login from "../components/login";
import Footer from "../components/footer";
import axios from "axios";
import { useState } from "react";
import Dashboard from "../components/dashboard";
import Router from "next/router";
export default function Home() {
  const [verify, setVerify] = useState(0);
  axios
    .get("/api/auth/cook")
    .then(function (response) {
      if (response.data.Message !== true) {
      } else {
        setVerify(1);
      }
    })
    .catch(function (error) {});
  if (verify === 1) {
    console.log("hey");
    Router.push("/dashboard");
  }

  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}
