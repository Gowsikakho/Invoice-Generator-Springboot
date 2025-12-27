import React from 'react';
import './Template5.css';

const Template5 = ({ data }) => {
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
      {/* Top Header Bar */}
      <div className="header-bar">
        <div className="logo-box">
          {data?.companyLogo ? (
            <img src={data.companyLogo} alt="Logo" className="logo" />
          ) : (
            <div className="logo-placeholder">LOGO</div>
          )}
        </div>
        <div className="invoice-title">INVOICE</div>
      </div>

      {/* Company & Invoice Info */}
      <div className="info-section">
        <div className="company-info">
          <div className="company-name">{data?.companyName || 'Your Company Name'}</div>
          <div>{data?.companyAddress || '123 Business Street'}</div>
          <div>{data?.companyPhone || '(555) 123-4567'}</div>
        </div>
        <div className="invoice-info">
          <div className="info-row">
            <span className="label">Date</span>
            <span className="value">{data?.invoiceDate || new Date().toLocaleDateString()}</span>
          </div>
          <div className="info-row">
            <span className="label">Invoice #</span>
            <span className="value">{data?.invoiceNumber || 'INV-001'}</span>
          </div>
          <div className="info-row">
            <span className="label">Due Date</span>
            <span className="value">{data?.dueDate || new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="bill-to-section">
        <div className="bill-to-label">Bill To:</div>
        <div className="customer-name">{data?.billingName || 'Customer Name'}</div>
        <div>{data?.billingAddress || 'Customer Address'}</div>
        <div>{data?.billingPhone || 'Customer Phone'}</div>
      </div>

      {/* Items Table */}
      <table className="items-table">
        <thead>
          <tr>
            <th className="qty-col">QTY</th>
            <th className="desc-col">DESCRIPTION</th>
            <th className="price-col">UNIT PRICE</th>
            <th className="amount-col">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td className="qty-cell">{item.qty}</td>
              <td className="desc-cell">
                <div className="item-name">{item.name}</div>
                {item.description && <div className="item-desc">{item.description}</div>}
              </td>
              <td className="price-cell">{data.currencySymbol}{Number(item.amount)?.toFixed(2)}</td>
              <td className="amount-cell">{data.currencySymbol}{Number(item.total)?.toFixed(2)}</td>
            </tr>
          )) || (
            <tr className="even-row">
              <td className="qty-cell">1</td>
              <td className="desc-cell">Sample Service</td>
              <td className="price-cell">₹100.00</td>
              <td className="amount-cell">₹100.00</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{data.currencySymbol}{data?.subtotal?.toFixed(2) || calculateSubtotal().toFixed(2)}</span>
        </div>
        {data?.tax > 0 && (
          <div className="summary-row">
            <span>Tax ({data.tax}%)</span>
            <span>{data.currencySymbol}{data?.taxAmount?.toFixed(2) || calculateTax().toFixed(2)}</span>
          </div>
        )}
        <div className="balance-due">
          <span>Balance Due</span>
          <span>{data.currencySymbol}{data?.total?.toFixed(2) || calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-section">
        <div className="business-quote">
          "Excellence in service, integrity in business - your success is our commitment."
        </div>
        <div className="thank-you">
          Thank you for your business!
        </div>
      </div>
    </div>
  );
};

export default Template5;