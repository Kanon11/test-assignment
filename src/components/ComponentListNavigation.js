import React from "react";
import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Modal } from "antd";
import ComponentInput from './ComponentInput';
import ComponentForm from "./ComponentForm";
import Sidebar from "../pages/Sidebar";

export default function ComponentListNavigation({
  isOpen,
  onOk,
  onCancel,
  openModal,
  save,
  onDelete,
}) {
  return (
    <div style={style.nav}>
      <ComponentInput color={'white'} />
      <Button
        type="primary"
        style={{
          margin: '10px',
        }}
        onClick={openModal}
      >
        <PlusCircleFilled />
        Add Item
      </Button>
      <Sidebar save={save} onDelete={onDelete} />
      <Modal
        visible={isOpen}
        title="Add Inventory"
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Back
          </Button>,
        ]}
      >
        <ComponentForm onOk={onOk} />
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
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingBottom: '10px',
    justifyContent: 'space-between',
    paddingRight: '20px',
  },
};