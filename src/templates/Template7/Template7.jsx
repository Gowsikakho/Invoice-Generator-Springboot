import React from 'react';
import './Template7.css';

const Template7 = ({ data }) => {
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
    <div className="invoice-container">
      <div className="invoice-page">
        {/* Geometric Corner Accents */}
        <div className="corner-teal-top"></div>
        <div className="corner-pink-top"></div>
        <div className="corner-pink-bottom"></div>
        <div className="corner-teal-bottom"></div>

        {/* Header */}
        <div className="header">
          <h1>INVOICE</h1>
        </div>

        {/* Meta Information */}
        <div className="meta-section">
          <div className="meta-left">
            <div className="meta-item">
              <span className="meta-label">Date Issued:</span>
              <span className="meta-value">{data?.invoiceDate || new Date().toLocaleDateString()}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Invoice No:</span>
              <span className="meta-value">{data?.invoiceNumber || 'INV-001'}</span>
            </div>
          </div>
          <div className="meta-right">
            <div className="meta-label">Issued to:</div>
            <div className="client-name">{data?.billingName || 'Client Name'}</div>
            <div className="client-address">{data?.billingAddress || 'Street Address'}</div>
            <div className="client-city">{data?.billingPhone || 'City'}</div>
          </div>
        </div>

        {/* Items Table */}
        <table className="items-table">
          <thead>
            <tr>
              <th className="no-col">NO</th>
              <th className="desc-col">DESCRIPTION</th>
              <th className="qty-col">QTY</th>
              <th className="price-col">PRICE</th>
              <th className="amount-col">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <td className="no-cell">{index + 1}</td>
                <td className="desc-cell">{item.name}</td>
                <td className="qty-cell">{item.qty}</td>
                <td className="price-cell">{data.currencySymbol}{Number(item.amount)?.toFixed(2)}</td>
                <td className="amount-cell">{data.currencySymbol}{Number(item.total)?.toFixed(2)}</td>
              </tr>
            )) || (
              <tr>
                <td className="no-cell">1</td>
                <td className="desc-cell">Sample Service</td>
                <td className="qty-cell">1</td>
                <td className="price-cell">₹100.00</td>
                <td className="amount-cell">₹100.00</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Grand Total */}
        <div className="grand-total">
          <span>GRAND TOTAL</span>
          <span>{data.currencySymbol}{data?.total?.toFixed(2) || calculateTotal().toFixed(2)}</span>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <div className="footer-right">
            <div className="signature-area">
              <div className="signature-line">Signature</div>
              <div className="signatory-name">{data?.companyName || 'Company Name'}</div>
              <div className="signatory-title">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template7;