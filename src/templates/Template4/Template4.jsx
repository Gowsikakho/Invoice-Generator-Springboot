import React from 'react';
import './Template4.css';

const Template4 = ({ data }) => {
  const calculateSubtotal = () => {
    return data?.items?.reduce((sum, item) => sum + (Number(item.total) || 0), 0) || 0;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (Number(data?.tax) || 0) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="invoice-a4">
      {/* Header */}
      <div className="invoice-header">
        <div className="company-info">
          <h1>INVOICE</h1>
          <div className="company-details">
            <strong>{data?.companyName || 'Your Company Name'}</strong>
            <div>{data?.companyAddress || '123 Business Street'}</div>
            <div>Phone: {data?.companyPhone || '(555) 123-4567'}</div>
          </div>
        </div>
        <div className="invoice-details">
          <div className="invoice-number">Invoice #{data?.invoiceNumber || 'INV-001'}</div>
          <div>Date: {data?.invoiceDate || new Date().toLocaleDateString()}</div>
          <div>Due Date: {data?.dueDate || new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Bill To & Ship To */}
      <div className="billing-shipping">
        <div className="bill-to">
          <h3>Bill To:</h3>
          <div className="client-info">
            <strong>{data?.billingName || 'Client Name'}</strong>
            <div>{data?.billingAddress || 'Client Address'}</div>
            <div>Phone: {data?.billingPhone || 'Client Phone'}</div>
          </div>
        </div>

        {data?.shippingName && (
          <div className="ship-to">
            <h3>Ship To:</h3>
            <div className="client-info">
              <strong>{data.shippingName}</strong>
              <div>{data.shippingAddress}</div>
              <div>Phone: {data.shippingPhone}</div>
            </div>
          </div>
        )}
      </div>

      {/* Items Table */}
      <table className="items-table">
        <thead>
          <tr>
            <th className="item-header">Description</th>
            <th className="qty-header">Qty</th>
            <th className="price-header">Rate</th>
            <th className="amount-header">Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((item, index) => (
            <tr key={index}>
              <td className="item-cell">
                <div className="item-name">{item.name}</div>
                {item.description && <div className="item-details">{item.description}</div>}
              </td>
              <td className="qty-cell">{item.qty}</td>
              <td className="price-cell">{data.currencySymbol}{Number(item.amount)?.toFixed(2)}</td>
              <td className="amount-cell">{data.currencySymbol}{Number(item.total)?.toFixed(2)}</td>
            </tr>
          )) || (
            <tr>
              <td className="item-cell">Sample Service</td>
              <td className="qty-cell">1</td>
              <td className="price-cell">₹100.00</td>
              <td className="amount-cell">₹100.00</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="totals-section">
        <div className="totals">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>{data.currencySymbol}{data?.subtotal?.toFixed(2) || calculateSubtotal().toFixed(2)}</span>
          </div>
          {data?.tax > 0 && (
            <div className="total-row">
              <span>Tax ({data.tax}%):</span>
              <span>{data.currencySymbol}{data?.taxAmount?.toFixed(2) || calculateTax().toFixed(2)}</span>
            </div>
          )}
          <div className="total-row final-total">
            <span>Grand Total:</span>
            <span>{data.currencySymbol}{data?.total?.toFixed(2) || calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      {data?.accountName && (
        <div className="payment-info">
          <h4>Bank Account Details:</h4>
          <div>Account Name: {data.accountName}</div>
          <div>Account Number: {data.accountNumber}</div>
          <div>IFSC Code: {data.accountIfscCode}</div>
        </div>
      )}

      {/* Notes */}
      {data?.notes && (
        <div className="payment-terms">
          <h4>Notes:</h4>
          <p>{data.notes}</p>
        </div>
      )}

      {/* Decorative Circles */}
      <div className="curve-light"></div>
      <div className="curve-dark"></div>
    </div>
  );
};

export default Template4;