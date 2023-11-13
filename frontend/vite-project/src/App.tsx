import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fechProducts = async () => {
    const { data } = await axios.get("http://localhost:8080/products");
    // console.log(data.payload);
    setProducts(data.payload);
  };
  const createProduct = async (newProduct: any) => {
    await axios.post("http://localhost:8080/products", newProduct);
    fechProducts();
  };

  const updateProduct = async () => {
    if (selectedProduct) {
      await axios.put(`http://localhost:8080/products/${selectedProduct.id}`, newProduct);
      fechProducts();
      setSelectedProduct(null); // Reset selected product after update
    }
  };

  useEffect(() => {
    fechProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    fechProducts();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setNewProduct({
    //   ...newProduct,
    //   [event.target.name]: event.target.value,
    // });

    setNewProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  // const handleFormSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   CerateProducts(newProduct);
  //   setNewProduct({
  //     name: "",
  //     price: 0,
  //   });
  // };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
    });
  };
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (selectedProduct) {
      // If a product is selected, update it
      updateProduct();
    } else {
      // If no product is selected, create a new one
      createProduct(newProduct);
    }

    // Reset form fields
    setNewProduct({
      name: "",
      price: 0,
    });
  };

  return (
    <>
      <form action="" onSubmit={handleFormSubmit}>
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
        <button type="submit">{selectedProduct ? "Update Product" : "Add Product"}</button>
      </form>
      <section className="products">
        {products.length > 0 &&
          products.map((product) => (
            <article key={product.id}>
              <h2>{product.name}</h2>
              <h2>{product.price}</h2>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => handleUpdate(product)}>Update</button>
            </article>
          ))}
      </section>
    </>
  );
};

export default App;