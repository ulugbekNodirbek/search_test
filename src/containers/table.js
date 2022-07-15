import "./main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import TableCart from "../component";

const Table = ({token}) => {

  const [proArr, setProArr] = useState([])

  const [product, setProduct] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  useEffect(() => {
    axios
      .get(`https://toko.ox-sys.com/variations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "applicaiton/json",
          Accept: "application/json",
        },
      })

      .then(function (response) {
         setProArr(response.data.items)
        setProduct({
          isFetched: true,
          data: response.data.items,
          errro: false,
        });
      })
     
      .catch(function (error) {
        setProduct({
          isFetched: true,
          data: [],
          error: error,
        });
      });
  }, []);
  return (
    <div className="table container">
      <div className="table_block">
        <TableCart 
            product={proArr}
            setProduct={setProArr}
        />
      </div>
    </div>
  );
};

export default Table;
