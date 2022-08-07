import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Register from "../components/register";
import Login from "../components/login";
import Layout from "../components/layout";

import Footer from "../components/footer";
import axios from "axios";
import { useState } from "react";
import Dashboard from "../components/dashboard";
import Router from "next/router";
export default function Home() {
  console.log(" login mounted");

  return (
    <>
      <Login />
    </>
  );
}
