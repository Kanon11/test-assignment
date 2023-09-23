import React from "react";
import { Form, Input, Button } from "antd";

// Checkbox

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function ComponentForm({ onOk }: any) {
    const [form] = Form.useForm();
    
  const handleReset = () => {
    form.resetFields();
  };
  const onFinish = (values: any) => {
    onOk(values);
    handleReset();
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
        rules={[{ required: true, message: "Please input Product Price!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Stock" name="stock">
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
