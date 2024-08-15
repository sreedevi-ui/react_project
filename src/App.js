import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductList from './components/ProductList';
import CartPage from './components/cartpage';
import './App.css';



const App = () => {
    const [products] = useState([ ]);

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId, quantity) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    const removeItem = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList products={products} addToCart={addToCart} />} />
                <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
            </Routes>
        </Router>
    );
};

export default App;



