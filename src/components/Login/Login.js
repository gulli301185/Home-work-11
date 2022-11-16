import React, { useState,useEffect } from 'react';
import { useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


function emailReducer(state, action){
     if(action.type==="EMAIL"){
        return {
          emailValue: action.val,
          isValid: action.val.includes("@")

        }
        
      }
      if(action.type==="EMAIL-BLUR"){
        return {
          emailValue:state.emailValue,
          isValid:state.emailValue.includes("@")
        }
     }
     return state
    }


const initialState={
    emailValue:"",
    isValid:undefined,
}



function passwordReducer(state, action){
  if(action.type==="PASSWORD"){
 return {
    passwordValue:action.valPassword,
    passwordIsValid: action.valPassword.length>6,
  }
  if(action.type==="PASSWORD_BLUR"){
    return{
      passwordValue:state.passwordValue,
      passwordIsValid:state.passwordValue.trim().length>6
    }
  }
}
return state;
}


const initialStatePassword={
    passwordValue:"",
    passwordIsValid:undefined,
}

const Login = (props) => {

  const [emailState, dispatchEmail ]=useReducer(emailReducer, initialState)
  const {isValid : emailIsValid}=emailState

  const [passwordState,dispatchPassword]= useReducer(passwordReducer, initialStatePassword)
  const {passwordIsValid:passwordIsValidate} =passwordState

  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(()=>{

   const timerId= setTimeout(()=>{

      setFormIsValid(
        emailState.emailValue.includes('@') && passwordState.passwordValue.trim().length > 6  
      );
    },1000)

    return (()=>{
      clearTimeout(timerId)
    })
  },[emailIsValid,passwordIsValidate]);


  const emailChangeHandler = (event) => {
    dispatchEmail({type:"EMAIL", val: event.target.value})
  };


  const validateEmailHandler = () => {
     dispatchEmail({type:"EMAIL_BLUR"});
  };



  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"PASSWORD", valPassword:event.target.value})
  };



  const validatePasswordHandler = () => {
    dispatchPassword({type:"PASSWORD_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.emailValue, passwordState.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
