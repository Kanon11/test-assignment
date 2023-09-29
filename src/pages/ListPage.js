import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { message, Form } from "antd";
import TableComponent from '../components/TableComponent';
import ActionComponent from "../components/ActionComponent";
import 'antd/dist/reset.css';
import '../css/list.css';
import { LOAD_PRODUCTS } from "../graphQL/Queries";
import { CREATE_PRODUCT_MUTATION, DELETE_PRODUCT_MUTATION } from "../graphQL/Mutations";
export default function ListPage() {

  // required state for this component
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toDel, setToDel] = useState([]);
  let totalValue = 0;

  // usable const variable from antd
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // Inventory list data gathered from GraphQL
  const { data: inventoryData, error, loading } = useQuery(LOAD_PRODUCTS);
  useEffect(() => {
    if (inventoryData && inventoryData.products) {
      const arrivedData = inventoryData.products.map((item) => {
        return {
          ...item,
          key: item.id,
        }
      });
      setData(arrivedData);
    }
    if (error && loading === false) {
      console.log("I think we have an error");
    }
  }, [inventoryData, error, loading]);

// calculation of totalValue from arrived data from db
  totalValue = data.reduce((totalValue, item) => {
    return totalValue + item.stock * item.price;
  }, 0).toFixed(4);


  // Action for Inventory Creation
  const [insert_products] = useMutation(CREATE_PRODUCT_MUTATION);
  const createItem = async (obj) => {
    try {
      const { data } = await insert_products(obj);
      const returning = data.insert_products.returning;



      // adding item to data state, after successful data insertion
      setData((state) => {
        return [{ ...returning[0], key: returning[0]['id'] }, ...state];

      });
      // incrementing  totalValue when delete an item from inventory list
      totalValue += ((returning[0].price) * (returning[0].stock))
      Message('success', 'Creation Success');
    } catch (error) {
      // Handle GraphQL mutation error
      Message('error', error);

    }
  }

  // Action for Inventory Deletion
  const [delete_product] = useMutation(DELETE_PRODUCT_MUTATION);
  const deleteItem = async (obj) => {
    try {
      const { data } = await delete_product(obj);
      // reducing totalValue when delete an item from inventory list
      totalValue -= ((data.delete_products.returning[0].price) * (data.delete_products.returning[0].stock))


      // removing item form data state, after successful data deletion
      setData((state) => {
        return state.filter((item) => item.key !== data.delete_products.returning[0]['id']);
      });
    } catch (error) {
      // Handle GraphQL mutation error
      Message('error', error);
    }
  }

  const setters = (key, data) => {
    setToDel(data);
  };
  const openModal = () => {
    return setIsOpen(true);
  };

  const onOk = ({ name, description, price, stock }) => {

    stock = stock ?? 0;
    console.log({ name, description, price, stock })
    const exists = data.some((object) => object.name === name);
    if (exists) {
      Message('error', 'name should be unique!!!');
    }
    else {
      createItem({ variables: { name, description, price, stock } });
      setIsOpen(false);
      handleReset();
    }
  };

  const onDelete = () => {
    let flag = false;
    toDel.forEach((del) => {
      deleteItem({ variables: { id: del } });
      flag = true;
    });
    setToDel([]);
    if (flag) {
      Message('success', 'Deletion Success');

    }
  };

  const onCancel = () => {
    setIsOpen(false);
    handleReset();
  };
  const handleReset = () => {
    form.resetFields();
  };
  const Message = (type, message) => {
    messageApi.open({
      type: `${type}`,
      content: `${message}`,
    });
  };

  return (
    <div style={style.body}>
      {contextHolder}

      <ActionComponent
        onOk={onOk}
        onCancel={onCancel}
        isOpen={isOpen}
        openModal={openModal}
        onDelete={onDelete}
        form={form}
        totalValue={totalValue}
        toDel={toDel}
        Message={Message}
      />
      <TableComponent data={data} setters={setters} />
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