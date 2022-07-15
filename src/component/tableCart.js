import { Button, Table } from "antd";
import React, { useState, useEffect } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import './main.scss'
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const TableCart = (product, setProduct) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
   const [getval, setGetval] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length / 0 > 0;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "product",
      dataIndex: "product",
    },
    {
      title: "supplier",
      dataIndex: "supplier",
    },
  ];
  useEffect(() => {
    if (product.product && product.product) {
      setFilteredResults(product.product);
    }
  }, [product]);
   function filt(params) {
    setGetval(params);
    if (getval.length > 1) {
      const filteredData = filteredResults.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(getval.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(product.product);
    }
  }

  return (
    <>
      <div className="search_input">
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onChange={(e) => filt(e.target.value)}
        />
      </div>
      <div className="tablecart">
        <div className="tablecart_inner"
          style={{
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredResults}
        />
      </div>
    </>
  );
};

export default TableCart;
