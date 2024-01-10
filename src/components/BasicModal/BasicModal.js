import React, { useState } from 'react';
import calendar from '../../images/calendar.png';
import './BasicModal.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import {
  useFlutterwave,
  closePaymentModal,
} from 'flutterwave-react-v3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasicModal = ({ open, setOpen }) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const [value] = useState(new Date());
  const [hideCalendar, setHideCalendar] = useState(false);
  const [hideCalendar2, setHideCalendar2] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString('en-US', options)
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString('en-US', options)
  );
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const data = new FormData()
  data.set('firstName', userInfo.firstName)
  data.set('lastName', userInfo.lastName)
  data.set('email', userInfo.email)
  data.set('phoneNumber', userInfo.phoneNumber)
  
  const userLocale = navigator.language || 'en-US'
  const handleChange = (value) => {
    const formattedDate = value.toLocaleDateString(userLocale, options);
    const selectedStartDate = new Date(value);
    const currentDate = new Date().setHours(0,0,0,0);

    if (selectedStartDate < currentDate) {
      toast.error("Start date cannot be before the current date");
    } else {
      setStartDate(formattedDate);
      setEndDate(formattedDate);
      setHideCalendar(false);
    }
  };

  const handleChange2 = (value) => {
    setHideCalendar(false)
    const formattedDate = value.toLocaleDateString(userLocale, options);
    const selectedEndDate = new Date(value);
    const selectedStartDate = new Date(startDate);
    
    if (selectedEndDate < selectedStartDate) {
      toast.error('End date cannot be before the start date');
    } else {
      setEndDate(formattedDate);
      setHideCalendar2(false);
    }
  };

  const formInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const calculateNumOfDays = () => {
    const result = removeWeekends(startDate, endDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    data.set('startDate', start )
    data.set('endDate', end)
    // const timeDiff = Math.abs(end.getTime() - start.getTime());
    // const numOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    const numOfDays = result.daysRemaining;
    return numOfDays;
  };

  const totalAmount = (3000 * calculateNumOfDays());
  const url =
    'https://api-grazacacademy-0358136c0905.herokuapp.com/api/v1/user/bookSpace';

  const SpaceFeeFlutterwaveConfig = {
    public_key: 'FLWPUBK-006bdc82ad878f1518af32f44af6478f-X',
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userInfo.email,
      phonenumber: userInfo.phoneNumber,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
    },
    customizations: {
      title: 'Grazac Technologies Limited',
      description: 'Co-working Space Payment',
      logo: 'https://grazac.com.ng/logo.png',
    },
  };

  const HandleSpacePayFlutterPayment = useFlutterwave(
    SpaceFeeFlutterwaveConfig
  );


  function removeWeekends(startDateStr, endDateStr) {
    // Parse date strings to Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  
    const selectedDates = [];
    let currentDate = new Date(startDate);
    const endDateCopy = new Date(endDate);
  
    // Generate the range of dates between start and end date
    while (currentDate <= endDateCopy) {
      selectedDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // Filter out weekends (Saturday and Sunday)
    const filteredDates = selectedDates.filter(date => {
      const day = date.getDay();
      return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
    });
  
    // Calculate the number of days remaining after removing weekends
    const totalDays = (endDateCopy - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    const daysRemaining = filteredDates.length;
  
    return { filteredDates, daysRemaining, totalDays };
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, data).then((res) => {
      if (res.data.status === 201) {
        HandleSpacePayFlutterPayment({
          callback: (response) => {
            if (response.status === 'completed') {
              toast.success('Payment successful! Verifying payment...');
            }
            closePaymentModal();
            setInterval(() => {
              window.location = '/';
            }, 2500);
          },
          onClose: () => {
            window.location = '/';
          },
        });
      } else {
        toast.error('Form submission not successful');
      }
    });
  };

  return (
    <>
      <div
        className="basicModal_overlay"
        onClick={() => setOpen(false)}
      ></div>
      <div className="basicModal">
        <div className="basicModal_space">
          <ToastContainer closeButton={false} />
          <div className='close' onClick={() => setOpen(false)}>&times;</div>
          <h2>Book a Space</h2>
          <p className="para">
            You can now secure your booking for our space at just{' '}
            <strike>₦5,000</strike> <span className="thirty">₦3,000</span> (10%
            discount) naira daily, from <span>9 am to 5 pm</span>
          </p>
          <div className="basicModal_dateContainer">
            <div
              className="basicModal_dateContainer_start"
              onClick={() => {
                setHideCalendar2(false)
                setHideCalendar(true)
              }
            }
            >
              <div>
                <img src={calendar} alt="" />
              </div>
              <div>
                <p>Start Date</p>
                <p className="start-date">{startDate}</p>
              </div>
            </div>
            <div
              className="basicModal_dateContainer_end"
              onClick={() => {
                setHideCalendar(false)
                setHideCalendar2(true)
              }
            }
            >
              <div>
                <img src={calendar} alt="calendar" />
              </div>
              <div>
                <p>End Date</p>
                <p className="end-date">{endDate}</p>
              </div>
            </div>
          </div>
          <div className={`calendar ${hideCalendar ? 'visible':'hidden'}`}>
            {hideCalendar && (
              <Calendar onChange={handleChange} value={value} />
            )}
          </div>
          <div className={`calendar ${hideCalendar2 ? 'visible':'hidden'}`}>
            {hideCalendar2 && (
              <Calendar onChange={handleChange2} value={value} />
            )}
          </div>
          <div className="basicModal_price">
            <p className="basicModal_price_label">Total Price:</p>
            <p className="basicModal_price_total">
              <p className="sum">₦{totalAmount.toLocaleString()}</p>
              <p className="workings">₦3,000 x {calculateNumOfDays()} day(s)</p>
            </p>
          </div>
          <form className="basicModal_form" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder="First Name"
              name="firstName"
              onChange={formInputChange}
              value={userInfo.firstName}
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              name="lastName"
              onChange={formInputChange}
              value={userInfo.lastName}
            />
            <input
              type="text"
              required
              placeholder="Email Address"
              name="email"
              onChange={formInputChange}
              value={userInfo.email}
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={formInputChange}
              value={userInfo.phoneNumber}
            />
            <button type="submit">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicModal;





