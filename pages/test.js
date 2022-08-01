import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Index from "../components/index";
import Link from "next/link";
import Message from "../components/message";

export default function Home() {
  return (
    <div>
      <Message>hi</Message>
      {/* Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style> */}
    </div>
  );
}
