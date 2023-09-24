import { useState } from "react";
import {  Input, Button, InputNumber,Form } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function ComponentForm({ onOk, form }: any) {
  
  const [floatValue, setFloatValue] = useState(null);

  const handleFloatChange = (value:any) => {
    setFloatValue(value);
  };
  const onFinish = (values: any) => {
    onOk(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="inventoryInsertForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name of Product!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: "Please input Product Price in Number!" },
        ]}
      >
        <InputNumber
          style={{ width: 180 }}
          step={0.1} // Set the step value to allow floating-point numbers
          value={floatValue}
          onChange={handleFloatChange}
          formatter={(value) => `${value}`.replace(/[^0-9.]/g, "")} // Format the input
          parser={(value) => (value === "." ? "" : value)} // Remove invalid characters
        />
      </Form.Item>
      <Form.Item
        label="Stock"
        name="stock"
      >
        <InputNumber
          style={{ width: 180 }}
          step={1} // Set the step value to allow floating-point numbers
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
