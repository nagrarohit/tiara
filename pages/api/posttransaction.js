import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
const handler = async (req, res) => {
  let order;
  //pending work
  //validate paytm checksum
  //update status into orders table after checking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "paid", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.status == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "pending", paymentInfo: JSON.stringify(req.body) }
    );
  }
  //Initiate shipping
  //Redirect user to the order confirmation page
  res.redirect("/order?id=" + order._id, 200);
};
export default connectDb(handler);
