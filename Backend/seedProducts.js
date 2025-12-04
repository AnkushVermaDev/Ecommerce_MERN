import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import productsData from "./productsData.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB Connected");
    
    await Product.deleteMany();  // Clear old data
    await Product.insertMany(productsData);

    console.log("Products Inserted Successfully");
    process.exit();
  })
  .catch((err) => console.log(err));
