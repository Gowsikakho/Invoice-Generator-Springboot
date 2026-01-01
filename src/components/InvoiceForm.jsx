import { assets } from "../assets/assets";
import { Trash2, Plus } from "lucide-react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData, errors, validateInvoiceData } = useContext(AppContext);

  const safe = (val) => (val ?? ""); // prevents uncontrolled input warnings

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...(prev.items || []),
        { name: "", qty: "", amount: "", description: "", total: 0 },
      ],
    }));
  };

  const deleteItem = (index) => {
    const items = (invoiceData.items || []).filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSameAsBilling = (checked) => {
    if (checked) {
      setInvoiceData((prev) => ({ ...prev, shipping: { ...prev.billing } }));
    } else {
      // optionally clear shipping or leave as-is
    }
  };

  const handleItemChange = (index, field, value) => {
    const items = [...(invoiceData.items || [])];
    items[index] = { ...items[index], [field]: value };

    // Auto-calculate total when qty or amount changes
    if (field === 'qty' || field === 'amount') {
      const qty = Number(field === 'qty' ? value : items[index].qty || 0);
      const amount = Number(field === 'amount' ? value : items[index].amount || 0);
      items[index].total = qty * amount;
    }

    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const calculateTotals = () => {
    const subtotal = (invoiceData.items || []).reduce(
      (sum, item) => sum + (Number(item.total) || 0),
      0
    );
    const taxRate = Number(invoiceData.tax || 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal };
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({ ...prev, logo: reader.result }));
        toast.success("Logo uploaded successfully");
      };
      reader.onerror = () => {
        toast.error("Failed to upload logo");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Load profile data and sync with invoice form
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      
      // Pre-fill company information from profile
      setInvoiceData((prev) => ({
        ...prev,
        company: {
          name: profile.businessName || prev.company.name,
          phone: profile.phone || prev.company.phone,
          address: `${profile.streetAddress || ''} ${profile.city || ''} ${profile.state || ''} ${profile.zipCode || ''}`.trim() || prev.company.address,
        },
        account: {
          name: profile.bankName || prev.account.name,
          number: profile.accountNumber || prev.account.number,
          ifsccode: profile.ifscCode || prev.account.ifsccode,
        },
        tax: profile.defaultTax || prev.tax,
        logo: profile.logo || prev.logo,
      }));
    }

    // Generate invoice number if not exists
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, number: randomNumber },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only once on mount

  return (
    <div className="invoiceform container py-4">
      {/* Company logo */}
      <div className="md-4">
        <h5>Company logo</h5>
        <div className="d-flex align-items-center gap-3">
          <label htmlFor="image" className="form-label" style={{ cursor: "pointer" }}>
            <img src={invoiceData.logo || assets.Upload} alt="upload" width={98} />
          </label>
          <input
            type="file"
            name="logo"
            id="image"
            hidden
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      {/* Company info */}
      <div className="md-4 mt-4">
        <h5>Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company name"
              value={safe(invoiceData.company.name)}
              onChange={(e) => handleChange("company", "name", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company phone"
              value={safe(invoiceData.company.phone)}
              onChange={(e) => handleChange("company", "phone", e.target.value)}
            />
          </div>

          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Company address"
              value={safe(invoiceData.company.address)}
              onChange={(e) => handleChange("company", "address", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bill to */}
      <div className="md-4 mt-4">
        <h5>Bill To</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={safe(invoiceData.billing.name)}
              onChange={(e) => handleChange("billing", "name", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone number"
              value={safe(invoiceData.billing.phone)}
              onChange={(e) => handleChange("billing", "phone", e.target.value)}
            />
          </div>

          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={safe(invoiceData.billing.address)}
              onChange={(e) => handleChange("billing", "address", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Ship to */}
      <div className="md-4">
        <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
          <h5>Ship To</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsBilling"
              onChange={(e) => handleSameAsBilling(e.target.checked)}
            />
            <label htmlFor="sameAsBilling" className="form-check-label">
              Same as Billing
            </label>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={safe(invoiceData.shipping.name)}
              onChange={(e) => handleChange("shipping", "name", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone number"
              value={safe(invoiceData.shipping.phone)}
              onChange={(e) => handleChange("shipping", "phone", e.target.value)}
            />
          </div>

          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Ship Address"
              value={safe(invoiceData.shipping.address)}
              onChange={(e) => handleChange("shipping", "address", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Invoice info */}
      <div className="md-4 mt-4">
        <h5>Invoice information</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="invoiceNumber" className="form-label">
              Invoice Number
            </label>
            <input
              type="text"
              disabled
              className="form-control"
              id="invoiceNumber"
              value={safe(invoiceData.invoice.number)}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDate"
              value={safe(invoiceData.invoice.date)}
              onChange={(e) => handleChange("invoice", "date", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="invoiceDueDate" className="form-label">
              Invoice Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDueDate"
              value={safe(invoiceData.invoice.dueDate)}
              onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Item details */}
      <div className="md-4 mt-4">
        <h5>Item Details</h5>

        {(invoiceData.items || []).map((item, index) => (
          <div key={index} className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={safe(item.name)}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  value={safe(item.qty)}
                  onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={safe(item.amount)}
                  onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Total"
                  value={safe(item.total)}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={safe(item.description)}
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
              ></textarea>

              {(invoiceData.items || []).length > 1 && (
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="mt-2">
          <button 
            className="btn btn-primary me-2 d-flex align-items-center gap-2" 
            type="button" 
            onClick={addItem}
          >
            <Plus size={16} />
            Add Item
          </button>
          {/* if no items, show a small helper */}
          {(invoiceData.items || []).length === 0 && (
            <small className="text-muted ms-2">Add at least one item to enable templates</small>
          )}
          {errors.items && (
            <div className="text-danger mt-2">{errors.items}</div>
          )}
        </div>
      </div>

      {/* Bank account info */}
      <div className="md-4 mt-4">
        <h5>Bank Account Details</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Name"
              value={safe(invoiceData.account.name)}
              onChange={(e) => handleChange("account", "name", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Number"
              value={safe(invoiceData.account.number)}
              onChange={(e) => handleChange("account", "number", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Branch / IFSC Code"
              value={safe(invoiceData.account.ifsccode)}
              onChange={(e) => handleChange("account", "ifsccode", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="md-4 mt-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} Rs</span>
            </div>

            <div className="d-flex justify-content-between align-items-center my-2">
              <label htmlFor="taxInput" className="me-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="taxInput"
                className="form-control w-40 text-end"
                placeholder="2"
                value={safe(invoiceData.tax)}
                onChange={(e) =>
                  setInvoiceData((prev) => ({ ...prev, tax: e.target.value }))
                }
              />
            </div>

            <div className="d-flex justify-content-between">
              <span>Tax Amount</span>
              <span>{taxAmount.toFixed(2)} Rs</span>
            </div>

            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Grand Total</span>
              <span>{grandTotal.toFixed(2)} Rs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="md-4 mt-4">
        <h5>Notes:</h5>
        <textarea
          className="form-control"
          rows={3}
          value={safe(invoiceData.notes)}
          onChange={(e) =>
            setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
          }
        ></textarea>
      </div>
    </div>
  );
};

export default InvoiceForm;
