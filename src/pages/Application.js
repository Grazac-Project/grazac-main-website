// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Modal from "../components/modal";
import { inputChangeHandler, handleBlur } from "../handler";
import Logo from "../images/logo-head.png";
import ShowContext from "../showContext";
import { validateEmail, required, numberCheck } from "../validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Application = () => {
  const [loading, setLoading] = useState(false);
  const { modalReveal, modal, modalClick } = React.useContext(ShowContext);
  const [formValid, setFormValid] = useState(false);
  // const [error, setError] = useState("");
  // Sidebar
  const [content, setContent] = useState([
    { id: "1.", name: "Company", active: true },
    { id: "2.", name: "Founders", active: false },
    { id: "3.", name: "Product/Solution", active: false },
    { id: "4.", name: "Progress", active: false },
  ]);

  const changeHandler = (index) => {
    if (index === "2.") {
      window.scrollTo(50, 548);
    } else if (index === "3.") {
      window.scrollTo(50, 968);
    } else if (index === "4.") {
      window.scrollTo(50, 1368);
    } else {
      window.scrollTo(0, 0);
    }
    setContent(
      content.map((item) => {
        if (item.id === index) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      })
    );
  };
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };

    setContent((prevState) => {
      let data;
      if (offset >= 0 && offset < 548) {
        data = prevState.map((item) => {
          if (item.id === "1.") item.active = true;
          else item.active = false;
          return item;
        });
      } else if (offset >= 548 && offset < 850) {
        data = prevState.map((item) => {
          if (item.id === "2.") item.active = true;
          else item.active = false;
          return item;
        });
      } else if (offset >= 850 && offset < 1368) {
        data = prevState.map((item) => {
          if (item.id === "3.") item.active = true;
          else item.active = false;
          return item;
        });
      } else {
        data = prevState.map((item) => {
          if (item.id === "4.") item.active = true;
          else item.active = false;
          return item;
        });
      }
      return data;
    });
  }, [offset]);

  // LocalStorage

  const [saved] = useState(JSON.parse(localStorage.getItem("saved")));
  // const [savedSuccess, setSavedSucess] = useState(false);

  // Company Form
  const [companyForm, setCompanyForm] = useState({
    name: {
      label: "Company's Name",
      elementType: "input",
      value: saved ? saved.name : "",
      type: "text",
      validations: [required],
      isValid: false,
      blur: false,
    },
    email: {
      label: "Company's Email Address",
      elementType: "input",
      value: saved ? saved.email : "",
      type: "email",
      validations: [validateEmail],
      isValid: false,
      blur: false,
    },
    url: {
      label: "Company's URL (if any)",
      elementType: "input",
      value: saved ? saved.url : "",
      type: "url",
      validations: [],
      isValid: true,
      blur: false,
    },
    location: {
      label: "Company's Location Address",
      elementType: "input",
      value: saved ? saved.location : "",
      type: "text",
      isValid: true,
      validations: [required],
      blur: false,
    },
  });

  const companyArr = [];
  for (let key in companyForm) {
    companyArr.push({
      key,
      config: companyForm[key],
    });
  }

  const coyForm = companyArr.map(({ config, key }) => (
    <Input
      key={key}
      elementType={config.elementType}
      value={config.value}
      label={config.label}
      type={config.type}
      isValid={config.isValid}
      blur={config.blur}
      onchange={(event) =>
        inputChangeHandler(
          event,
          key,
          companyForm,
          setCompanyForm,
          formValidation
        )
      }
      onblur={() => handleBlur(key, companyForm, setCompanyForm)}
    />
  ));

  // Founders Form
  const [foundersForm, setFoundersForm] = useState({
    teamSize: {
      elementType: "input",
      label: "How many founders are on the team?",
      type: "number",
      value: saved ? saved.teamSize : "",
      validations: [required],
      isValid: false,
      blur: false,
    },
    founderEmail: {
      label: "Email address of the founder who is filling this application",
      elementType: "input",
      value: saved ? saved.email : "",
      type: "email",
      validations: [validateEmail],
      isValid: false,
      blur: false,
    },
    phoneNumber: {
      type: "text",
      elementType: "input",
      value: saved ? saved.phoneNumber : "",
      label: "Phone Number",
      validations: [numberCheck],
      isValid: false,
      blur: false,
    },
  });

  const foundersArr = [];
  for (let key in foundersForm) {
    foundersArr.push({
      key,
      config: foundersForm[key],
    });
  }

  const foundForm = foundersArr.map(({ config, key }) => (
    <Input
      key={key}
      elementType={config.elementType}
      value={config.value}
      label={config.label}
      type={config.type}
      options={config.options}
      isValid={config.isValid}
      blur={config.blur}
      onchange={(event) =>
        inputChangeHandler(
          event,
          key,
          foundersForm,
          setFoundersForm,
          formValidation
        )
      }
      onblur={() => handleBlur(key, foundersForm, setFoundersForm)}
    />
  ));

  // Product Form
  const [productForm, setProductForm] = useState({
    description: {
      label:
        "What is your company going to make? Please describe your product and what it does or will do.",
      type: "text",
      elementType: "input",
      value: saved ? saved.description : "",
      validations: [required],
      isValid: false,
      blur: false,
    },
    why: {
      label:
        "Why are you making this? What problem did you develop your solution for?",
      type: "text",
      elementType: "input",
      value: saved ? saved.why : "",
      validations: [required],
      isValid: false,
      blur: false,
    },
    uniqueValue: {
      label: "What makes you the best suited to work on this problem?",
      type: "text",
      elementType: "input",
      value: saved ? saved.uniqueValue : "",
      validations: [required],
      isValid: false,
      blur: false,
    },
    businessModel: {
      label: "How does this product make money",
      type: "text",
      elementType: "input",
      value: saved ? saved.businessModel : "",
      validations: [required],
      isValid: false,
      blur: false,
    },
    ideaSource: {
      label:
        "Why did you pick this idea to work on? Do the founders have domain expertise in this area? How do you know people need what you're making?",
      type: "text",
      elementType: "input",
      value: saved ? saved.ideaSource : "",
      validations: [required],
      isValid: false,
      blur: false,
    },
    journey: {
      type: "text",
      elementType: "input",
      value: saved ? saved.journey : "",
      label:
        "Please tell us in a few sentences about the journey of building this company, so far:*",
      validations: [required],
      isValid: false,
      blur: false,
    },
  });
  const productArr = [];
  for (let key in productForm) {
    productArr.push({
      key,
      config: productForm[key],
    });
  }

  const prodForm = productArr.map(({ config, key }) => (
    <Input
      key={key}
      elementType={config.elementType}
      value={config.value}
      label={config.label}
      type={config.type}
      isValid={config.isValid}
      blur={config.blur}
      onchange={(event) =>
        inputChangeHandler(
          event,
          key,
          productForm,
          setProductForm,
          formValidation
        )
      }
      onblur={() => handleBlur(key, productForm, setProductForm)}
    />
  ));

  // Progress Form
  const [progressForm, setProgressForm] = useState({
    stage: {
      label: "What phrase best describes the stage of your development?",
      options: [
        { value: "", displayValue: "--Please Select One--" },
        {
          value: "underdeveloped",
          displayValue: "Underdeveloped",
        },
        { value: "developing", displayValue: "Developing" },
        { value: "developed", displayValue: "Developed" },
      ],
      value: saved ? saved.stage : "",
      elementType: "select",
      validations: [required],
      isValid: false,
    },
    hasRequiredTalent: {
      label: "Do you have all the talents required to build your product?*",
      options: [
        {
          value: "Yes",
          displayValue: "Yes",
        },
        { value: "No", displayValue: "No" },
      ],
      value: saved ? saved.hasRequiredTalent : "Yes",
      elementType: "select",
      validations: [],
      isValid: true,
    },
    isGeneratingIncome: {
      label: "Is your product generating income?",
      options: [
        { value: "No", displayValue: "No" },
        {
          value: "Yes",
          displayValue: "Yes",
        },
      ],
      value: saved ? saved.isGeneratingIncome : "No",
      elementType: "select",
      validations: [],
      isValid: true,
    },
    monthlyRevenue: {
      label: "What amount of revenue are you generating monthly?",
      options: [
        { value: "", displayValue: " --Please Select One--" },
        {
          value: "<1,000,000",
          displayValue: "<1,000,000",
        },
        { value: ">1,000,000<5,000,000", displayValue: ">1,000,000<5,000,000" },
        { value: ">5,000,000", displayValue: ">5,000,00" },
      ],
      value: saved ? saved.monthlyRevenue : "",
      validations: [required],
      elementType: "select",
      isValid: false,
    },
    achievements: {
      label:
        "Summarize your progress and achievements so far in a few bullet points. If you have numbers to support this, please show",
      type: "text",
      elementType: "input",
      value: saved ? saved.achievements : "",
      validations: [required],
      isValid: false,
    },
  });
  const progressArr = [];
  for (let key in progressForm) {
    progressArr.push({
      key,
      config: progressForm[key],
    });
  }

  const progForm = progressArr.map(({ config, key }) => (
    <Input
      key={key}
      elementType={config.elementType}
      value={config.value}
      label={config.label}
      type={config.type}
      isValid={config.isValid}
      blur={config.blur}
      options={config.options}
      onchange={(event) =>
        inputChangeHandler(
          event,
          key,
          progressForm,
          setProgressForm,
          formValidation
        )
      }
      onblur={() => handleBlur(key, progressForm, setProgressForm)}
    />
  ));
  // const loadData = () => {
  //   const data = new FormData();
  //   for (let key in companyForm) {
  //     data.append(key, companyForm[key].value);
  //   }
  //   for (let key in productForm) {
  //     data.append(key, productForm[key].value);
  //   }
  //   for (let key in foundersForm) {
  //     data.append(key, foundersForm[key].value);
  //   }
  //   for (let key in progressForm) {
  //     data.append(key, progressForm[key].value);
  //   }

  //   return JSON.stringify(data);
  // };
  const loadData = () => {
    const data = {};

    for (let key in companyForm) {
      data[key] = companyForm[key].value;
    }
    for (let key in productForm) {
      data[key] = productForm[key].value;
    }
    for (let key in foundersForm) {
      data[key] = foundersForm[key].value;
    }
    for (let key in progressForm) {
      data[key] = progressForm[key].value;
    }

    return JSON.stringify(data);
  };
  const valid = {};
  const formValidation = () => {
    for (let key in companyForm) {
      valid[key] = companyForm[key].isValid;
    }
    for (let key in productForm) {
      valid[key] = productForm[key].isValid;
    }
    for (let key in foundersForm) {
      valid[key] = foundersForm[key].isValid;
    }
    for (let key in progressForm) {
      valid[key] = progressForm[key].isValid;
    }
    let formIsValid = true;
    for (let key in valid) {
      formIsValid = valid[key] && formIsValid;
    }
    setFormValid(formIsValid);
    console.log(formValid);
  };
  // const saveForLater = () => {
  //   const savedData = loadData();
  //   const save = {};
  //   for (var value of savedData) {
  //     save[value[0]] = value[1];
  //   }
  //   localStorage.setItem("saved", JSON.stringify(savedData));
  //   setSavedSucess(true);
  //   setTimeout(() => {
  //     setSavedSucess(false);
  //   }, 3000);
  // };
  const handleSubmit = () => {
    setLoading(true);
    const data = loadData();
    axios
      .post(
        "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/startup/submit",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.status === false) {
          setLoading(false);
          toast.error(res.data.msg.replace(/(<([^>]+)>)/gi, ""));
          return;
        } else {
          modalReveal();
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error!!! Pls, check your inputs again");
      });
  };

  // const handleSubmit = () => {

  //   setLoading(true);
  //   const data = loadData();
  //   axios
  //     .post("http://localhost:3500/api/v1/startup/submit/api/v1/startup/submit ", data)
  //     .then((res) => {
  //       console.log(res.data)
  //       setLoading(false);
  //       if (!res.data.success) {
  //         setLoading(false)
  //         alert(res.data.msg.replace(/(<([^>]+)>)/gi, ""));
  //         return;
  //       } else {
  //         modalReveal();
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false)
  //       alert("Error!!! Pls, check your inputs again")
  //     });
  // };
  return (
    <div className="apply">
      <Helmet>
        <title>Apply - Grazac</title>
        <meta
          name="description"
          content="Application Form to be a part of Grazac Startup"
        />
        <meta name="theme-color" content="#773DD3" />
      </Helmet>
      {modal ? (
        <Modal close={() => modalClick(false)}>
          <h6>Congratulation</h6>
          <p>Your Request has been successfully submitted</p>
        </Modal>
      ) : null}
      <div className="apply__container">
        {" "}
        <ToastContainer closeButton={false} />
        <aside className="apply__aside">
          <div className="apply__aside-box">
            <div className="apply__aside-container">
              <h6>Contents</h6>
              <ul type="1." className="apply__aside-list">
                {content.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => changeHandler(item.id)}
                    className={[
                      "apply__aside-item",
                      item.active ? "selected" : "",
                    ].join(" ")}
                  >
                    <span>{item.id}</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <div className="apply__form">
          <div className="apply__form-container">
            <Link to="/" className="apply__form-link">
              <img src={Logo} alt="Grazac Logo" />
            </Link>
            <p className="apply-title ">Fill out the form below</p>
            <div>
              <div className="">
                <h3 className="apply-title">Company</h3>
                <form className="apply-form">
                  <div className="apply__form-company-box apply-form-box">
                    {coyForm}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="apply-title">Founders</h3>
                <form className="apply-form">
                  <div className="apply__form-founders-box apply-form-box">
                    {foundForm}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="apply-title">Products/Solution</h3>
                <form className="apply-form">
                  <div className="apply__form-product-box apply-form-box">
                    {prodForm}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="apply-title">Progress</h3>
                <form className="apply-form">
                  <div className="apply__form-progress-box apply-form-box">
                    {progForm}
                  </div>
                </form>
              </div>
            </div>
            <div className="apply__btns mt">
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="apply__btn"
                  onClick={handleSubmit}
                  disabled={!formValid}
                >
                  Submit Application
                </button>
              )}
              {/* <button
                className="apply__btn"
                onClick={saveForLater}
                disabled={savedSuccess ? true : false}
              >
                {savedSuccess ? "Saved" : " Save for later"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
