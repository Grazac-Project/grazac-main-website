import case1 from "../images/case1.png";
import case2 from "../images/case2.png";
import case3 from "../images/case3.png";
import case4 from "../images/case4.png";
import case5 from "../images/case5.png";
import case6 from "../images/case6.png";
import case7 from "../images/case7.png";
import case8 from "../images/case8.png";
import case9 from "../images/case9.png";
import case10 from "../images/case10.png";

import Subscribe from "../components/subscribe";
import { useEffect } from "react";
import Scroll from "../components/Scroll";
import { Helmet } from "react-helmet";

const CaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Case Study - Grazac</title>
        <meta name="description" content="IDEAS, PEOPLE AND A SMART FUTURE" />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="IDEAS, PEOPLE AND A SMART FUTURE"
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/" />
      </Helmet>
      <div className="case">
        <div className="container">
          <div className="case_toptext">
            <p>Genesis Vision</p>
            <h1>Private Trust Management And Trading Platform</h1>
          </div>
        </div>
        <img src={case1} alt="casestudy" width="100%" />
        <div className="container">
          <div className="case_challenge">
            <div className="first">
              <p>The challenge</p>
            </div>
            <div>
              <p>
                Corrosion has been a factor that has been a problem when it
                comes to metals. These various metals perform a lot of functions
                in engineering and as time goes by they react with air and
                moisture and the deterioration of these metals begin thereby
                corrosion sets in. Corrosion has been a factor that has been a
                problem when it comes to metals. These various metals perform a
                lot of functions in engineering and as time goes by they react
                with air and moisture and the deterioration of these metals
                begin thereby corrosion sets in.
              </p>
              <div className="case_challenge-links">
                <p>Launch App</p>
                <p>App Store</p>
                <p>Google Play</p>
              </div>
            </div>
          </div>
        </div>
        <img src={case2} alt="casestudy" width="100%" />
        <div className="container ">
          <h1 style={{ margin: "90px 0 50px" }}>Probably the best community</h1>
        </div>
        <img src={case3} alt="casestudy" width="100%" />
        <img src={case4} alt="casestudy" width="100%" />
        <img src={case5} alt="casestudy" width="100%" />
        <div className="container">
          <div className="case_challenge">
            <div className="first">
              <p>The challenge</p>
            </div>
            <div>
              <p>
                Corrosion has been a factor that has been a problem when it
                comes to metals. These various metals perform a lot of functions
                in engineering and as time goes by they react with air and
                moisture and the deterioration of these metals begin thereby
                corrosion sets in. Corrosion has been a factor that has been a
                problem when it comes to metals. These various metals perform a
                lot of functions in engineering and as time goes by they react
                with air and moisture and the deterioration of these metals
                begin thereby corrosion sets in.
              </p>
              <div className="case_challenge-links">
                <p>Launch App</p>
                <p>App Store</p>
                <p>Google Play</p>
              </div>
            </div>
          </div>
        </div>
        <img src={case6} alt="casestudy" width="100%" />
        <div className="container">
          <div className="case_challenge">
            <div className="first">
              <p>Long Term Collaboration</p>
            </div>
            <div>
              <p>
                Corrosion has been a factor that has been a problem when it
                comes to metals. These various metals perform a lot of functions
                in engineering and as time goes by they react with air and
                moisture and the deterioration of these metals begin thereby
                corrosion sets in. Corrosion has been a factor that has been a
                problem when it comes to metals. These various metals perform a
                lot of functions in engineering and as time goes by they react
                with air and moisture and the deterioration of these metals
                begin thereby corrosion sets in.
              </p>
              <div className="case_challenge-links">
                <p>Launch App</p>
                <p>App Store</p>
                <p>Google Play</p>
              </div>
            </div>
          </div>
        </div>
        <img src={case7} alt="casestudy" width="100%" />
        <img src={case8} alt="casestudy" width="100%" />
        <img src={case9} alt="casestudy" width="100%" />
        <img src={case10} alt="casestudy" width="100%" />
      </div>
      <Subscribe />
      <Scroll />
    </div>
  );
};

export default CaseStudy;
