import React, {useState, useEffect, Component} from "react"
// import { Navbar, Button, Container, Row, Nav, Image } from 'react-bootstrap';
// import Navbar_ from '../common/Navbar_'
// import Footer from '../common/Footer'
import ErrPage from "../../components/common/ErrPage"

import Axios from 'axios'
import '../../asset/common/Style.css'
import config from '../config/Config'

const PATH = config().path

function Admin() {

  useEffect(() => {
    Axios.get(PATH + "/admin",{ headers: { 
      "token" : sessionStorage.getItem("token")

    }}).then( rs => {
      alert(rs.data)
    })
  });

  if( !JSON.parse(sessionStorage.getItem("token")) || JSON.parse(sessionStorage.getItem("token")).user.role != 1) {
    return <> <ErrPage /></>
  }

  return (
    <>
      <div>
        This is admin page.
      </div>

    </>

  
  )
  

}


export default Admin;
