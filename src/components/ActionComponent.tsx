import { useState } from "react";
import {
  PlusCircleFilled,
  PayCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import FormComponent from "./FormComponent";

export default function ActionComponent({
  isOpen,
  onOk,
  onCancel,
  openModal,
  onDelete,
  form,
  totalValue,
  toDel,
  Message,
}: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle the "Confirm" button click
  const handleConfirm = () => {
    // Perform delete on confirmation
    onDelete();
    setIsModalVisible(false); // Close the modal
  };

  // Function to handle the "Cancel" button click
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  // Function to open the confirmation modal
  const showConfirmationModal = () => {

    // if no data selected yet then no need to show confirmation modal, i am just showing a warning message
    console.log(toDel);
    if (toDel.length > 0) {
      setIsModalVisible(true);
    }
    else {
      Message('warning', 'Please select a row first.');
    }
  };

  return (
    <div style={style.nav}>
      <Button
        type="default"
        style={{ color: "#006666", fontWeight: "bold" }}
        onClick={showConfirmationModal}
      >
        Delete
      </Button>
      <Button
        type="default"
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          color: "#006666",
          fontWeight: "bold",
        }}
        onClick={openModal}
      >
        <PlusCircleFilled />
        Add Item
      </Button>
      <h3 style={style.totalValue}>
        <PayCircleOutlined style={{ marginRight: "5px" }} />
        Total Value: {totalValue}
        <span> </span>
      </h3>
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
        <FormComponent onOk={onOk} form={form} />
      </Modal>

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined
              style={{ color: "orange", marginRight: "8px" }}
            />
            Confirmation
          </span>
        }
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete selected row?</p>
        {/* Add any additional content or message here */}
      </Modal>
    </div>
  );
}
const style = {
  nav: {
    height: "8%",
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "nowrap",
    paddingBottom: "10px",
    paddingRight: "20px",
  },
  totalValue: { marginTop: "4px", color: "#006666", marginRight: "20px" },
} as const;
