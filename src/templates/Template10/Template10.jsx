import React from "react";
import "./Template10.css";

const TemplateExact = ({ data = {} }) => {
  const items = data.items || [];
  const currency = data.currencySymbol || "₹";

  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const tax = (subtotal * (Number(data.tax) || 0)) / 100;
  const total = subtotal + tax;

  return (
    <div className="invoice-a4">

      {/* HEADER */}
      <div className="header">
        <div className="logo-block">
          <div className="logo-box">{data?.companyName?.charAt(0) || 'L'}</div>
          <div className="invoice-text">INVOICE</div>
        </div>

        <div className="meta">
          <div>Invoice Number: {data.invoiceNumber}</div>
          <div>Invoice Date: {data.invoiceDate}</div>
          <div>Due Date: {data.dueDate}</div>
        </div>
      </div>

      {/* STRIP */}
      <div className="invoice-strip"></div>

      {/* BILL TO */}
      <div className="bill-row">
        <div className="bill-box">
          <strong>Bill To</strong>
          <div>{data.billingName}</div>
          <div>{data.billingAddress}</div>
          <div>{data.billingPhone}</div>
        </div>

        <div className="bill-box">
          <strong>From</strong>
          <div>{data.companyName}</div>
          <div>{data.companyAddress}</div>
          <div>{data.companyEmail}</div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th className="center">Qty</th>
              <th className="right">Rate</th>
              <th className="center">Tax</th>
              <th className="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td className="center">{item.qty}</td>
                <td className="right">{currency}{item.rate}</td>
                <td className="center">{data.tax || 0}%</td>
                <td className="right">{currency}{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTALS */}
      <div className="totals-wrapper">
        <div className="totals-box">
          <div className="totals-row">
            <span>Subtotal</span>
            <span>{currency}{subtotal.toFixed(2)}</span>
          </div>
          <div className="totals-row">
            <span>Tax</span>
            <span>{currency}{tax.toFixed(2)}</span>
          </div>
          <div className="totals-row">
            <span>Total</span>
            <span>{currency}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="footer-box">
          <div className="footer-title">{data.companyName}</div>
          <div>{data.companyAddress}</div>
          <div>{data.companyPhone}</div>
          <div>{data.companyEmail}</div>
        </div>

        <div className="footer-box">
          <div className="footer-title">Notes & Payment Instructions</div>
          <div>Payment due within 30 days.</div>
          <div>Please include invoice number in reference.</div>
        </div>
      </div>

    </div>
  );
};

export default TemplateExact;
