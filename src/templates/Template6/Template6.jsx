import React from 'react';
import './Template6.css';

const Template6 = ({ data }) => {
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
      <div className="invoice-card">
        {/* Header - 10% with light sandal background */}
        <div className="header-section">
          <div className="header-left">
            <h1>INVOICE</h1>
            <div className="company-logo">
              {data?.companyLogo ? (
                <img src={data.companyLogo} alt="Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
              ) : (
                'LOGO'
              )}
            </div>
          </div>
          <div className="company-details">
            <div className="company-name">{data?.companyName || 'Company Name'}</div>
            <div>{data?.companyAddress || 'Address'}</div>
            <div>{data?.companyPhone || 'Phone'}</div>
          </div>
        </div>

        {/* Bill To & Ship To in 2 columns */}
        <div className="billing-section">
          <div className="bill-to">
            <h3>Bill To</h3>
            <div className="customer-name">{data?.billingName || 'Customer Name'}</div>
            <div>{data?.billingAddress || 'Address'}</div>
            <div>{data?.billingPhone || 'Phone'}</div>
          </div>
          <div className="ship-to">
            <h3>Ship To</h3>
            <div className="customer-name">{data?.shippingName || 'Shipping Name'}</div>
            <div>{data?.shippingAddress || 'Shipping Address'}</div>
            <div>{data?.shippingPhone || 'Shipping Phone'}</div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="divider-line"></div>

        {/* Items Table */}
        <table className="items-table">
          <thead>
            <tr>
              <th className="desc-header">Item / Service</th>
              <th className="desc-header">Description</th>
              <th className="qty-header">Quantity</th>
              <th className="price-header">Rate</th>
              <th className="amount-header">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <td className="desc-cell">
                  <div className="item-name">{item.name}</div>
                </td>
                <td className="desc-cell">
                  {item.description && <div className="item-desc">{item.description}</div>}
                </td>
                <td className="qty-cell">{item.qty}</td>
                <td className="price-cell">{data.currencySymbol}{Number(item.amount)?.toFixed(2)}</td>
                <td className="amount-cell">{data.currencySymbol}{Number(item.total)?.toFixed(2)}</td>
              </tr>
            )) || (
              <tr>
                <td className="desc-cell">Sample Service</td>
                <td className="desc-cell">Professional service</td>
                <td className="qty-cell">1</td>
                <td className="price-cell">₹100.00</td>
                <td className="amount-cell">₹100.00</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="totals-section">
          <div className="totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{data.currencySymbol}{data?.subtotal?.toFixed(2) || calculateSubtotal().toFixed(2)}</span>
            </div>
            {data?.tax > 0 && (
              <div className="total-row">
                <span>Tax ({data.tax}%)</span>
                <span>{data.currencySymbol}{data?.taxAmount?.toFixed(2) || calculateTax().toFixed(2)}</span>
              </div>
            )}
            <div className="final-total">
              <span>Total</span>
              <span>{data.currencySymbol}{data?.total?.toFixed(2) || calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer - 5% with light sandal background */}
        <div className="footer-section">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default Template6;