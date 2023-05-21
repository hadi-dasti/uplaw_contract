import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Page({ children }) {
  return (
    <>
      <NavBar />
      <main
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
