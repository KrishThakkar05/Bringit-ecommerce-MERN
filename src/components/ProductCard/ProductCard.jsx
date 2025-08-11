import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";


const ProductCard = ({ title, productItem }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleViewDetails = () => {
    navigate(`/shop/${productItem.id}`);
  };

  const handleAddToCart = async () => {
    if (!userInfo) {
      toast.error("Please login to add items to cart.");
      navigate("/login");
      return;
    }

 const product = {
  productId: String(productItem._id || productItem.id), // Always send as string
  name: productItem.productName,
  price: productItem.price,
  imgUrl: productItem.imgUrl,
  quantity: 1,
};


  console.log("Adding to cart:", product);
    try {
      const response = await fetch("http://localhost:5000/api/cart/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userInfo._id, product }),
          });

      const data = await response.json();
      
      
      if (response.ok) {
        toast.success("Product added to cart!");
        dispatch(addToCart({ product, num: 1 }));
      } else {
        toast.error(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("Server error while adding to cart.");
      console.error("Add to Cart Error:", error);
    }
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" && (
        <span className="discount">{productItem.discount}% Off</span>
      )}

      <img
        loading="lazy"
        onClick={handleViewDetails}
        src={productItem.imgUrl}
        alt={productItem.productName}
        style={{ cursor: "pointer" }}
      />

      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>

      <div className="product-details">
        <h3 onClick={handleViewDetails} style={{ cursor: "pointer" }}>
          {productItem.productName}
        </h3>

        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>

        <div className="price">
          <h4>₹{productItem.price?.toLocaleString('en-IN')}</h4>
          <button
            aria-label="Add"
            type="button"
            className="add"
            onClick={handleAddToCart}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
