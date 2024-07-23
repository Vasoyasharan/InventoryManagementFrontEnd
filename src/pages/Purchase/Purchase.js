import React, { useEffect, useMemo, useState } from "react";
import { Url, config } from "../../Url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const PurchaseBill = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const URL = Url + "purchase";

  const [values, setValues] = useState({
    vendorID: "",
    billNo: "",
    date: "",
    productID: "",
    qty: 0,
    price: 0,
    amount: 0,
  });

  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleInput = (event, value) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(Url + "vendor", config);
      setVendors(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(Url + "product", config);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (event, values) => {
    event.preventDefault();
    try {
      await axios.post(URL + "/create", values, config);
      navigate("/purchase");
      toast.success("Purchase Bill Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!params.id) return;
    try {
      await axios.put(`${URL}/update/${params.id}`, values, config);
      navigate("/purchase");
      toast.success("Purchase Bill Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      if (params.id) {
        const response = await axios.get(`${URL}/${params.id}`, config);
        const { vendor, product, date, ...rest } = response.data.data;
        const formattedDate = new Date(response.data.data.date).toISOString().split("T")[0];
        setValues({
          vendorID: vendor.vendorID,
          productID: product.productID,
          date: formattedDate,
          ...rest,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVendors();
    fetchProducts();
  }, [params.id]);

  const handleCancel = () => {
    navigate("/purchase");
  };

  let name = "";
  if (params.type === "add") {
    name = "ADD";
  } else {
    name = "UPDATE";
  }

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
          <h3 className="m-0">{name} PURCHASE BILL</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e, values)}>
          <div className="row mt-3">
            <div className="col-md-6 mb-6">
              <div className="form-group">
                <label htmlFor="vendorName" className="required-star">
                  Vendor<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <select
                  className="form-select"
                  id="vendorID"
                  name="vendorID"
                  onChange={(e) => handleInput(e, e.target.value)}
                  value={values.vendorID}
                >
                  <option disabled value="">
                    Select Vendor
                  </option>
                  {vendors &&
                    vendors.map((item) => (
                      <option value={item.vendorID} key={item.vendorID}>
                        {item.vendorName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-6">
              <div className="form-group">
                <label htmlFor="billNo">
                  Bill No.<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="billNo"
                  placeholder="Enter Bill No."
                  name="billNo"
                  onChange={(e) => handleInput(e, e.target.value)}
                  value={values.billNo}
                />
              </div>
            </div>
            <div className="col-md-6 mb-6">
              <div className="form-group">
                <label htmlFor="date">
                  Date<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  placeholder="Enter Bill Date"
                  name="date"
                  onChange={(e) => handleInput(e, new Date(e.target.value).toISOString())}
                  value={dayjs(values.date).format("YYYY-MM-DD")}
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="productName" className="required-star">
                  Product<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <select
                  className="form-select"
                  id="productID"
                  name="productID"
                  onChange={(e) => handleInput(e, e.target.value)}
                  value={values.productID}
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products &&
                    products.map((item) => (
                      <option value={item.productID} key={item.productID}>
                        {item.productName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="qty">
                  Qty.<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="qty"
                  placeholder="Enter Quantity"
                  name="qty"
                  onChange={(e) => handleInput(e, Number(e.target.value))}
                  value={values.qty || ""}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="price">
                  Price<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="Enter Price"
                  name="price"
                  onChange={(e) => handleInput(e, Number(e.target.value))}
                  value={values.price || ""}
                />
              </div>
            </div>
            {/* <div className="col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="amount">
                  Total Amount<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  pattern="[0-9]*"
                  placeholder="Enter Price"
                  name="amount"
                  onChange={(e) => handleInput(e, Number(e.target.value))}
                  value={values.amount}
                />
              </div>
            </div> */}
          </div>
          <div className="mt-3">
            {!params.id ? (
              <button className="btn btn-outline-primary me-3 fw-bold" type="submit">
                Save
              </button>
            ) : (
              <button className="btn btn-outline-primary me-3 fw-bold" type="submit" onClick={handleUpdate}>
                Update
              </button>
            )}
            <button className="btn btn-outline-danger fw-bold" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default PurchaseBill;
