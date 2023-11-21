const https = require("https");
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const PaytmChecksum = require("paytmchecksum");
const handler = async (req, res) => {
  if (req.method == "POST") {
    //Check if the cart is tampered with (--DONE)
    let product,
      cart = req.body.cart,
      sumTotal = 0;
    for (let item in cart) {
      console.log(item);
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      // check if the cart items are out of stock (--DONE)
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some Items in your cart are out of stock",
        });
      }

      if (product.price != cart[item].price) {
        res.status(200).json({
          success: false,
          error: "Price Mismatch. Please try again !",
        });
        return;
      }
    }
    if (sumTotal !== req.body.subtotal) {
      res
        .status(200)
        .json({ success: false, error: "Price Mismatch. Please try again !" });
      return;
    }

    // check if the user details are valid  (--pending)

    //Initiate an order corresponding to this order id
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      address: req.body.address,
      amount: req.body.subtotal,
      products: req.body.cart,
    });
    await order.save();
    //Insert an entry in the orders table with status as (--pending)

    var paytmParams = {};
    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subtotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in"
          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            // console.log("Response: ", response);
            let ress = JSON.parse(response).body;
            ress.success = true;
            resolve(ress);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };

    let myr = await requestAsync();
    res.status(200).json(myr);
  }
};
export default connectDb(handler);
