import { useState } from "react";
import Link from "next/link";
import Profile from "./Profile";
export default function Header() {
  const d = new Date();

  const monthlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = d.getDate();
  const year = d.getFullYear();
  const month = monthlist[d.getMonth()];
  console.log(" header mounted");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic"
        rel="stylesheet"
        type="text/css"
      />
      <title>Newspaper Subscription</title>

      <meta name="viewport" content="width=device-width" />

      <div className="head1">
        <div className="headerobjectswrapper">
          <Link href={"/"}>
            <header>Newspaper Subscription</header>
          </Link>
        </div>
        <div className="subhead">
          <div style={{ flexGrow: 1 }}>
            Calicut,Kerala - {day} {month} {year}- Seven Pages
          </div>
          <Profile />
        </div>
      </div>
    </>
  );
}
