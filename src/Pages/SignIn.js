import React, { useState,useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";

//icons
import { AiOutlineUser } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import { Box } from "@mui/system";
import axios from "axios";
import { urlBackend } from "../constans/configUrl";

const SignIn = () => {


  const [loading, setLoading] = useState(false);
  const [theme] = useThemeHook();
  const [listDataEmployes,setListaDataEmployes]=useState([])
  const navigate = useNavigate();


  useEffect(() => {
    loadEmployes()
  },[]);
const loadEmployes = async ()=> {
  try {
   const res=await axios.get(`${urlBackend}/api/v1/users`)
   console.log("res " ,res.data)
   setListaDataEmployes(res.data)

  

  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response;
  }
}

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    if (username && password) {
      setLoading(true);
      var dataEmployer = listDataEmployes.find((x) => ( x.first_name === username && x.password===password) );
      if(dataEmployer)
      {
        
        setLoading(false);
        console.log("filter hogar", dataEmployer);
        localStorage.setItem("username", username);
        localStorage.setItem("user", JSON.stringify(dataEmployer));
        console.log( "username", localStorage.getItem("username")); //null (primera vez)
        
        console.log( "user",JSON.parse(localStorage.getItem("user"))); //null (primera vez)
        
        
        navigate('/')

        window.location.reload()
      }
      else{
        setLoading(false);
        alert("Los datos no son correctos o el usurio no esta resgristado")
      }
    
    
    }
  };
  return (
    <Box>
        <br/><br/><br/><br/><br/><br/>
   
         <Box sx={{width:'50%',margin:'auto'}}>
            
         <h1
            className={`text-center border-bottom pb-3 ${
              theme ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Iniciar Session
          </h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <AiOutlineUser size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                minLength={3}
                required
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <VscKey size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                minLength={3}
                required
              />
            </InputGroup>
            <Button
              type="submit"
              className={`${
                theme ? "bg-dark-primary text-black" : "bg-light-primary"
              } m-auto d-block`}
              disabled={loading}
              style={{ border: 0 }}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <Form.Group className="mt-3 text-center">
              
              <Row className="py-2 border-bottom mb-3" />
              <Link to="/register" className="btn btn-info rounded-0">
                Create your account
              </Link>
            </Form.Group>
          </Form>
       
         </Box>
    </Box>
  );
};

export default SignIn;
