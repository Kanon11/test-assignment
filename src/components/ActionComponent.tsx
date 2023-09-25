import { PlusCircleFilled, PayCircleOutlined } from "@ant-design/icons";
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
}: any) {
  return (
    <div style={style.nav}>
      <Button
        type="default"
        style={{ color: "#006666", fontWeight: "bold" }}
        onClick={onDelete}
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
