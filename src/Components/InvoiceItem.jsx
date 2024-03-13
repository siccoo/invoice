/* eslint-disable react/prop-types */
import { Table } from "react-bootstrap";
import EditableItem from "./EditableField";
import { BiTrash } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";

export default function InvoiceItem(props) {
  var itemTable = props.items.map((item) => (
    <ItemRow
      onItemizedItemEdit={props.onItemizedItemEdit}
      item={item}
      onRowDelete={props.onRowDel}
      key={item.id}
      currency={props.currency}
    />
  ));
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            {/* <th>Additional Qty</th>
            <th>Total Qty</th>
            <th>Paying for Qty</th> */}
            <th>Price</th>
            {/* <th>Amount Due</th>
            <th>Qty Returned</th>
            <th>Qty Still Due</th>
            <th>Retail Price</th>
            <th>Profit Each</th>
            <th>Profit Total</th> */}
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      {/* <Button className="fw-bold" onClick={props.onRowAdd}>
        Add Item
      </Button> */}
      <div>
        <FiPlusCircle
          className="fw-bold btn"
          onClick={props.onRowAdd}
          style={{ cursor: "pointer", fontSize: 45, color: "red" }}
        />
      </div>
    </div>
  );
}

function ItemRow(props) {
  const onRowDelete = () => {
    props.onRowDelete(props.item);
  };
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableItem
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: props.item.name,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableItem
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "Quantity",
            min: 1,
            step: "1",
            value: props.item.quantity,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "100px" }}>
        <EditableItem
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "Price",
            min: 1,
            step: "0.01",
            textAlign: "text-end",
            value: props.item.price,
            id: props.item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: 50 }}>
        <BiTrash
          onClick={onRowDelete}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
}
