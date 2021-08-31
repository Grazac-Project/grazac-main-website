// @ts-nocheck
import React, { useState } from 'react';
import axios from 'axios';

const Tour = ({tour, setTour}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [text, setText] = useState('Submit');
    const [disabled, setDisabled] = useState(false);

    const bookTour = e => {
        e.preventDefault();
        setText('Submitting...');
        setDisabled(true);
        var formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);
        axios.post('https://grazac.com.ng/space/tour', formData)
        .then(resp => resp.data)
        .then(resp => {
          if(resp.success === true) {
            alert('Your tour has been booked, we will reach out to you shortly.');
            document.querySelector('#bookTour').reset();
            setTour(false);
            setDisabled(false);
            setText('Submit');
          } else {
            setText('Submit');
            setDisabled(false);
            alert(resp.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

    return tour ? (
      <div className="innovation_hero-bg">
        <div className="innovation_hero-form">
          <div className="popup__cancel" onClick={() => setTour(false)}>
            <span>X</span>
          </div>
          <h3>
            Book a Tour
        
          </h3>
          <form id="bookTour" onSubmit={bookTour}>
            <div>
              <div className="innovation_hero-form-flexinput">
                <input
                  type="text"
                  placeholder="First Name"
                  minLength={3}
                  name="first_name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  minLength={3}
                  name="last_name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="innovation_hero-form-flexinput">
                <input
                  type="email"
                  placeholder="Email Address"
                  minLength={10}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  minLength={11}
                  maxLength={15}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  required
                />
              </div>
              <div className="innovation_hero-form-flexinput">
                <input
                  type="text"
                  placeholder="Message (Optional)"
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <button disabled={disabled} type="submit">
              {text}
            </button>
          </form>
        </div>
      </div>
    ) : null;

}
export default Tour;