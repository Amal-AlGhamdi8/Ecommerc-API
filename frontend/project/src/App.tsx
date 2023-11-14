import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";


interface Product {
  id: number;
  name: string;
  price: number;
}

const url = "http://localhost:8080";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fechProducts = async () => {
    const { data } = await axios.get(`${url}/products`);
    setProducts(data.payload);
  };
  const createProduct = async (newProduct: any) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        newProduct
      );
      toast.success(response.data.message);
      fechProducts();
    } catch (error : any) {
      toast.error(error.response.data.message);
    }
  };

  const updateProduct = async () => {
    if (selectedProduct) {
      await axios.put(
        `${url}/products/${selectedProduct.id}`,
        newProduct
      );
      fechProducts();
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    fechProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`${url}/products/${id}`);
    fechProducts();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
    // setNewProduct({
    //   ...newProduct,
    //   [event.target.name]: event.target.value,
    // });

  };

  // const handleFormSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   CerateProducts(newProduct);
  //   setNewProduct({
  //     name: "",
  //     price: 0,
  //   });
  // };

  const handleUpdate = (product: any) => {
    setSelectedProduct(product);
   setNewProduct({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (selectedProduct) {
      updateProduct();
    } else {
      createProduct(newProduct);
    }

    setNewProduct({
      id: 0,
    name: "",
    price: 0,
    });
  };

  return (
    <>
      <form action="" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <label>Product Name:</label>
        <input
          type="text"
          placeholder="product name .."
          value={newProduct.name}
          name="name"
          onChange={handleInputChange}
        />
        <label>Product Price:</label>
        <input
          type="number"
          placeholder="product price .."
          value={newProduct.price}
          name="price"
          onChange={handleInputChange}
        />
        <button type="submit">
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
      <section className="products">
        {products.length > 0 &&
          products.map((product) => (
            <article key={product.id}>
              <h2>{product.name}</h2>
              <h2>{product.price} $</h2>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => handleUpdate(product)}>Update</button>
            </article>
          ))}
      </section>
    </>
  
  );
};

export default App;
