import axios from 'axios';
import React, { useState } from 'react'

const Payment = () => {
  const [product, setProduct] = useState({
    name: "Strocit 500mg Tablet 10'S",
    image: "https://cdn.netmeds.tech/v2/plain-cake-860195/netmed/wrkr/products/assets/item/free/resize-w:400/iMHipB33WF-strocit_500mg_tablet_10s_34740_0_2.jpg",
    amount: 700
  })
  const initPay = (data) => {
    const options = {
      key: "rzp_test_Ruxmmmq53aP7FB",
      amount: data.amount,
      currency: data.currency,
      name: product.name,
      description: "Test",
      image: product.image,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "https://localhost:3001/product/payment/verify";
          const { data } = await axios.post(verifyURL, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:3001/product/payment/orders";
      const { data } = await axios.post(orderURL, { amount: product.amount });
      console.log(data);
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 align="center"> Checkout Page</h1>
      <div className="App">
        <div className="shoe_container">
          <img src={product.image} alt="shoe_img" className="shoe_img" />
          <p className="shoe_name">{product.name}</p>
          <p className="shoe_price">Price: {product.amount}</p>
          <button onClick={handlePay} className="buyBtn">Buy Shoes</button>
        </div>
      </div>
    </div>
  )
}

export default Payment