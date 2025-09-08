import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        const cartLocal = localStorage.getItem("cart");
        if(cartLocal) {
            setCartList(JSON.parse(cartLocal));
        }
    }, []);

    const addToCart = (product) => {
        if(!isInCart(product.id))
        {
            const newList = [...cartList, {...product, count: 1}];
            setCartList(newList);
            localStorage.setItem("cart", JSON.stringify(newList))
        }
    }

    const cartCount = () => {
        let result = 0;
        for (const item of cartList) {
            result += item.count;
        }
        return result;
    }

    const removeFromCart = (id) => {
        const newList = cartList.filter(p => p.id !== id);
        setCartList(newList);
        localStorage.setItem("cart", JSON.stringify(newList));
    }

    const isInCart = (id) => {
        return cartList.findIndex(p => p.id === id) >= 0;
    }

    return (
        <CartContext.Provider value={{cartList, addToCart, removeFromCart, isInCart, cartCount, setCartList}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);