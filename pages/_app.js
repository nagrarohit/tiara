import Head from "next/head";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setkey] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setkey(Math.random());
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    setkey(Math.random());
    router.push("/");
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubtotal(subt);
  };
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  return (
    <>
      <LoadingBar
        color="#000000"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
      </Head>
      <Navbar
        logout={logout}
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subtotal={subtotal}
      />
      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subtotal={subtotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
