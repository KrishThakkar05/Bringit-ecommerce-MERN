import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get from localStorage (if any)
const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

const initialState = {
  cartList: storedCartList,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num || 1;

      const existing = state.cartList.find(
        (item) => item.productId === productToAdd.productId
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cartList.push({ ...productToAdd, quantity });
      }
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existing = state.cartList.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existing = state.cartList.find((item) => item.productId === productId);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.cartList = state.cartList.filter((item) => item.productId !== productId);
        }
      }
    },

    deleteProduct: (state, action) => {
      const product = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.productId !== product.productId
      );
    },

    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
  },
});

// ✅ Sync cart to localStorage automatically
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }

  return result;
};

export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }, { dispatch }) => {
    const res = await fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    // Optionally update local cart state with response
    dispatch(setCartList(data.products));
    return data;
  }
);

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  setCartList,
} = cartSlice.actions;

export default cartSlice.reducer;
