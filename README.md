📌 Project Description – BringIt

BringIt is a full-stack e-commerce web application built with Node.js, Express.js, and MongoDB. The project is run using the npm start command, which starts the backend server and connects it to the MongoDB database.

npm install
npm install bycrypt

💡 Functionality:

Product Listing: Products are fetched from MongoDB and displayed in the UI as a list.

Search & Filter: Users can type a product name to see relevant results (e.g., typing "chair" will only list chairs).

Add to Cart: Users can add products to the cart, update quantities, or remove items.

Checkout: Users can proceed to checkout with the selected items, along with the total amount.

Order Creation: After checkout, the order is saved in MongoDB, a unique order number is generated, and the cart is cleared.

🛠 Tech Stack:

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Frontend: HTML, CSS, JavaScript (with templates)

Others: REST APIs for cart, checkout, and search
