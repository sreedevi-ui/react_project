
import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="price">${item.price.toFixed(2)}</p>
      <input
        type="number"
        
        value={item.quantity}
        defaultValue={1}
        min="1"
        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
      />
      <button onClick={() => removeFromCart(item.id)}>Remove Item</button>
    </div>
  );
};

export default CartItem;
