import './Template2.css';

const Template2 = ({data}) => {
  const {
    companyName, companyAddress, companyPhone, companyLogo,
    invoiceNumber, invoiceDate, dueDate,
    billingName, billingAddress, billingPhone,
    items, subtotal, taxAmount, total, tax, notes, currencySymbol
  } = data;

  return (
    <div className="template2-invoice">
      {/* Top Teal Bar */}
      <div className="teal-bar"></div>

      {/* Header Section */}
      <div className="invoice-header">
        <div className="left-header">
          {companyLogo && <img src={companyLogo} alt="Logo" className="company-logo" />}
          <h1 className="invoice-title">Invoice</h1>
        </div>
        <div className="right-header">
          <div className="company-info">
            <div className="company-name">{companyName}</div>
            <div className="company-address">{companyAddress}</div>
            <div className="company-phone">{companyPhone}</div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="header-divider"></div>

      {/* Billing Information Section */}
      <div className="billing-section">
        <div className="bill-to">
          <div className="section-label">BILL TO:</div>
          <div className="customer-name">{billingName}</div>
          <div className="customer-address">{billingAddress}</div>
          <div className="customer-phone">{billingPhone}</div>
        </div>
        <div className="invoice-meta">
          <div className="meta-item">
            <div className="meta-label">INVOICE #</div>
            <div className="meta-value">{invoiceNumber}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">DATE</div>
            <div className="meta-value">{invoiceDate}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">INVOICE DUE DATE</div>
            <div className="meta-value">{dueDate}</div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="items-table">
        <thead>
          <tr>
            <th className="items-col">ITEMS</th>
            <th className="desc-col">DESCRIPTION</th>
            <th className="qty-col">QUANTITY</th>
            <th className="price-col">PRICE</th>
            <th className="tax-col">TAX</th>
            <th className="amount-col">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index}>
              <td className="items-col">{item.name}</td>
              <td className="desc-col">{item.description}</td>
              <td className="qty-col">{item.qty}</td>
              <td className="price-col">{currencySymbol}{item.amount}</td>
              <td className="tax-col">{tax}%</td>
              <td className="amount-col">{currencySymbol}{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Notes and Total Section */}
      <div className="bottom-section">
        <div className="notes-section">
          <div className="notes-label">NOTES:</div>
          <div className="notes-text">{notes}</div>
        </div>
        <div className="total-section">
          <div className="total-label">TOTAL</div>
          <div className="total-amount">{currencySymbol}{total}</div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="footer-text">Powered by QuickInvoice</div>
        <div className="footer-disclaimer">Professional invoice generation made simple</div>
      </div>
    </div>
  );
};

export default Template2;