// For connecting local database of mongodb -->

//---------------------------------------------------------
// import mongoose from "mongoose";
// const connectDb = (handler) => async (req, res) => {
//   if (mongoose.connections[0].readyState) {
//     return handler(req, res);
//   }
//   await mongoose.connect(process.env.MONGO_URI);
//   return handler(req, res);
// };
// export default connectDb;
//----------------------------------------------------------

// For connecting cloud database of mongodb i.e. MonogoDB Atlas -->
//------------------------------------------------------------------
import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  const atlasUri = process.env.MONGO_URI; // Set your MongoDB Atlas connection string in the environment variable

  try {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    await mongoose.connect(atlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas!");
    return handler(req, res);
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    // Handle connection error, e.g., send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb;
//------------------------------------------------------------------
