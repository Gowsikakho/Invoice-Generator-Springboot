import './Template1.css';

const Template1 = ({data}) => {
  const {
    companyName, companyAddress, companyPhone, companyLogo,
    invoiceNumber, invoiceDate, dueDate,
    billingName, billingAddress, billingPhone,
    accountName, accountNumber,
    items, subtotal, taxAmount, total, tax, notes, currencySymbol
  } = data;

  return (
    <div className="template1-invoice">
      {/* Header Section */}
      <div className="invoice-header">
        <div className="company-section">
          <div className="dark-banner">
            <div className="company-logo-area">
              {companyLogo && <img src={companyLogo} alt="Logo" className="logo" />}
              <span className="company-name">{companyName}</span>
            </div>
          </div>
        </div>
        <div className="blue-strip"></div>
      </div>

      {/* Invoice Title */}
      <div className="invoice-title">
        <h1>INVOICE</h1>
      </div>

      {/* Invoice Meta Information */}
      <div className="invoice-meta">
        <div className="invoice-to">
          <div className="label">Invoice to:</div>
          <div className="customer-name">{billingName}</div>
          <div className="customer-address">{billingAddress}</div>
          <div className="customer-phone">{billingPhone}</div>
        </div>
        <div className="invoice-details">
          <div className="detail-row">
            <span className="detail-label">Invoice number:</span>
            <span className="detail-value">{invoiceNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{invoiceDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Due date:</span>
            <span className="detail-value">{dueDate}</span>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="divider"></div>

      {/* Items Table */}
      <table className="items-table">
        <thead>
          <tr>
            <th className="item-col">Item</th>
            <th className="qty-col">Quantity</th>
            <th className="price-col">Unit Price</th>
            <th className="total-col">Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index}>
              <td className="item-col">
                <div className="item-name">{item.name}</div>
                {item.description && <div className="item-desc">{item.description}</div>}
              </td>
              <td className="qty-col">{item.qty}</td>
              <td className="price-col">{currencySymbol}{item.amount}</td>
              <td className="total-col">{currencySymbol}{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{currencySymbol}{subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Tax ({tax}%):</span>
          <span>{currencySymbol}{taxAmount}</span>
        </div>
        <div className="summary-row total-row">
          <span>Total:</span>
          <span>{currencySymbol}{total}</span>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="payment-section">
        <div className="payment-title">PAYMENT METHOD</div>
        <div className="payment-details">
          <div>Bank name: {accountName}</div>
          <div>Account number: {accountNumber}</div>
          <div>Pay-by date: {dueDate}</div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="thank-you">Thank you for your business!</div>
        <div className="signature">Authorized Signed</div>
      </div>

      {/* Bottom Contact Bar */}
      <div className="contact-bar">
        <span>{companyPhone}</span>
        <span>{companyAddress}</span>
      </div>
    </div>
  );
};

export default Template1;