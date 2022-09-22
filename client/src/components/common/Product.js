import React, {useState, useEffect, Component} from "react";
import { Button, Card, Alert, Nav, variant } from 'react-bootstrap';
import validator from 'validator';
import Axios from "axios"
import '../../asset/common/Style.css'
import config from '../config/Config'
const PATH = config().path + "/product"

function Product(props)  {

  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [msg, setMsg] = useState("")

  const pid = 1  // props.pid
  const uid = 1   // get uid from token

  useEffect(() => {
    Axios.get(PATH + "/" + pid)
    .then( rs => {
      setProduct(rs.data)
      
    })
    
  }, [])

  const btn_addtocart = () => {
    if (!isVerified()) 
      return

    const emptyCart = {
      "uid" : uid,
      "items" : []
    }

    const currentItem = 
      {
        "quantity" : quantity,
        "product" : product
      }
    
    if(localStorage.getItem("mycart")) {
      const myCart = JSON.parse(localStorage.getItem("mycart"))
      var isInMyCart = false
      myCart.items.forEach((item)=>{
        if(item.product.pid == product.pid){
          item.quantity = parseInt(item.quantity) + parseInt(quantity)
          isInMyCart = true
        }
      })

      if(!isInMyCart)
        myCart.items.push(currentItem)
      localStorage.setItem("mycart", JSON.stringify(myCart))
    } else {
      emptyCart.items.push(currentItem)
      localStorage.setItem("mycart", JSON.stringify(emptyCart))
    }
     
    setMsg("Product add to cart.")
  }

  function isVerified() {
    setMsg("")
    var rs = true
    if (quantity == "" || quantity == null || quantity <= 0) {
      setMsg(msg => [...msg, "Enter quantity please.  "])
      rs = false
    }
    
    if (quantity > 10) {
      setMsg(msg => [...msg, "The maximum quantity not more than 10.  "])
      rs = false
    }
    var qty = parseInt(quantity)
    if (!Number.isInteger(qty)) {
      setMsg(msg => [...msg, "Quantity should be a number.  "])
      rs = false
    }

    return rs
  }

  return (
    < >

      <div className="row">
      <Card style={{ width: '18rem' }} className="col-4" >
        <Card.Img variant="top" src={require("../../asset/images/product/comuter01.jpg")} />
        <Card.Body>
        <Card.Title>Product ID: { product.pid }</Card.Title>
        <Card.Title>{ product.pname }</Card.Title>
        <Card.Title>Current Price: ${ product.price }</Card.Title>
        </Card.Body>
      </Card>

      <Card.Text className="col-4">
      <Card.Title> Product rate: { product.rate }</Card.Title>
      <br/> { product.description } <br/>
      </Card.Text>
      </div>
      <br />

      <div className="box">
        <div className="form-group">
          <input className="form-control" placeholder="Enter quantity" type="number" name="quantity" onChange={(e)=>{
            setQuantity(e.target.value)
          }}/><br/>
        </div>


        <Button variant="success" onClick = { btn_addtocart } > Add to Cart </Button> &nbsp;<br /><br />
        
          { msg ? <Alert> {msg} </Alert> : null }
        
      </div>

    </ >
  );
}


export default Product;
