import fs from "fs/promises";
import { errorResponse, successResponse } from "./responseController.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    successResponse(200, res, "Retuernd all products", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProductData = req.body;

    const newProduct = {
      id: new Date().getTime().toString(),
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
    };
    const exisitingProducts = JSON.parse(
      await fs.readFile("products.json", "utf8")
    );
    exisitingProducts.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(exisitingProducts));

    successResponse(201, res, "Product is created");
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));

    const product = products.find((product) => product.id === id);

    if (!product) {
      errorResponse(404, res, `Product not found with the id ${id}`);
      return;
    }

    successResponse(200, res, "Returned a product", product);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let products = JSON.parse(await fs.readFile("products.json", "utf-8"));

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      errorResponse(404, res, `Product not found with the id ${id}`);
      return;
    }

    products.splice(productIndex, 1);

    await fs.writeFile("products.json", JSON.stringify(products));

    successResponse(204, res, "Product was deleted", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const newProductData = req.body;

    let products = JSON.parse(await fs.readFile("products.json", "utf-8"));

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      errorResponse(404, res, `Product not found with the id ${id}`);
      return;
    }

    products[productIndex] = {
      ...products[productIndex],
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
    };

    await fs.writeFile("products.json", JSON.stringify(products));

    successResponse(200, res, "Returned all products", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};
