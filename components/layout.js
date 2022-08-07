import Header from "../components/header";
import Footer from "../components/footer";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Layout({ children }) {
  const listRef = useAutoAnimate();

  return (
    <>
      <div className="empty"></div>
      <main ref={listRef} className="main">
        {children}
      </main>
      <Header />
      <Footer />
    </>
  );
}
