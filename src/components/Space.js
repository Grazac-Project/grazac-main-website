// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const Space = ({ form, setForm }) => {
  const [team, setTeam] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [spacePackage, setSpacePackage] = useState("");
  const [plan, setPlan] = useState("");
  const [text, setText] = useState("Book a Space");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [click, setClick] = useState(false);
  const [fetching, setFetching] = useState("");
  const [amount, setAmount] = useState();
  const addTeam = (_) => {
    if (team < 4) {
      document.querySelector("#teamBox").insertAdjacentHTML(
        "beforeend",
        `
          Team ${team}
          <div class="space__form-container">
              <div class="form-group">
                <label class="form-label">First Name:</label>
                <input
                  class="form-input"
                  required="required"
                  name="team[first_name][]"
                  type="text"
                />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name:</label>
                <input
                  class="form-input"
                  required="required"
                  name="team[last_name][]"
                  type="text"
                />
              </div>
              <div class="form-group">
                <label class="form-label">Email:</label>
                <input
                  class="form-input"
                  required="required"
                  name="team[email][]"
                  type="email"
                />
              </div>
              <div class="form-group">
                <label class="form-label">Phone:</label>
                <input
                  class="form-input"
                  required="required"
                  name="team[phone][]"
                  type="text"
                  maxLength="15"
                  minLength="11"
                />
              </div>
            </div>
          `
      );
      setTeam(team + 1);
    } else {
      alert("You can only add 3 team member");
    }
  };

  const config = {
    public_key: 'FLWPUBK-006bdc82ad878f1518af32f44af6478f-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phonenumber: phone,
      name: `${firstName} ${lastName}`,
    },
    customizations: {
      title: "Book A Space",
      description: "Payment for Innovation Space",
      logo: "https://grazac.com.ng/assets/images/favicon.png",
    },
  };

  const handlePayment = useFlutterwave(config);

  const packageChange = (e) => {
    setSpacePackage(e.currentTarget.value);
    if (e.currentTarget.value !== "Team") {
      setTeam(1);
      document.querySelector("#teamBox").innerHTML = "";
    }
  };

  const bookSpace = (e) => {
    e.preventDefault();
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(phone);
    handlePayment({
      callback: (response) => {
        console.log(response);
        setText("Submitting...");
        setDisabled(true);
        var formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("plan", plan);
        formData.append("package", spacePackage);
        formData.append("tx_id", response.transaction_id);

        if (spacePackage === "Team") {
          let team_firstName = document.getElementsByName("team[first_name][]");
          for (let f of team_firstName) {
            formData.append("team[first_name][]", f.value);
          }

          let team_lastName = document.getElementsByName("team[last_name][]");
          for (let f of team_lastName) {
            formData.append("team[last_name][]", f.value);
          }

          let team_email = document.getElementsByName("team[email][]");
          for (let f of team_email) {
            formData.append("team[email][]", f.value);
          }

          let team_phone = document.getElementsByName("team[phone][]");
          for (let f of team_phone) {
            formData.append("team[phone][]", f.value);
          }
        }

        axios
          .post("https://grazac.com.ng/space/book", formData)
          .then((resp) => resp.data)
          .then((resp) => {
            if (resp.success) {
              alert(
                "Your space has been booked, the ticket will be sent to your mail"
              );
              setForm(false);
              setText("Book a Space");
              setDisabled(false);
            } else {
              alert(resp.msg);
              setText("Book a Space");
              setDisabled(false);
            }
          })
          .catch((err) => {
            setText("Submitting...");
            setDisabled(false);
            console.log(err);
          });
          closePaymentModal();
      },
    });
  };

  useEffect(() => {
    if (spacePackage !== "" && plan !== "") {
      setFetching("Fetching Price, please wait");
      axios
        .get(
          `https://grazac.com.ng/space/price?plan=${plan}&package=${spacePackage}`
        )
        .then((res) => {
          console.log(res.data);
          setAmount(res.data.price);
          setFetching(`Amount: ₦${res.data.price}`);
          setDisabled(true);
        });
    }
  }, [spacePackage, plan]);

  return form ? (
    <div className="space">
      <div className="space__box">
        <div className="space__container">
          <div className="popup__cancel" onClick={() => setForm(false)}>
            <span>X</span>
          </div>
          <div className="space__content">
            <h2>Provide Your Details</h2>
            <form className="space__form" onSubmit={bookSpace}>
              <div className="space__form-container">
                <div className="form-group">
                  <label className="form-label">First Name:</label>
                  <input
                    className="form-input"
                    required="required"
                    name="first_name"
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name:</label>
                  <input
                    className="form-input"
                    required="required"
                    name="last_name"
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email:</label>
                  <input
                    className="form-input"
                    required="required"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone:</label>
                  <input
                    className="form-input"
                    required="required"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    maxLength="15"
                    minLength="11"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Select Plan:</label>
                  <select
                    className="form-input"
                    required="required"
                    onChange={(e) => setPlan(e.currentTarget.value)}
                  >
                    <option value="">Choose An Option</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Select Package:</label>
                  <select
                    className="form-input"
                    required="required"
                    onChange={packageChange}
                  >
                    <option value="">Choose An Option</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Team">Team</option>
                  </select>
                </div>
              </div>
              <div id="teamBox"></div>
              {
                <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  {fetching}
                </p>
              }
              <div className="space__btns">
                {spacePackage === "Team" ? (
                  <button
                    type="button"
                    onClick={addTeam}
                    className="button button-bg"
                  >
                    Add Team Member
                  </button>
                ) : null}
                <button
                  type="submit"
                  disabled={!disabled}
                  className="button button-bg"
                >
                  {text}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Space;
