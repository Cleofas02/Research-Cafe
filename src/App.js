import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AddResearch } from "./components/AddResearch";
import { ProductsContextProvider } from "./global/ProductsContext";
import Addpdft from "./components/Addpdft";
import Homepage from "./components/Homepage";
import UploadPdft from "./components/UploadPdft";
import { Auth } from "./components/Auth";


export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' Component={Homepage} />
            <Route exact path='/home' Component={Home} />
            <Route exact path='/upload' Component={UploadPdft} />
            <Route exact path='/Auth' Component={Auth} />
            <Route path='addresearch' Component={AddResearch} />
            <Route path='/pdfupload' Component={Addpdft}/>
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    )
  }
}

export default App