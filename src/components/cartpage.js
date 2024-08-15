
import React, { useState,useEffect} from 'react';
import CartItem from './cartitem';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

 const CartPage = () => {
  const {state} = useLocation();
  const {product } = state; 
  
  
  
  // Read values passed on state
  
  console.log(product);
  
  const [cartItems, setCartItems] = useState([product]);
  const [discount, setDiscount] = useState(0);

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyDiscount = (subtotal) => {
    return subtotal - discount;
  };

  const subtotal = calculateSubtotal();
  const total = applyDiscount(subtotal);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))}
          <div className="cart-summary">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Discount: ${discount.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={() => alert('Checkout not implemented')}>Checkout</button>
          </div>
          <div className="discount">
            <input
              type="number"
              placeholder="Discount Amount"
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
 };

export default CartPage;

