import React from 'react';
import './Template9.css';

const Template9 = ({ data }) => {
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
    <div className="invoice">
      <aside className="invoice-sidebar">
        <div className="sidebar-top">
          <div className="logo-box">
            {data?.companyName?.charAt(0) || 'C'}
          </div>
          
          <div className="from-section">
            <div className="sidebar-title">FROM</div>
            <div className="sidebar-text">
              <div>{data?.companyName || 'Company Name'}</div>
              <div>{data?.companyAddress || 'Company Address'}</div>
              <div>{data?.companyPhone || 'Phone Number'}</div>
            </div>
          </div>

          <div className="invoice-meta">
            <div className="meta-item">
              <div className="sidebar-title">INVOICE NO.</div>
              <div className="sidebar-text">{data?.invoiceNumber || 'INV-001'}</div>
            </div>
            <div className="meta-item">
              <div className="sidebar-title">DATE</div>
              <div className="sidebar-text">{data?.invoiceDate || new Date().toLocaleDateString()}</div>
            </div>
            <div className="meta-item">
              <div className="sidebar-title">DUE DATE</div>
              <div className="sidebar-text">{data?.dueDate || new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div className="notes-section">
          <div className="sidebar-title">NOTES</div>
          <div className="sidebar-text">
            Payment is due within 30 days of invoice date. Late payments may incur additional charges.
          </div>
        </div>
      </aside>

      <main className="invoice-main">
        <h1 className="invoice-title">INVOICE</h1>

        <div className="bill-to">
          <h4>BILL TO</h4>
          <div className="bill-to-details">
            <div>{data?.billingName || 'Customer Name'}</div>
            <div>{data?.billingAddress || 'Customer Address'}</div>
            <div>{data?.billingPhone || 'Customer Phone'}</div>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.name}
                  <span className="item-subtext">Service description</span>
                </td>
                <td>{item.qty}</td>
                <td>{data?.currencySymbol || '₹'}{Number(item.amount)?.toFixed(2)}</td>
                <td>{data?.tax || 0}%</td>
                <td>{data?.currencySymbol || '₹'}{Number(item.total)?.toFixed(2)}</td>
              </tr>
            )) || (
              <tr>
                <td>
                  Sample Service
                  <span className="item-subtext">Service description</span>
                </td>
                <td>1</td>
                <td>₹100.00</td>
                <td>18%</td>
                <td>₹118.00</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="totals">
          <div className="totals-row">
            <span>Subtotal</span>
            <span>{data?.currencySymbol || '₹'}{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="totals-row">
            <span>Tax</span>
            <span>{data?.currencySymbol || '₹'}{calculateTax().toFixed(2)}</span>
          </div>
          <div className="totals-row total">
            <span>Total</span>
            <span>{data?.currencySymbol || '₹'}{calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="signature">
          <div className="signature-line"></div>
          <label>Authorized Signature</label>
        </div>
      </main>
    </div>
  );
};

export default Template9;