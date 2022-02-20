import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userUrl } from "../requestMethod";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userUrl.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:'url("https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2016/12/06112206/friends-shopping.jpg")',
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
      }}
    >
      {orderId
        ? <h2> Order has been created successfully. Your order number is ${orderId} </h2>
        : <h2 style={{color:"black",textAlign:"center",textDecoration:"underline"}}>Successfull. Your order is being prepared... </h2>}
      <button onClick={()=>window.location.replace('/')} style={{
         padding: 10, 
         marginTop: 20,
         background:"black",
         color:"gold",
         border:"2px solid gold"}}>Go to Homepage</button>
    </div>
  );
};


export default Success;