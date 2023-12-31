import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Component } from "react";
interface TableComponentProps {
  data: Array<any>;
  setters: (selectedRowKeys: any, selectedRows: any) => void; // Define the setters prop
}

interface TableComponentState {
  searchText: string;
  searchedColumn: string;
}
class TableComponent extends Component<TableComponentProps,TableComponentState> {
  state = {
    searchText: "",
    searchedColumn: "",
  };
  searchInput: typeof Input | null = null;
  getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node: any) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => (this.searchInput as any).select());
      }
    },
    render: (text: any) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.props.setters(selectedRowKeys, selectedRowKeys);
    },
  };
  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: "10%",
        sorter: (a: any, b: any) => a.id - b.id, // Enable sorting for this column
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "40%",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: "20%",
        sorter: (a: any, b: any) => a.price - b.price,
        ...this.getColumnSearchProps("price"),
      },
      {
        title: "Stock",
        dataIndex: "stock",
        key: "stock",
        width: "20%",
        sorter: (a: any, b: any) => a.stock - b.stock,
        ...this.getColumnSearchProps("stock"),
      },
    ];
    return (
      <Table
        size={"large"}
        style={{ width: "100%" }}
        columns={columns}
        dataSource={this.props.data}
        pagination={{
          pageSize: 5,
          total: this.props.data.length,
        }}
        rowSelection={{
          type: "checkbox",
          ...this.rowSelection,
        }}
      />
    );
  }
}
export default TableComponent;
