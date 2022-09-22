import React, {useState, useEffect, Component} from "react";
import { Navbar, Button, Container, NavDropdown, Nav, Form } from 'react-bootstrap';
import Axios from "axios"
import Login_form from "./Login_form";
import config from '../config/Config'


function Navbar_ () {
  const PATH = config().path
  const [catergories, setCatergory] = useState([])
  useEffect(() => {
    Axios.get(PATH + "/category").then( rs => {
      setCatergory(rs.data)
    })
    
  }, [])


    return (
      <div>

        <nav class="navbar navbar-light bg-light">

          <div class="container-fluid">
              
            <div class="input-group">

              <input type="text" class="form-control" aria-label="Text input with dropdown button" />
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            </div>
              
          </div>

        </nav>

        <Navbar bg="light" variant="light">
          <Container fluid>
            <Navbar.Brand href="/">FSD Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                { catergories.map(category => 
                  <Nav.Link href="/"> { category.title }</Nav.Link>

                )}
              </Nav>
            </Navbar.Collapse>
            <Login_form />
          </Container>
        </Navbar>

        
        
      </div>
    ); // return close



} // class Navbar close

export default Navbar_;
