import React from "react";
import "./recs.css";
import { useEffect, useState } from "react";
import axios from "axios";

const RecsItem = () => {
  const [imgLink, setImgLink] = useState("");
  const [productName, setProductName] = useState("");
  const [productSeller, setProductSeller] = useState("");
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [operatingSystem, setOperatingSystem] = useState("");
  const [price, setPrice] = useState(0);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isLimitedTimeDeal, setIsLimitedTimeDeal] = useState(false);
  const [isPrimeDelivery, setIsPrimeDelivery] = useState(false);
  const [limitedTimeEnd, setLimitedTimeEnd] = useState("");
  const [isOffer, setIsOffer] = useState(0);
  const [isClimateFriendly, setIsClimateFriendly] = useState(false);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    axios
      .get("https://fec-amazon-back-end.onrender.com/recs")
      .then((res) => {
        //console.log(res.data)
        setItemData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="items">
      {itemData.map((item) => {
        return (
          <div className="main-area" >
            <div className="product-img" >
              <img className="product-img" src={item.product_img} ></img>
            </div>
            <div className="product-name" >
              {item.product_name.length > 55
                ? item.product_name.substring(0, 55) + "..."
                : item.product_name}
            </div>
            <div className="product-seller" >{item.product_seller}</div>
            <div className="reviews" >
              <div className="review-stars" >
                <img src="./recs-imgs/Screenshot 2022-12-15 at 3.06.16 PM.png" ></img>
              </div>
              <div className="num-reviews" >{item.num_reviews}</div>
            </div>
            <div className="operating-system" >{item.operating_system}</div>
            <div className="price" >
              <span className="dollar" >$</span>
              <span className="amount" >{item.price}</span>
            </div>
            <div className="is-prime-delivery" >{item.is_prime_delivery == true ? 'Prime FREE Delivery': '5-10 Days Delivery'}</div>
          </div>
        );
      })}
    </div>
  );
};



export default RecsItem;
