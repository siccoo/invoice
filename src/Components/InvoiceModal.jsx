/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { Modal, Row, Col, Table, Button } from "react-bootstrap";

export default function InvoiceModal(props) {
  const generateInvoice = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [210, 297],
        // orientation: "portrait",
        // unit: "pt",
        // format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };
  return (
    <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
      <div id="invoiceCapture" className="bg-light">
        <h4 className="text-center bg-light pt-2">Consignment Order Form</h4>
        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
          <div className="w-100">
            <h4 className="fw-bold my-2">{props.info.billFrom}</h4>
            <h6 className="fw-bold text-secondary mb-1">
              Invoice #: {props.info.invoiceNumber}
            </h6>
          </div>
          <div className="text-end ms-4">
            <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;</h6>
            <h5 className="fw-bold text-secondary">
              {props.info.currency} {props.total}
            </h5>
          </div>
        </div>

        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed To:</div>
              <div>{props.info.billTo || ""}</div>
              <div>{props.info.billToAddress || ""}</div>
              <div>{props.info.billToEmail || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Billed From:</div>
              <div>{props.info.billFrom || ""}</div>
              <div>{props.info.billFromAddress || ""}</div>
              <div>{props.info.billFromEmail || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Date Issued:</div>
              <div>{new Date().toLocaleString()}</div>
            </Col>
          </Row>
          <Table className="mb-0">
            <thead>
              <tr>
                <th>Consigned Goods</th>
                <th>Qty</th>
                <th className="text-end">Price</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.items.map((item, i) => {
                return (
                  <tr id={i} key={i}>
                    <td>{item.name} </td>
                    <td style={{ width: "70px" }}>{item.quantity}</td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.currency} {item.price}
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.currency} {item.price * item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table className="mb-4">
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  Subtotal
                </td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  {props.info.currency} {props.info.subTotal}{" "}
                </td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  Tax
                </td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  {props.info.currency} {props.info.taxAmount}{" "}
                </td>
              </tr>

              {props.discountAmount !== 0.0 && (
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    Discount
                  </td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    {props.info.currency} {props.info.discountAmount}{" "}
                  </td>
                </tr>
              )}
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  Total
                </td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  {props.info.currency} {props.info.total}{" "}
                </td>
              </tr>
            </tbody>
          </Table>
          {props.info.notes && (
            <div className="bg-light py-3 rounded">{props.info.notes}</div>
          )}
        </div>
      </div>
      <div className="pb-4 px-4">
        <Button
          variant="primary"
          className="d-block w-100 mt-3 mt-md-0"
          onClick={generateInvoice}
        >
          Download
        </Button>
      </div>
    </Modal>
  );
}
