import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={6} className="footer-box">
            <div className="footer-logo">
              <ion-icon name="bag"></ion-icon>
              <h2>Bringit</h2>
            </div>
            <p>
              Quality products and excellent service. We care about your
              shopping experience.
            </p>
          </Col>

          <Col md={3} sm={6} className="footer-box">
            <h4>About Us</h4>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="footer-box">
            <h4>Customer Care</h4>
            <ul>
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Track Your Order</li>
              <li>Corporate Purchases</li>
              <li>Returns & Refunds</li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="footer-box">
            <h4>Contact Us</h4>
            <ul>
              <li>70 Washington Square, New York, NY 10012</li>
              <li>Email: support@Bringit.com</li>
              <li>Phone: +1 1123 456 780</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <p className="text-center copyright">
          &copy; {new Date().getFullYear()} Bringit. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
