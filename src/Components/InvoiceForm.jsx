/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Form, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";

const distributorOptions = [
  "Nicholas Barnaby",
  "Distributor 2",
  "Distributor 3",
];
const corporationSupplierOptions = [
  "Corporation 1",
  "Corporation 2",
  "Supplier 1",
];

const InvoiceForm = () => {
  const [state, setState] = useState({
    isOpen: false,
    currency: "$",
    currentDate: "",
    invoiceNumber: 1,
    billTo: "",
    billToAddress: "",
    billToEmail: "",
    billFrom: "Nicholas Barnaby",
    billFromAddress: "Jamaica",
    billFromEmail: "nicholasbarnaby@hotmail.com",
    notes: "",
    subTotal: "0.00",
    taxRate: 0,
    taxAmount: "0.00",
    discountRate: 0,
    discountAmount: "0.00",
  });

  const [total, setTotal] = useState(0.0);

  const [items, setItems] = useState([
    {
      id: 0,
      consignedGoods: "",
      quantity: 0,
      price: 1.0,
      // addQty: 1,
      // totalQty: 1,
      // payQty: 0,
      // amount: 0,
      // qtyReturned: 0,
      // qtyStillDue: 0,
      // retailPrice: 0,
      // profitEach: 0,
      // profitTotal: 0,
    },
  ]);

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onItemizedItemEdit = (e) => {
    const individualItem = {
      id: e.target.id,
      name: e.target.name,
      value: e.target.value,
    };

    var newItems = items.map((item) => {
      for (var key in item) {
        if (key === individualItem.name && item.id === individualItem.id) {
          item[key] = individualItem.value;
        }
      }
      return item;
    });

    setItems(newItems);
  };

  const onCurrencyChange = (selectedOption) => {
    setState((state) => ({ ...state, selectedOption }));
  };

  const handleAddEvent = (e) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id,
      consignedGoods: "",
      quantity: 0,
      price: 1.0,
    };
    setItems((items) => [...items, item]);
  };

  const handleRowDel = (item) => {
    if (items.length > 1) {
      setItems((items) => items.filter((data) => data.id !== item.id));
    } else {
      setItems([
        {
          id: "0",
          consignedGoods: "",
          quantity: 0,
          price: 1.0,
        },
      ]);
    }
  };

  const handleCalculateTotal = (items) => {
    var subTotal = 0;
    items.map((item) => {
      subTotal += parseFloat(item.price).toFixed(2) * parseInt(item.quantity);
    })[0];

    subTotal = parseFloat(subTotal).toFixed(2);
    console.log(subTotal);

    const discountAmount = parseFloat(
      parseFloat(subTotal) * parseFloat(state.discountRate / 100).toFixed(2)
    );
    const taxAmount = parseFloat(
      parseFloat(subTotal) * parseFloat(state.taxRate / 100).toFixed(2)
    );
    const total =
      parseFloat(subTotal) + parseFloat(taxAmount) - parseFloat(discountAmount);

    setTotal(total);

    setState((state) => ({
      ...state,
      subTotal,
      taxAmount,
      discountAmount,
    }));
  };

  useEffect(() => {
    handleCalculateTotal(items);
  }, [items, state.taxRate, state.discountRate]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setState((state) => ({ ...state, isOpen: true }));
        }}
      >
        <Row>
          <Col md={8} lg={9}>
            <Card className="d-flex p-4 p-xl-3 my-3 my-xl-4">
              <h4 className="text-center mb-4">Consignment</h4>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row mb-3">
                  <div className="mb-2">
                    <span className="fw-bold">Date&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-row mb-3">
                  <div className="mb-2">
                    <span className="fw-bold">Number&nbsp;</span>
                    <span className="current-date">{state.invoiceNumber}</span>
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              {/* <Row className="mb-5"> */}
                <Col>
                  <Form.Label className="fw-bold">
                    Independent Distributor
                  </Form.Label>
                  <Form.Select
                    value={state.billFrom}
                    onChange={(e) =>
                      setState({ ...state, billFrom: e.target.value })
                    }
                    className="my-2"
                    disabled={true}
                  >
                    {distributorOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  {/* <Form.Select
                    value={state.billFromEmail}
                    onChange={(e) =>
                      setState({ ...state, billFromEmail: e.target.value })
                    }
                    className="my-2"
                    disabled={true}
                  >
                  </Form.Select>
                  <Form.Select
                    value={state.billFromAddress}
                    onChange={(e) =>
                      setState({ ...state, billFromAddress: e.target.value })
                    }
                    className="my-2"
                    disabled={true}
                  >
                  </Form.Select> */}
                </Col>
                <Col>
                  <Form.Label className="fw-bold">
                    Corporation/Supplier
                  </Form.Label>
                  <Form.Select
                    placeholder="Select Corporation/Supplier"
                    value={state.billTo}
                    onChange={(e) =>
                      setState({ ...state, billTo: e.target.value })
                    }
                    className="my-2"
                    autoComplete="name"
                    required={true}
                  >
                    {corporationSupplierOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  {/* <Form.Select
                    placeholder="Select Email"
                    value={state.billToEmail}
                    onChange={(e) =>
                      setState({ ...state, billToEmail: e.target.value })
                    }
                    className="my-2"
                    autoComplete="email"
                  >
                  </Form.Select>
                  <Form.Select
                    placeholder="Select Address"
                    value={state.billToAddress}
                    onChange={(e) =>
                      setState({ ...state, billToAddress: e.target.value })
                    }
                    className="my-2"
                    autoComplete="address"
                  >
                  </Form.Select> */}
                </Col>
              {/* </Row> */}
              <InvoiceItem
                items={items}
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={handleAddEvent}
                onRowDel={handleRowDel}
                currency={state.currency}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {state.currency} {state.subTotal}
                    </span>
                  </div>

                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      {state.discountRate}% {state.currency}{" "}
                      {state.discountAmount}
                    </span>
                  </div>

                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      {state.taxRate}% {state.currency} {state.taxAmount}
                    </span>
                  </div>

                  <div
                    className="d-flex flex-row align-items-start justify-content-between mt-2"
                    style={{ fontSize: "1.125rem" }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span>
                      {state.currency}
                      {total}{" "}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button
                variant="primary"
                type="submit"
                className="d-block w-100 mb-3"
                onClick={(e) =>
                  setState((state) => ({ ...state, isOpen: true }))
                }
              >
                Review Invoice
              </Button>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  className="btn btn-light my-1"
                  onChange={(e) =>
                    onCurrencyChange({ currency: e.target.value })
                  }
                >
                  <option value="$">USD</option>
                  <option value="¥">CN¥</option>
                  <option value="₦">NGN</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax Rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={state.taxRate}
                    onChange={handleChange}
                    className="bg-white-border"
                    placeholder="0.00"
                    min="0.00"
                    step="0.00"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount Rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={state.discountRate}
                    onChange={handleChange}
                    className="bg-white-border"
                    placeholder="0.00"
                    min="0.00"
                    step="0.00"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <InvoiceModal
          showModal={state.isOpen}
          closeModal={(e) => setState((state) => ({ ...state, isOpen: false }))}
          info={state}
          items={items}
          total={total}
        />
      </Form>
    </>
  );
};

export default InvoiceForm;
