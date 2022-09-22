import React, {useState, useEffect, Component} from "react";
import { Button, Card, Alert, Nav, variant } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

import validator from 'validator';
import Axios from "axios"
import '../../asset/common/Style.css'
import config from '../config/Config'
const PATH = config().path + "/product"

function Product(props)  {

  let { id } = useParams();
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [msg, setMsg] = useState("")

  //const pid = 2  // props.pid
  const uid = 1   // get uid from token

  useEffect(() => {
    Axios.get(`http://localhost:3001/product/${id}`).then((rs) => {
      //console.log(rs.data.pid);
      setProduct(rs.data);
    });
  }, []);

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

<div class="container container-fluid">
        <div class="row f-flex justify-content-around">
          <div class="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={process.env.PUBLIC_URL + `/images/${product.img}.jpg`}
              alt="img product"
              height="400"
              width="400"
            />
          </div>
          <div class="col-12 col-lg-5 mt-5">
            <h3>{product.pname}</h3>
            <p id="product_id">Product # {product.pid}</p>
            <hr />
            <StarRatings
              rating={product.rate}
              numberOfStars={5}
              starRatedColor="#febd69"
              starDimension={20}
              starSpacing={1}
            />
            <hr />

            <p id="product_price">${product.price}</p>
            
            <hr />
            <h4 class="mt-2">Description:</h4>
            <p>{product.description}</p>
           
            <button
              type="button"
              id="cart_btn"
              class="btn btn-primary d-inline mt-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </ >
  );
}


export default Product;
