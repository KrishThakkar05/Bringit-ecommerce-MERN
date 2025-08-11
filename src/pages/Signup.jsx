import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../app/features/authSlice";
import "../styles/Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    try {
      const result = await dispatch(register({ name, email, password }));

      if (register.fulfilled.match(result)) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      // Error is handled by the Redux slice
    }
  };

  return (
    <div className="signup-wrapper">
      <h2>Sign Up</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Registered! Redirecting to login...</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </Form>

      <div className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
