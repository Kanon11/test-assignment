import React from "react";
import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Modal } from "antd";
import ComponentForm from "./ComponentForm";

export default function ComponentListNavigation({
  isOpen,
  onOk,
  onCancel,
  openModal,
  onDelete,
  form
}:any) {
  return (
    <div style={style.nav}>
    <Button type="primary" onClick={onDelete}>Delete</Button>
      <Button
        type="primary"
        style={{
          marginLeft: "10px",
          marginRight: "10px",
        }}
        onClick={openModal}
      >
        <PlusCircleFilled />
        Add Item
      </Button>
      <Modal
        open={isOpen}
        title="Add Inventory"
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Back
          </Button>,
        ]}
      >
        <ComponentForm onOk={onOk}form={form} />
      </Modal>
    </div>
  );
}
const style = {
  body: {
    background: 'white',
    height: '105%',
    width: '100%',
    paddingTop: '10px',
    display: 'flex',
    borderRadius: '25px',
    flowFlow: 'column nowrap',
    flexDirection: 'column',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  },
  firstDiv: {},
  table: {
    width: '100%',
  },
  nav: {
    height: '8%',
    width: '100%',
    display: 'flex',
     flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    paddingBottom: '10px',
    
    paddingRight: '20px',
  },
} as const;