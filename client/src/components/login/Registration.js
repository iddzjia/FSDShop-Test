import React, {useState, useEffect, Component} from "react";
import { Button, Card, Alert, Nav, variant } from 'react-bootstrap';
import validator from 'validator';
import Axios from "axios";

import '../../asset/common/Style.css';
import config from '../config/Config';
import ErrPage from "../../components/common/ErrPage";

function Registration() {

  const PATH = config().path + "/login/user"
  const [msg, setMsg] = useState("", [])

  const [uemail, setUserEmail] = useState("")
  const [fname, setName] = useState("")
  const [pword, setPassword] = useState("")
  const [pword1, setPassword1] = useState("")

  const btn_new = () => {
    if(isVerified()){
      Axios.post(PATH + "/", {
        uemail: uemail, 
        role: 0,
        pword: pword
      }).then( rs => {
        setMsg(msg => [...msg, rs.data] )
      })
    }
  }

  function isVerified() {
    var rs = true
    setMsg("")
    if (pword != pword1) {
      setMsg(msg => [...msg, "Confirm your password please."])
      rs = false
    }

    if (!validator.isEmail(uemail)) {
      setMsg(msg => [...msg, "Check your email."])
      rs = false
    }

    if (fname.length < 4 || fname.length > 20) {
      setMsg(msg => [...msg, "Check your name."])
      rs = false
    }

    if (pword.length < 6 || pword.length > 50){
      setMsg(msg => [...msg, "Check your pword lenth between 6 to 50."])
      rs = false
    }


    return rs
  }
  
  return (
    <>
      <div className="container-fluid" id="sub_title">
        <p className="display-5">Welcome to join us !</p>
      </div>
      <div className="box">
        <form>
        <div className="form-group">
          <input className="form-control" placeholder="Enter email" type="text" name="uemail" onChange={(e)=>{
            setUserEmail(e.target.value)
          }}/><br/>
        </div>

        <div className="form-group">
          <input className="form-control" placeholder="Name" type="text" name="fname" onChange={(e)=>{
            setName(e.target.value)
          }}/><br/>
        </div>

        <div className="form-group">
          
          <input className="form-control" placeholder="Password" type="password" name="pword" onChange={(e)=>{
            setPassword(e.target.value)
          }}/><br/>
        </div>

        <div className="form-group">
          
          <input className="form-control" placeholder="Repeat your password" type="password" name="pword1" onChange={(e)=>{
            setPassword1(e.target.value)
          }}/><br/>
        </div>
        
        <Button className="btn btn-primary" onClick={btn_new}>Register</Button>&nbsp;&nbsp;
        <Button className="btn btn-secondary" type="reset">Reset</Button><br /><br />

        { (msg) ? msg.map( i => (    

        <Alert> <li>{ i }</li> </Alert> 
   
        )) : null }

        

        </form>
      </div>
    </ >
  )

 

};

export default Registration;
