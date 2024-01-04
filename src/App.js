import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import LandingPage from "./pages/Landing";
import InnovationPage from "./pages/Innovation";
import About from "./pages/About";
import Build from "./pages/Build";
import CaseStudy from "./pages/CaseStudy";

import StartUp from "./pages/Startup";
import Blog from "./pages/Blog";
import Layout from "./layout";
import Application from "./pages/Application";
import ShowContext from "./showContext";
import Unsubscribe from "./pages/Unsubscribe";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {  
    AOS.init();
    AOS.refresh();
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setShowContact(!showContact);
    setShowSidebar(false);
  };

  // pathname

  if (pathname === "/apply") {
    return (
      <ShowContext.Provider
        value={{
          modalReveal: () => setShowModal(true),
          modal: showModal,
          modalClick: setShowModal,
        }}
      >
        <Switch>
          <Route path="/apply" exact component={Application} />
        </Switch>
      </ShowContext.Provider>
    );
  } else if (pathname === "/unsubscribe") {
    return (
      <Switch>
        <Route path="/unsubscribe" exact component={Unsubscribe} />
      </Switch>
    );
  } else {
    return (
      <ShowContext.Provider
        value={{
          sidebar: showSidebar,
          sidebarClick: setShowSidebar,
          contact: showContact,
          contactClick: setShowContact,
          reveal: handleClick,
          modal: showModal,
          modalClick: setShowModal,
          modalReveal: () => setShowModal(true),
          open, setOpen
        }}
      >
        
        <Layout>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/innovation" exact component={InnovationPage} />
            <Route path="/about" exact component={About} />
            <Route path="/build" exact component={Build} />
            <Route path="/casestudy" exact component={CaseStudy} />
            <Route path="/startup" exact component={StartUp} />
            <Route path="/blog" exact component={Blog} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      </ShowContext.Provider>
    );
  }
};

export default App;
