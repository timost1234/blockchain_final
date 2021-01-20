import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./App.less";

import Header from "components/Header/Header.js";
import MiniFooter from "components/MiniFooter/MiniFooter.js";
import FoodLog from "components/FoodLog/FoodLog.js";
import ViewData from "components/ViewData/ViewData";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="">
            <Layout style={{ background: "white" }}>
              <Header />
              <FoodLog />
              <MiniFooter />
            </Layout>
          </Route>
          <Route path="localdata">
            <Layout style={{ background: "white" }}>
              <Header />
              <ViewData />
            </Layout>
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
