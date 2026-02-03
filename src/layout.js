// @ts-nocheck
import {useContext} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/modal";
import Scroll from "./components/Scroll";
import Sidebar from "./components/sidebar";
// import Contact from "./pages/contact";
import ShowContext from "./showContext";

const Layout = ({ children }) => {

  const {
    sidebar,
    sidebarClick,
    // contact,
    // contactClick,
    reveal,
    modal,
    modalClick,
  } = useContext(ShowContext);
  return (
    <>
      <Header
        click={() => {
          console.log(sidebar);
          sidebarClick(true);
        }}
      />
      <Sidebar
        setShow={sidebarClick}
        clickContact={reveal}
        animate={
          sidebar ? "animate__slideInDown" : "animate__slideOutUp opacity"
        }
      />
      {/* <Contact
        setShow={contactClick}
        animate={
          contact ? "animate__slideInDown" : "animate__slideOutUp opacity"
        }
      /> */}
      <Modal
        show={modal}
        close={() => modalClick(false)}
        animate={modal ? "animate__fadeIn" : "animate__slideOutUp opacity"}
      >
        <h6>We are still</h6>
        <h6>working on this page</h6>
        <p>We are going to launch it soon. Stay tuned!</p>
      </Modal>
      <main className="main">{children}</main>
      <Scroll />
      <Footer />
    </>
  );
};

export default Layout;
