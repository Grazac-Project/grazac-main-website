// @ts-nocheck
import React from "react";

import Classes from "./Tour.module.css";
import "react-calendar/dist/Calendar.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Join = ({ join, setJoin }) => {
  return (
    <div>
      {join ? (
        <>
          <ToastContainer closeButton={false} />
          <div className={Classes.main}>
            <div className={Classes.container}>
              <div className={Classes.innerContainer}>
                <div className={Classes.close} onClick={() => setJoin(false)}>
                  <span>&times;</span>
                </div>
                <form className={Classes.form}>
                  {/* <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSePpqQW6duQy2F2Gak1mkfnvUJ04DQvmLQ0gZC-EXfG_XjDDg/viewform?embedded=true"
                    // width="0"
                    height="1337"
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0"
                    style={{ width: "100%" }}
                  >
                    Loading…
                  </iframe> */}
                  <iframe
                    aria-label="Book A Space Newsletter"
                    height="1337"
                    frameborder="0"

                    style={{ width: "100%" }}
                    title="Book A Space Newsletter"
                    src="https://forms.zohopublic.com/grazac/form/BookASpaceNewsletter/formperma/-zdzLA8_2xqVRXw7FFvvfRr_5iFt6z0SoH5xUGElMwA"
                  ></iframe>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Join;
