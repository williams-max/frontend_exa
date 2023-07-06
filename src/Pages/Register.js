import React, { useState } from "react";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { urlBackend } from "../constans/configUrl";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(null);
  const [theme] = useThemeHook();

  const navigate=useNavigate();


  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    const firstname = form.firstName.value;
    const lastname = form.lastName.value;
    const email = form.email.value;

    if (username && password && firstname && lastname && email) {
      setLoading(true);
      console.log("call api here");
      console.log(username, password, firstname, lastname, email, username);

      try {
        const res = await axios.post(`${urlBackend}/api/v1/users`, {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,

          name:username,

          designation: "O",
          salary: "500.00",
          status: 1,
          is_deleted: 0,
          created_at: "2019-11-19T07:30:30.000Z",
          updated_at: "2023-02-23T18:01:35.000Z",
        });

        setLoading(false);
       
        console.log("res ", res.data);
        if (res.data.error == false) {
          alert("User added successfully");
          navigate("/usuarios");
        }
      } catch (error) {
        console.log(error.response); // this is the main part. Use the response property from the error object

        return error.response;
      }
    }
  };
  return (
    <Container className="">
      <br />
      <br />
      <br />
      <Row className="justify-content-center">
        <Col
          xs={11}
          sm={10}
          md={8}
          lg={4}
          className={`p-4 rounded ${
            theme ? "text-light bg-dark" : "text-black bg-light"
          }`}
        >
          <h4
            className={`text-center border-bottom pb-3 ${
              theme ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Registro de usuarios
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                minLength={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                minLength={3}
                required
              />
            </Form.Group>
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
                "Continue"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
