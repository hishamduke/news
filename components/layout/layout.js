import Header from "./header";
import Footer from "./footer";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Layout({ children }) {
  const [animationParent] = useAutoAnimate();

  return (
    <>
      <div className="body">
        <main ref={animationParent} className="main">
          {children}
        </main>
        <Header />
        <Footer />
      </div>
    </>
  );
}
