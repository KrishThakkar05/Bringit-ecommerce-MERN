import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handelAdd =   async (selectedProduct, quantity) => {
    const productWithId = {
      imgUrl: selectedProduct.imgUrl,
      name: selectedProduct.productName,
      price: selectedProduct.price,
      productId: String(selectedProduct.id), // Always send as string
      quantity: Number(quantity),
    };

    if (!productWithId.productId) {
      console.warn("🚨 productId missing in selectedProduct:", selectedProduct);
    }

     try {
          const response = await fetch("http://localhost:5000/api/cart/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userInfo._id, product: productWithId }),
              });
    
          const data = await response.json();
          
          
          if (response.ok) {
            toast.success("Product added to cart!");
            dispatch(addToCart({ product:productWithId, num: quantity }));
          } else {
            toast.error(data.message || "Failed to add product to cart.");
          }
        } catch (error) {
          toast.error("Server error while adding to cart.");
          console.error("Add to Cart Error:", error);
        }
  };



  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct?.imgUrl} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div>
            <div className="info">
              <span className="price">₹{selectedProduct?.price?.toLocaleString('en-IN')}</span>
              <span>category:{selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.shortDesc}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
