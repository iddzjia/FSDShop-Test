import React, { useState, useEffect, Component } from "react";
import { Button, Card, Alert, Nav, variant } from "react-bootstrap";
import validator from "validator";
import Axios from "axios";

import "../../asset/common/Style.css";
import config from "../config/Config";
import ErrPage from "../../components/common/ErrPage";

function Registration() {
  const PATH = config().path + "/login/user";
  const [msg, setMsg] = useState("", []);

  const [uemail, setUserEmail] = useState("");
  const [fname, setName] = useState("");
  const [pword, setPassword] = useState("");
  const [pword1, setPassword1] = useState("");

  const btn_new = () => {
    if (isVerified()) {
      Axios.post(PATH + "/", {
        uemail: uemail,
        role: 0,
        pword: pword,
      }).then((rs) => {
        setMsg((msg) => [...msg, rs.data]);
      });
    }
  };

  function isVerified() {
    var rs = true;
    setMsg("");
    if (pword != pword1) {
      setMsg((msg) => [...msg, "Confirm your password please."]);
      rs = false;
    }

    if (!validator.isEmail(uemail)) {
      setMsg((msg) => [...msg, "Check your email."]);
      rs = false;
    }

    if (fname.length < 4 || fname.length > 20) {
      setMsg((msg) => [...msg, "Check your name."]);
      rs = false;
    }

    if (pword.length < 6 || pword.length > 50) {
      setMsg((msg) => [...msg, "Check your pword lenth between 6 to 50."]);
      rs = false;
    }

    return rs;
  }

  return (
    <>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" encType="multipart/form-data">
              <h1 className="mb-3">Register</h1>

              <div className="form-group">
                <label for="name_field">Name</label>
                <input
                  type="text"
                  name="fname"
                  id="name_field"
                  class="form-control"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label for="email_field">Email</label>
                <input
                  type="text"
                  name="uemail"
                  id="email_field"
                  className="form-control"
                  placeholder="Enter Email"
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
                  id="password_field"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label for="password_field">Confirm Password</label>
                <input
                  type="password"
                  name="pword1"
                  id="password_field"
                  className="form-control"
                  placeholder="Confirm your password"
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                />
              </div>

              <div className="regisbtn">
                <button
                  id="register_button"
                  type="submit"
                  class="btn btnregister"
                  onClick={btn_new}
                >
                  REGISTER
                </button>
                <button className="btn btnreset" type="reset">
                  RESET
                </button>
              </div>

              {msg
                ? msg.map((i) => (
                    <Alert>
                      <li>{i}</li>
                    </Alert>
                  ))
                : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
