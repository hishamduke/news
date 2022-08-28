import Header from "./header";
import Footer from "./footer";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Layout({ children }) {
  const listRef = useAutoAnimate();

  return (
    <>
      <div className="body">
        <main ref={listRef} className="main">
          {children}
        </main>
        <Header />
        <Footer />{" "}
      </div>
    </>
  );
}
