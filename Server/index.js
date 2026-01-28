import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "./controller/product.controller.js";

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/product", createProduct)
app.get("/product", fetchProducts)
app.put("/product/:id", updateProduct)
app.delete("/product/:id", deleteProduct)


const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

startServer();
