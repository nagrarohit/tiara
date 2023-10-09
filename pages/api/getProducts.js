import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let rings = {};
  for (let item of products) {
    if (item.title in rings) {
      if (
        !rings[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        rings[item.title].color.push(item.color);
      }
      if (
        !rings[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        rings[item.title].size.push(item.size);
      }
    } else {
      rings[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        rings[item.title].color = [item.color];
        rings[item.title].size = [item.size];
      }
    }
  }
  res.status(200).json({ rings });
};
export default connectDb(handler);
