import { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Alert, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCartList } from "../app/features/cart/cartSlice";
import "../styles/cart.css";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";


const Cart = () => {
  useWindowScrollToTop();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Fetch cart from backend only on login/page load
  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) return;
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${userInfo._id}`);
        const data = await res.json();
        dispatch(setCartList(data?.products || []));
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
    // Only run on login/page load, not on cartList change
    // eslint-disable-next-line
  }, [userInfo, dispatch]);

  // Delete product from cart
  const handleDelete = async (productId) => {
    const res = await fetch(`http://localhost:5000/api/cart/${userInfo._id}/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(setCartList(data.cart.products));
    }
  };

  // Checkout handler
  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${userInfo._id}/checkout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress: {},
          paymentMethod: 'Credit Card'
        }),
      });

      if (res.ok) {
        const responseData = await res.json();
        setOrderData(responseData.order);
        setShowOrderSummary(true);
        dispatch(setCartList([])); // Clear cart
      } else {
        const errorData = await res.json();
        alert(`❌ Checkout failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error("❌ Error during checkout:", err);
      alert("❌ Checkout failed: Network error");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Close order summary modal
  const handleCloseOrderSummary = () => {
    setShowOrderSummary(false);
    setOrderData(null);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (!userInfo) return;
    if (newQuantity < 1) {
      // Remove item if quantity goes below 1
      await handleDelete(productId);
      return;
    }
    const res = await fetch(
      `http://localhost:5000/api/cart/${userInfo._id}/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      dispatch(setCartList(data.cart.products));
    }
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {loading ? (
              <h2>Loading...</h2>
            ) : cartList.length === 0 ? (
              <h1 className="no-items product">No Items in Cart</h1>
            ) : (
              cartList.map((item) => {
                const productTotal = item.price * (item.quantity || 1);
                return (
                  <div className="cart-list" key={item.productId}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.imgUrl} alt={item.name} />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.name}</h3>
                            <h4>
                              ₹{item.price?.toLocaleString('en-IN')} × {item.quantity}
                              <span> = ₹{productTotal?.toLocaleString('en-IN')}</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cart-delete text-end">
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(item.productId)}
                            >
                              Delete
                            </button>
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col xs={4} className="text-start">
                            <button
                              className="btn btn-outline-secondary"
                              aria-label="Decrement quantity"
                              title="Decrease quantity"
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="mx-2" style={{ minWidth: 32, display: 'inline-block', textAlign: 'center' }}>{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary"
                              aria-label="Increment quantity"
                              title="Increase quantity"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            >
                              +
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                );
              })
            )}
          </Col>

          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>₹{totalPrice?.toLocaleString('en-IN')}</h3>
              </div>

              {cartList.length > 0 && (
                <button 
                  className="btn btn-success w-100 mt-3" 
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Processing..." : "Checkout"}
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Order Summary Modal */}
      <Modal show={showOrderSummary} onHide={handleCloseOrderSummary} size="lg" centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>🎉 Order Confirmed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderData && (
            <>
              <Alert variant="success" className="text-center">
                <h4>Thank you for your order!</h4>
                <p className="mb-0">Order #{orderData.orderNumber}</p>
                <p className="mb-0">
                  Order Date: {new Date(orderData.orderDate).toLocaleDateString()}
                </p>
              </Alert>

              <Row className="mb-4">
                <Col md={6}>
                  <h5>Order Summary</h5>
                  <p><strong>Total Items:</strong> {orderData.totalItems}</p>
                  <p><strong>Total Amount:</strong> ₹{orderData.totalAmount?.toLocaleString('en-IN')}</p>
                  <p><strong>Status:</strong> 
                    <Badge bg="warning" className="ms-2">
                      {orderData.status}
                    </Badge>
                  </p>
                </Col>
                <Col md={6}>
                  <h5>Payment Information</h5>
                  <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
                </Col>
              </Row>

              <div className="mb-4">
                <h5>Ordered Products</h5>
                {orderData.products.map((product, index) => (
                  <div key={index} className="border rounded p-3 mb-2">
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img 
                          src={product.imgUrl} 
                          alt={product.name} 
                          className="img-fluid rounded"
                          style={{ maxHeight: '60px' }}
                        />
                      </Col>
                      <Col xs={9} md={7}>
                        <h6 className="mb-1">{product.name}</h6>
                        <p className="text-muted mb-0">
                          Quantity: {product.quantity} × ₹{product.price?.toLocaleString('en-IN')}
                        </p>
                      </Col>
                      <Col xs={12} md={3} className="text-end">
                        <strong>₹{product.totalPrice?.toLocaleString('en-IN')}</strong>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOrderSummary}>
            Close
          </Button>
          <Button variant="success" onClick={handleCloseOrderSummary}>
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Cart;
