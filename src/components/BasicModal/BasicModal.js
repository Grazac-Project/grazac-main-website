import React, {useState} from 'react';
import calendar from '../../images/calendar.png'
import './BasicModal.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import {
    useFlutterwave,
    FlutterWaveButton,
    closePaymentModal,
  } from "flutterwave-react-v3";
  import axios from 'axios'
  import { ToastContainer, toast } from "react-toastify";



export default function BasicModal({open, setOpen}) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const [value, onChange] = useState(new Date());
    const [hideCalendar, setHideCalendar] = useState(false);
    const [hideCalendar2, setHideCalendar2] = useState(false);
    const [startNum, setStartNum] = useState(0);
    const [endNum, setEndNum] = useState(0);
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-US', options))
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-US', options))
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })
    const handleChange = (value, event) => {
        const formattedDate = value.toLocaleDateString('en-US', options);
        const dayWithSuffix = getDayWithSuffix(value.getDate());
        const dayOfMonth = Number(value.getDate())
        setStartDate(formattedDate)
        setEndDate(formattedDate)
        setStartNum(dayOfMonth)
        setEndNum(dayOfMonth)
        setHideCalendar(false)
    }
    const handleChange2 = (value, event) => {
        const formattedDate = value.toLocaleDateString('en-US', options);
        const dayWithSuffix = getDayWithSuffix(value.getDate());
        const dayOfMonth = Number(value.getDate())
        setEndDate(formattedDate)
        setEndNum(dayOfMonth)
        setHideCalendar2(false)
    }
    const formInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value})
    }
    const getDayWithSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return `${day}th`;
        }
        switch (day % 10) {
          case 1: return `${day}st`;
          case 2: return `${day}nd`;
          case 3: return `${day}rd`;
          default: return `${day}th`;
        }
      };
    const numOfDays = (endNum - startNum ) + 1;
    const totalAmount = 3000 * numOfDays
    const url = 'https://api-grazacacademy-0358136c0905.herokuapp.com/api/v1/user/bookSpace'

    const SpaceFeeFlutterwaveConfig = {
        public_key: "FLWPUBK-006bdc82ad878f1518af32f44af6478f-X",
    
        tx_ref: Date.now(),
        amount: totalAmount,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: userInfo.email,
          phonenumber: userInfo.phoneNumber,
          name: `${userInfo.firstName} ${userInfo.lastName}`,
        },
    
        customizations: {
          title: "Grazac Technologies Limited",
          description: "Co-working Space Payment",
          logo: "https://grazac.com.ng/logo.png",
        },
      };
    
      const HandleSpacePayFlutterPayment = useFlutterwave(
        SpaceFeeFlutterwaveConfig
      );
      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(url, userInfo)
          .then(res => {
            console.log(res.data.status)
            if(res.data.status === 201) {
              HandleSpacePayFlutterPayment({
                callback: (response) => {
                  console.log(response.status);
                  if(response.status === 'completed') {
                    toast.success('Payment successful! Verifying payment...')
                  }
                  closePaymentModal(); // this will close the modal programmatically
                  setInterval(() => {
                    window.location = "/";
                  }, 2500)
                },
                onClose: () => {
                  window.location = "/";
                },
              });
            } else {
              toast.error('Form submission not successful')
            }
          })
        console.log(userInfo)
        
      }
  return (
    <>
        <ToastContainer closeButton={false} />
        <div className='basicModal_overlay' onClick={() => setOpen(false)}></div>
        <div className='basicModal'>
        <div className='basicModal_space'>
          <h2>Book a Space</h2>
          <p className='para'>
              You can now secure your booking for our space at just <strike>₦5,000</strike> <span className='thirty'>₦3,000</span> (10% discount) naira daily, from <span>9 am to 5 pm</span>
          </p>
          <div className='basicModal_dateContainer'>
              {/* <div> */}
                  <div className='basicModal_dateContainer_start' onClick={() => setHideCalendar(true)}>
                      <div><img src={calendar} alt='' /></div>
                      <div >
                          <p>Start Date</p>
                          {/* <p className='start-date'>26th Dec, 2023</p> */}
                          <p className='start-date'>{startDate}</p>
                      </div>
                  </div>
                  <div className='basicModal_dateContainer_end' onClick={() => setHideCalendar2(true)}>
                      <div><img src={calendar} alt='calendar' /></div>
                      <div>
                          <p>End Date</p>
                          <p className='end-date'>{endDate}</p>
                      </div>
                  </div>
                  
              {/* </div> */}
          </div>
            {/* <div className='checkbox-label'>
                <input type='checkbox' id='day'/>
                <label htmlFor='day' className='label'>Book a day only</label>
            </div> */}
            {hideCalendar && <Calendar onChange={handleChange} value={value} />}
            {hideCalendar2 && <Calendar onChange={handleChange2} value={value} />}
          <div className='basicModal_price'>
              <p className='basicModal_price_label'>Total Price:</p>
              <p className='basicModal_price_total'>
                  <p className='sum'>₦{totalAmount}</p>
                  <p className='workings'>₦3,000 x {numOfDays} day(s)</p>
              </p>
          </div>
          <form className='basicModal_form' onSubmit={handleSubmit}>
              <input type='text' required placeholder='First Name' name='firstName' onChange={formInputChange} value={userInfo.firstName}/>
              <input type='text' required placeholder='Last Name' name='lastName' onChange={formInputChange} value={userInfo.lastName}/>
              <input type='text' required placeholder='Email Address' name='email' onChange={formInputChange} value={userInfo.email}/>
              <input type='tel' required placeholder='Phone Number' name='phoneNumber' onChange={formInputChange} value={userInfo.phoneNumber}/>
              <button type='submit'>Book Now</button>
          </form>
        </div>
        
    </div>
    </>
  );
}

