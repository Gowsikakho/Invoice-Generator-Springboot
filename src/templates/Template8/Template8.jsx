import React from "react";
import "./Template8.css";

const Template8 = ({ data }) => {
  const calculateSubtotal = () =>
    data?.items?.reduce((sum, item) => sum + Number(item.total || 0), 0) || 0;

  const calculateTax = () =>
    (calculateSubtotal() * Number(data?.tax || 0)) / 100;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  return (
    <div className="invoice-a4">
      {/* ================= HEADER ================= */}
      <div className="invoice-header">
        <div className="header-top">
          <div className="company-logo">abc</div>
          <h1 className="invoice-title">INVOICE</h1>
        </div>

        <div className="header-right">
          <div className="company-details">
            <div>{data?.companyName || "Company Name"}</div>
            <div>{data?.companyAddress || "Company Address"}</div>
            <div>{data?.companyPhone || "Phone"}</div>
          </div>
        </div>
      </div>

      <div className="divider-line"></div>

      {/* ================= BILL TO ================= */}
      <div className="bill-to-section">
        <div className="bill-to-left">
          <div className="section-label">Bill To</div>
        </div>

        <div className="bill-to-right">
          <div className="customer-name">
            {data?.billingName || "Customer Name"}
          </div>
          <div>{data?.billingAddress || "Customer Address"}</div>
          <div>{data?.billingPhone || "Customer Phone"}</div>
        </div>

        <div className="invoice-number-right">
          <div>Invoice Number: {data?.invoiceNumber || "INV-001"}</div>
          <div>Invoice Date: {data?.invoiceDate || "2025-12-09"}</div>
          <div>Due Date: {data?.dueDate || "2025-12-23"}</div>
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="section-header">Description of Service</div>

      <table className="items-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>HSN</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.length ? (
            data.items.map((item, index) => (
              <tr key={index}>
                <td className="center">{index + 1}</td>
                <td>{item.name}</td>
                <td className="center">9983</td>
                <td className="right">
                  ₹{Number(item.amount).toFixed(2)}
                </td>
                <td className="center">{item.qty}</td>
                <td className="center">{data?.tax || 0}%</td>
                <td className="right">
                  ₹{Number(item.total).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="center">1</td>
              <td>Sample Service</td>
              <td className="center">9983</td>
              <td className="right">₹100.00</td>
              <td className="center">1</td>
              <td className="center">18%</td>
              <td className="right">₹118.00</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= TOTALS ================= */}
      <div className="totals-section">
        <div className="totals-table">
          <div className="total-row">
            <span>Sub Total</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Tax</span>
            <span>₹{calculateTax().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Total</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Paid</span>
            <span>₹0.00</span>
          </div>
          <div className="total-row balance-due">
            <span>Balance Due</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT INFO ================= */}
      <div className="section-header">Payment Information</div>
      <div className="payment-info">
        <div>Bank Name: {data?.bankName || "Bank Name"}</div>
        <div>Account No: {data?.accountNumber || "Account Number"}</div>
        <div>IFSC: {data?.ifscCode || "IFSC Code"}</div>
        <div>Payment Mode: Online Transfer</div>
      </div>

      {/* ================= NOTES ================= */}
      <div className="section-header">Notes</div>
      <div className="notes-section">
        <div>• Payment is due within 30 days of invoice date</div>
        <div>• Late payments may incur additional charges</div>
        <div>• Please include invoice number in payment reference</div>
      </div>
    </div>
  );
};

export default Template8;
