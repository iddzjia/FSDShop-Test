import React, { useState, useEffect, Component } from "react";
import {
  Button,
  Card,
  Alert,
  Nav,
  variant,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import {
  Route,
  Routes,
  Link,
  Redirect,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import validator from "validator";
import Axios from "axios";

import "../../asset/common/Style.css";
import config from "../config/Config";

function Login() {
  const PATH = config().path;
  const [uemail, setUserEmail] = useState("");
  const [pword, setPassword] = useState("");

  const btn_login = () => {
    Axios.post(PATH + "/login", {
      uemail: uemail,
      pword: pword,
    }).then((rs) => {
      const obj = rs.data;
      if (obj.isAuth == 1) {
        obj.isAuth = config().auth;
        obj.user.role == 1
          ? (obj.user.role = config().admin)
          : (obj.user.role = config().user);
        sessionStorage.setItem("token", JSON.stringify(obj));
        alert("Welcome.");
        window.location.reload();
      } else {
        alert("Incorrect username or password.");
      }
    });
  };

  const btn_logoff = () => {
    sessionStorage.setItem("token", null);
    window.location.replace("/");
  };

  const objToken = JSON.parse(sessionStorage.getItem("token"));
  if (objToken && objToken.isAuth.charAt(objToken.isAuth.length - 1) == "1") {
    return (
      <>
        <div className="form-group">
          Welcome: {JSON.parse(sessionStorage.getItem("token")).user.uemail}{" "}
          &nbsp;&nbsp;
        </div>
        <button className="btn btn-outline-secondary" onClick={btn_logoff}>
          {" "}
          Logoff{" "}
        </button>
      </>
    );
  } else {
    return (
      <>
        <div className="container container-fluid">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg">
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label for="email_field">Email</label>
                  <input
                    type="email"
                    name="uemail"
                    size="20"
                    maxLength="30"
                    id="uemail"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label for="password_field">Password</label>
                  <input
                    type="password"
                    name="pword"
                    size="20"
                    maxLength="6"
                    id="pword"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  id="login_button"
                  className="btn btn-block py-3"
                  onClick={btn_login}
                >
                  LOGIN
                </button>
                <div className="registerlink">
                <Link to="/registration">New User?</Link>             
                </div>                
              </form>
            </div>
          </div>
        </div>
      </>
    ); // return close
  }
} // class close

export default Login;
