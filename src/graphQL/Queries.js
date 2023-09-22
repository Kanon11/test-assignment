import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
{
  products(order_by: {id: desc}) {
    id
    description
    name
    price
    stock
  }
}

`;

