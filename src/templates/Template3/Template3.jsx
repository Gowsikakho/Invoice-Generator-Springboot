import './Template3.css';

const Template3 = ({data}) => {
  const {
    companyName = '', companyAddress = '', companyPhone = '', companyLogo = '',
    invoiceNumber = '', invoiceDate = '',
    billingName = '', billingAddress = '', billingPhone = '',
    shippingName = '', shippingAddress = '', shippingPhone = '',
    accountName = '', accountNumber = '',
    items = [], subtotal = 0, taxAmount = 0, total = 0, tax = 0, currencySymbol = '₹'
  } = data || {};

  const convertToWords = (amount) => {
    if (!amount || isNaN(amount)) return 'Zero';
    return 'Rupees ' + Math.floor(amount).toString();
  };

  return (
    <div className="template3-invoice">
      {/* Header Section */}
      <div className="invoice-header">
        <div className="logo-section">
          <div className="company-logo">
            {companyLogo && <img src={companyLogo} alt="Logo" className="logo-img" />}
            <span className="company-text">{companyName}</span>
          </div>
        </div>
        <div className="title-section">
          <div className="main-title">Tax Invoice/Bill of Supply/Cash Memo</div>
          <div className="sub-title">(Original for Recipient)</div>
        </div>
      </div>

      {/* Seller & Buyer Details Section */}
      <div className="details-section">
        <div className="seller-column">
          <div className="section-label">Sold By:</div>
          <div className="seller-name">{companyName}</div>
          <div className="seller-address">{companyAddress}</div>
          <div className="seller-phone">{companyPhone}</div>
          <div className="seller-country">IN</div>
          
          <div className="seller-details">
            <div><span className="label">PAN No:</span> ABCDE1234F</div>
            <div><span className="label">GST Registration No:</span> 12ABCDE3456F1Z5</div>
          </div>
        </div>

        <div className="buyer-column">
          <div className="section-label">Billing Address:</div>
          <div className="customer-name">{billingName}</div>
          <div className="customer-address">{billingAddress}</div>
          <div className="customer-phone">{billingPhone}</div>
          <div><span className="label">State/UT Code:</span> 07</div>
          
          <div className="shipping-section">
            <div className="section-label">Shipping Address:</div>
            <div className="customer-name">{shippingName || billingName}</div>
            <div className="customer-address">{shippingAddress || billingAddress}</div>
            <div className="customer-phone">{shippingPhone || billingPhone}</div>
          </div>

          <div className="invoice-meta">
            <div>Place of supply: DELHI</div>
            <div>Place of delivery: DELHI</div>
            <div>Invoice Number: {invoiceNumber}</div>
            <div>Invoice Date: {invoiceDate}</div>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="order-info">
        <span className="label">Order Number:</span> 171-1234567-1234567
        <span className="label ml-4">Order Date:</span> {invoiceDate}
      </div>

      {/* Items Table */}
      <table className="items-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Tax Rate</th>
            <th>Tax Amount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index}>
              <td className="center">{index + 1}</td>
              <td className="left">
                <div>{item.name}</div>
                <div className="sku">[SKU: {item.name?.toUpperCase().replace(/\s/g, '')}-001]</div>
              </td>
              <td className="right">{currencySymbol}{item.amount}</td>
              <td className="center">{item.qty}</td>
              <td className="right">{tax}%</td>
              <td className="right">{currencySymbol}{((item.amount * item.qty * tax) / 100).toFixed(2)}</td>
              <td className="right">{currencySymbol}{item.total}</td>
            </tr>
          ))}
          <tr>
            <td className="center">-</td>
            <td className="left">Shipping Charges</td>
            <td className="right">{currencySymbol}0.00</td>
            <td className="center">1</td>
            <td className="right">0%</td>
            <td className="right">{currencySymbol}0.00</td>
            <td className="right">{currencySymbol}0.00</td>
          </tr>
        </tbody>
      </table>
      
      {/* Total Section */}
      <div className="total-section">
        <div className="total-row-right">
          <span className="total-label-right">TOTAL:</span>
          <span className="total-amount-right">{currencySymbol}{total}</span>
        </div>
      </div>

      {/* Amount in Words */}
      <div className="amount-words">
        <span className="label">Amount in Words:</span>
        {convertToWords(total)} only
      </div>

      {/* Signature Section */}
      <div className="signature-section">
        <div className="signature-box">
          <div>For {companyName}:</div>
          <div className="signature-area"></div>
          <div className="signatory-label">Authorized Signatory</div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-section">
        <div className="reverse-charge">Whether tax is payable under reverse charge – No</div>
        <div className="disclaimer">
          This is a computer generated invoice and does not require physical signature.
        </div>
        <div className="page-number">Page 1 of 1</div>
      </div>
    </div>
  );
};

export default Template3;