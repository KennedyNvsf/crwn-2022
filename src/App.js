import React from "react";
import {Routes, Route} from "react-router-dom";
import Authentication from "./routes/authentication/authetication.component";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Home from "./routes/home/home.component.jsx";
import Shop from "./routes/shop/shop.component";

const App = () => {

  
  return (

      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>} />
          <Route path="shop" element={<Shop/>} />
          <Route path="auth" element={<Authentication/>} />
        </Route>
      </Routes>
    
  );
}

export default App;
