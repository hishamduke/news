import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";
import { useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/dashboard";
import Link from "next/link";

export default function Home() {
  console.log(" dashboard mounted");

  return (
    <>
      <Dashboard />
    </>
  );
}
