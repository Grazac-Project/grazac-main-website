// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import Subscribe from "../components/subscribe";

import desk from "../images/svg/desk.svg";
import conditioner from "../images/svg/conditioner.svg";
import camera from "../images/svg/camera.svg";
import speed from "../images/svg/speed.svg";
import power from "../images/svg/power.svg";
import rooms from "../images/svg/rooms.svg";

import privateoffice from "../images/website/IMG_9865.jpg";
import meetups from "../images/website/IMG_9815.jpg";
import startups from "../images/website/IMG_9805.jpg";
import events from "../images/website/IMG_9775.jpg";
import perks from "../images/website/IMG_9942.jpg";
import arrow from "../images/svg/button-arrow.svg";
import purplearrow from "../images/svg/button-arrow-purple.svg";
import { Helmet } from "react-helmet";
import gallery1 from "../images/website/gallery/IMG_0433.jpg";
import gallery2 from "../images/website/gallery/IMG_0440.jpg";
import gallery3 from "../images/website/gallery/IMG_0436.jpg";
import Scroll from "../components/Scroll";
import ShowContext from "../showContext";
//import SpaceForm from "../components/SpaceForm";
//import Input from "../components/Input";
import Tour from "../components/Tour/Tour";
import Space from "../components/Space";
import { Alert, Snackbar, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
// import Popup from "../components/BasicModal";
import BasicModal from "../components/BasicModal/BasicModal";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

/* import SpaceInput from "../components/SpaceInput";
import Button from "../components/button";
import { required, validateEmail, numberCheck } from "../validation";
import { handleBlur, inputChangeHandler } from "../handler";

const form_obj = {
  first_name: {
    value: "",
    label: "First Name",
    type: "text",
    name: "team",
    placeholder: "First Name",
    elementType: "input",
    validations: [required],
    isValid: false,
    blur: false,
    require: true,
  },
  last_name: {
    value: "",
    type: "text",
    label: "Last Name",
    placeholder: "Last Name",
    elementType: "input",
    validations: [required],
    isValid: false,
    blur: false,
    name: "team",
    require: true,
  },
  email: {
    value: "",
    label: "Email Address",
    type: "email",
    placeholder: "Email Address",
    elementType: "input",
    validations: [validateEmail, required],
    isValid: false,
    name: "team",
    require: true,
    blur: false,
  },
  phone: {
    value: "",
    label: "Phone Number",
    type: "text",
    placeholder: "Phone Number",
    elementType: "input",
    validations: [numberCheck, required],
    isValid: false,
    name: "team",
    require: true,
    blur: false,
  },
};*/
const Innovation = () => {
  // const notify = () => toast("Wow so easy!");

  const { modalReveal, open, setOpen } = useContext(ShowContext);
  const [spaces, setSpaces] = useState("private");
  const [form, setForm] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [tour, setTour] = useState(false);
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /*const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [team3, setTeam3] = useState();
  const [team, setTeam] = useState({
    ...form_obj,
  });*/

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*const [meta, setMeta] = useState({
    plan: {
      elementType: "select",
      label: "Select Plan",
      options: [
        { value: "", displayValue: "Choose An Option" },
        { value: "daily", displayValue: "Daily" },
        { value: "weekly", displayValue: "Weekly" },
        { value: "monthly", displayValue: "Monthly" },
      ],

      validations: [required],
      isValid: false,
      blur: false,
      require: true,
      name: "plan",
    },
    package: {
      validations: [required],
      elementType: "select",
      label: "Select Package",
      value: "",
      options: [
        { value: "", displayValue: "Choose An Option" },
        { value: "Freelance", displayValue: "Freelance" },
        { value: "Team", displayValue: "Team" },
      ],
      isValid: false,
      blur: false,
      require: true,
      name: "package",
    },
  });

  const metaForm = [];
  for (let key in meta) {
    metaForm.push({
      key,
      config: meta[key],
    });
  }

  const data = metaForm.map(({ key, config }) => (
    <Input
      key={key}
      elementType={config.elementType}
      label={config.label}
      options={config.options}
      onchange={(event) =>
        inputChangeHandler(event, key, meta, setMeta, setFormValid)
      }
      onblur={() => handleBlur(key, meta, setMeta)}
      blur={config.blur}
      isValid={config.isValid}
    />
  ));

  const addName = (index, updateFn) => {
    let data = { ...form_obj };
    for (let key in data) {
      const updatedElelment = {
        ...data[key],
        name: `team[${key}][${index}]`,
      };
      const updated = {
        ...data,
        [key]: updatedElelment,
      };
      data = updated;
      updateFn(data);
    }
  };

  const addToTeam = () => {
    if (team1 && team2 && team3) {
      alert("You can only add 3 team members");
      return;
    }
    if (!member1) {
      addName(0, setMember1);
    }
    console.log(member1);
    if (member1 && !member2) {
      addName(1, setMember2);
    }
    if (member2 && !member3) {
      addName(2, setMember3);
    }
  };

  const valid = {};
  const formValidation = () => {
    for (let key in team) {
      valid[key] = team[key].isValid;
    }
    for (let key in meta) {
      valid[key] = meta[key].isValid;
    }

    for (let key of [member1, member2, member3]) {
      if (key) {
        for (let item in key) {
          valid[item] = key[item].isValid;
        }
      }
    }
    // }
  };*/

  /*const submit = () => {
    console.log(team);
    console.log(team1);
    console.log(team2);
    console.log(team3);
  };*/

  return (
    <>
    <div>
      <Helmet>
        <title>Innovation - Grazac</title>
        <meta
          name="description"
          content="A creative environment that will boost your productivity"
        />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="A creative environment that will boost your productivity"
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta
          property="og:url"
          content="https://www.grazac.com.ng/innovation"
        />
      </Helmet>
      <Space form={form} setForm={setForm} />
      {/* {open && <BasicModal setOpen={setOpen}/>} */}
      <Tour tour={tour} setTour={setTour} />
      <div className="innovation">
        {/* <div className="innovation_toptext">
          <div className="container">
            <p>WELCOME TO GRAZAC INNOVATION SPACE</p>
            <h1>
              A creative environment that will boost your performance and
              productivity
            </h1>
          </div>
        </div> */}
        <div
          className="innovation_hero"
          style={{
            boxShadow: "inset 0 0 0 2000px rgba(0,0,0,0.6)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
      
      
          <Snackbar
            sx={{
              position: "absolute",
              // top: "200px",
              // right: "100px",
            }}
            autoHideDuration={6000}
            severity="info"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={alertState}
            onClose={() => setAlertState(!alertState)}
            // message="I love snacks"
          >
               <Alert severity="info" sx={{ width: "100%" }}>
           Co-working space is currently not available
            </Alert>
          </Snackbar>

          <div className="container">
            <div className="innovation_hero-text">
              {/*<p>WELCOME TO GRAZAC INNOVATION SPACE</p>*/}
              <h2>A creative environment that will boost your productivity</h2>
              {/* <button
                onClick={() => {
                  // setForm(true);
                  setAlertState(true);
                }}
                className="hvr-wobble-horizontal"
              >
                Book a Space
              </button> */}
              <button
                onClick={() => setOpen(true)}
                className="hvr-wobble-horizontal"
              >
                Book a Space
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="innovation_spaces">
            <div>
              <p>OUR OFFERS</p>
              <h1>
                An inviting workspace with an amiable effect on both clients,
                partners and visitors
              </h1>
            </div>
            <div className="innovation_spaces-offices">
              <div className="innovation_spaces-offices-selection">
                <p
                  onClick={() => {
                    setSpaces("private");
                  }}
                  style={
                    spaces === "private"
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  Dedicated Desks
                </p>
                <p
                  onClick={() => setSpaces("boardroom")}
                  style={
                    spaces === "boardroom"
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  Executive Boardroom
                </p>
                <p
                  onClick={() => setSpaces("meetingroom")}
                  style={
                    spaces === "meetingroom"
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  Meeting room
                </p>
                <p
                  onClick={() => setSpaces("relaxation")}
                  style={
                    spaces === "relaxation"
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  Relaxation Space
                </p>
              </div>
              <div className="innovation_spaces-offices-view">
                <div className="images">
                  {spaces === "private" ? (
                    <img src={privateoffice} alt="spaces" />
                  ) : spaces === "boardroom" ? (
                    <img src={startups} alt="spaces" />
                  ) : spaces === "meetingroom" ? (
                    <img src={meetups} alt="spaces" />
                  ) : (
                    <img src={events} alt="spaces" />
                  )}
                </div>
                {spaces === "private" ? (
                  <p className="about">
                    This place of privacy keeps you away from prying eyes of
                    co-working mates yet, gives you the chance of belonging to a
                    community. Private matters related to clients and business
                    contacts are kept away from others in the workspace.
                  </p>
                ) : spaces === "boardroom" ? (
                  <p className="about">
                    A quiet atmosphere that sets up your meeting for success.
                    Engage with board members and bond, undergo presentations
                    without being disrupted and host your guests comfortably and
                    professionally.
                  </p>
                ) : spaces === "meetingroom" ? (
                  <p className="about">
                    A professional environment that gives your clients and
                    partners a good first impression. Sensitive information and
                    business deals are safe within the walls of the conference
                    room.
                  </p>
                ) : (
                  <p className="about">
                    Get a unique experience with stunning interior elements that
                    makes your event memorable. Relax away from your desks and
                    recharge with drinks and games before taking on your next
                    task.
                  </p>
                )}
                <p className="link">Virtual Tour</p>
              </div>
            </div>
          </div>
          <div className="innovation_perks">
            <div className="innovation_perks-firstdiv">
              <p className="text1">PERKS</p>
              <div className="innovation_perks_list">
                <div className="innovation_perks_list-1">
                  <div className="innovation_perks_list-item">
                    <div className="svg-box2">
                      <img src={desk} alt="desk" />
                    </div>
                    <div>
                      <h1>40+</h1>
                      <p>Dedicated Desk</p>
                    </div>
                  </div>
                  <div className="innovation_perks_list-item">
                    <div className="svg-box2">
                      <img src={rooms} alt="desk" />
                    </div>
                    <div>
                      <h1>60+</h1>
                      <p>Conference & Meeting Rooms</p>
                    </div>
                  </div>
                  <div className="innovation_perks_list-item">
                    <div className="svg-box2">
                      <img src={camera} alt="camera" />
                    </div>
                    <div>
                      <h1>Secured</h1>
                      <p>Full Security Camera</p>
                    </div>
                  </div>
                </div>
                <div className="innovation_perks_list-2">
                  <div className="innovation_perks_list-item">
                    <div className="svg-box2">
                      <img src={power} alt="camera" />
                    </div>
                    <div>
                      <h1>24hrs</h1>
                      <p>Power Supply</p>
                    </div>
                  </div>
                  <div className="innovation_perks_list-item">
                    <div className="svg-box2">
                      <img src={speed} alt="camera" />
                    </div>
                    <div>
                      <h1>500 Mbps</h1>
                      <p>High Speed Internet</p>
                    </div>
                  </div>
                  <div className="innovation_perks_list-item">
                    <div className="svg-box2">
                      <img src={conditioner} alt="camera" />
                    </div>
                    <div>
                      <h1>Conducive</h1>
                      <p>Fully Air Conditioned</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="innovation_perks-seconddiv">
              <div className="innovation_perks-imaging">
                <img src={perks} alt="perks" />
                <div className="innovation_perks-imaging-box">
                  <div className="svg-box1"></div>
                  <h3>Benefits of our co-working space</h3>
                  <p>
                    Create a world where people work to make a life, not just a
                    living. A place where we’re redefining success measured by
                    personal fulfilment, not just the bottom line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="innovation_gallery">
          <div className="innovation_gallery-images">
            <div className="innovation_gallery-images-one first-box">
              <img src={gallery1} alt="gallery" />
            </div>
            <div className="innovation_gallery-images-two">
              <img src={gallery2} alt="gallery" />
            </div>
            <div className="innovation_gallery-images-one third-box">
              <img src={gallery3} alt="gallery" />
            </div>
          </div>
          <div className="container">
            <p>GALLERY</p>
            <h1>
              Immersive beautiful
              <br />
              co-working space
            </h1>
            <button className="first" onClick={() => setTour(true)}>
              Book a Tour
              <img src={arrow} alt="" className="hvr-buzz" />
            </button>
            {/* <button className="sec">
              Virutal Tour
              <img src={arrow} alt="" className="hvr-buzz" />
            </button> */}
          </div>
        </div>
      </div>

      <div className="innovation_feedback">
        <div>
          <div>
            <p>CUSTOMER FEEDBACKS</p>
            <h1>Our Clients & Feedbacks</h1>
          </div>
          <div>{/**moving arrows here */}</div>
        </div>
        <div className="innovation_feedback-testimonial">
          <div className="innovation_feedback-testimonial-box">
            <p>
              This innovative space is well planned and standard. It has
              improved my productivity a lot! Thumbs up to Grazac for this
              amazing experience.
            </p>
            <h3>Ayomide</h3>
            <p>Freelancer</p>
          </div>
          <div className="innovation_feedback-testimonial-box">
            <p>
              What makes you stay connected to Grazac is the serene, open and
              helping environment. It provides you with a community where you
              can find individuals of the same niche with the same goals to
              assist you.
            </p>
            <h3>Martins</h3>
            <p>Graphic Designer</p>
          </div>
          <div className="innovation_feedback-testimonial-box">
            <p>
              Grazac innovation space is a space that always gets me inspired
              and helps to bring out the best in me. I guarantee that it’s the
              best place to be.
            </p>
            <h3>Gboyega</h3>
            <p>Programmer</p>
          </div>
        </div>
      </div>
      <div className="innovation_community">
        <h1>Join other founder, freelancer, makers and many-hat wearers</h1>
        <p>Join Grazac Community and take back control of your day</p>
        <button onClick={modalReveal}>
          Join Community
          <img src={purplearrow} alt="" className="hvr-buzz" />
        </button>
      </div>
      <Subscribe />
      <Scroll />
    </div>
    </>
  );
};

export default Innovation;
