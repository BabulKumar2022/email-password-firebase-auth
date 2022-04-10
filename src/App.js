import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
   const handleEmailBlur =(e) =>{
    setEmail(e.target.value);
   }
   const handlePasswordBlur =(e) =>{
    setPassWord(e.target.value);
   }
   const handleRegisteredChange = (e) =>{
    setRegistered(e.target.checked);  
   };
   const handleFormSubmit =(e)=>{

    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      e.stopPropagation();
      return;
      
    }
    if(!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(passWord)){
      setError('Please enter at least one special character')
      return;
    }
      setValidated(true) 
      setError('');

    createUserWithEmailAndPassword(auth, email, passWord)
    .then(result =>{
      const user = result.user;
      console.log(user)
      setEmail('');
      passWord('');
    })
    .catch(error =>{
      console.error(error);
      setError(error.message);
    })
     
     e.preventDefault();
   }
  return (
    <div >
      <div className="form-container w-50  mx-auto  mt-5">
        <h1 className="text-primary">Please {registered ? 'Login' : 'register' }</h1>
        <Form onSubmit={handleFormSubmit} validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already register" />
            </Form.Group>
            <p className="text-danger">{error}</p>
            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
      </div>
      
     
     
     
     
      {/* <form onSubmit={handleFormSubmit}> 
        <span>Enter Email:</span> <input onBlur={handleEmailBlur} type="email" name="" id=""/>
        <br />
        <span>Password</span> <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="login" />
      </form> */}


    </div>
  );
}

export default App;
