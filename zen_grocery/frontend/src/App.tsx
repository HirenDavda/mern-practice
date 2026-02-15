import React, { useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";

// import logo from './logo.svg';
// import './App.css';

function App() {
  // This decides which page we show
  const [view, setView] = useState<"home" | "cart">("home");

  return (
    <>
      <Header setView={setView} />
      {view === "home" && <Home />}
      {view === "cart" && <Cart />}
    </>
  );
}

export default App;
