import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_MUTATION } from "../graphQL/Mutations"; // Import your mutation here

function CreateProduct() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const { data } = await createProduct({
          variables: {
              name: input.name,
              description: input.description,
              price: input.price,
              stock:input.stock
          },
      });
      console.log("Product created:", data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={input.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={input.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={input.stock}
          onChange={handleInputChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;
