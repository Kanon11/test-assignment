import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_PRODUCTS } from "../graphQL/Queries";

function ProductList() {
  const { data, loading, error } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);
  return (
    <div>
      {products.map((item) => {
        return <h1>{item["name"]}</h1>;
      })}
    </div>
  );
}

export default ProductList;
