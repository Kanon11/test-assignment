import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
mutation InsertProducts($name: String!, $description: String, $price: numeric!, $stock: Int) {
  insert_products(objects: {name: $name, description: $description, price: $price, stock: $stock}) {
    affected_rows
    returning {
      id
      name
      description
      price
      stock
    }
  }
}

`;

export const DELETE_PRODUCT_MUTATION = gql`
mutation deleteProduct($id: Int) {
  delete_products(where: {id: {_eq: $id}}) {
    returning {
      id,
      name,
      description,
      price,
      stock
    }
  }
}
`;