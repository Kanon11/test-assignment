import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import  ComponentTable  from '../components/ComponentTable';
// import 'antd/dist/antd.css';.s
import '../css/list.css';
import { LOAD_PRODUCTS } from "../graphQL/Queries";
export default function List() {
    const [data, setData] = useState([]);
    const { data: inventoryData, error, loading } = useQuery(LOAD_PRODUCTS);
    useEffect(() => {
        if (inventoryData && inventoryData.products) {
            const arrivedData = inventoryData.products.map((item) => ({
                ...item,
                key: item.id
            }));
            setData(arrivedData);
        }
            if (error && loading === false) {
              console.log("I think we have an error");
            }
    }, [inventoryData, error, loading]);
    
    return (
        <div style={style.body}>
        <ComponentTable data={data } />
        </div>
    )
}

const style = {
  body: {
    background: "white",
    height: "105%",
    width: "100%",
    paddingTop: "10px",
    display: "flex",
    borderRadius: "25px",
    flowFlow: "column nowrap",
    flexDirection: "column",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  },
  firstDiv: {},
  table: {
    width: "100%",
  },
  nav: {
    height: "8%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: "10px",
    justifyContent: "space-between",
    paddingRight: "20px",
  },
};