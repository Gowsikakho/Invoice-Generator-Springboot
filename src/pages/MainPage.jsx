import { useState, useContext } from "react";
import { Pencil } from "lucide-react";
import { AppContext } from "../context/AppContext";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";
import { toast } from "react-toastify";

const MainPage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    setSelectedTemplate,
  } = useContext(AppContext);

  const validateBeforeTemplate = () => {
    const items = invoiceData?.items || [];

    // 1) No items added
    if (items.length === 0) {
      toast.error("Please add at least one item before choosing a template.");
      return false;
    }

    // 2) Each item must have qty and amount and both > 0
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.name?.toString().trim()) {
        toast.error(`Item ${i + 1}: Please enter an item name.`);
        return false;
      }
      const qty = Number(it.qty);
      const amount = Number(it.amount);
      if (!qty || qty <= 0) {
        toast.error(`Item ${i + 1}: Quantity must be greater than zero.`);
        return false;
      }
      if (!amount || amount <= 0) {
        toast.error(`Item ${i + 1}: Amount must be greater than zero.`);
        return false;
      }
    }

    // 3) Basic invoice info validation
    if (!invoiceData.company?.name?.toString().trim()) {
      toast.error("Please enter your company name.");
      return false;
    }

    if (!invoiceData.billing?.name?.toString().trim()) {
      toast.error("Please enter billing name.");
      return false;
    }

    if (!invoiceData.invoice?.date) {
      toast.error("Please pick an invoice date.");
      return false;
    }

    // 4) Grand total must be > 0
    const subtotal = (invoiceData.items || []).reduce(
      (s, it) => s + (Number(it.total) || 0),
      0
    );
    const taxRate = Number(invoiceData.tax || 0);
    const grandTotal = subtotal + (subtotal * taxRate) / 100;
    if (!grandTotal || grandTotal <= 0) {
      toast.error("Invoice total must be greater than zero.");
      return false;
    }

    return true;
  };

  const handleTemplateClick = (templateId) => {
    if (!validateBeforeTemplate()) return; // toasts are shown by validator

    // All good - apply template
    setSelectedTemplate(templateId);
    toast.success("Template selected.");
  };

  const handleTitleChange = (e) => {
    setInvoiceTitle(e.target.value);
    setInvoiceData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="mainpage container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Title Section */}
        <div className="bg-white border rounded shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center">
            {isEditingTitle ? (
              <input
                type="text"
                className="form-control me-2"
                autoFocus
                onBlur={handleTitleBlur}
                onChange={handleTitleChange}
                value={invoiceTitle}
              />
            ) : (
              <>
                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                <button
                  className="btn btn-sm p-0 border-0 bg-transparent"
                  onClick={handleTitleEdit}
                >
                  <Pencil className="text-primary" size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Invoice Form + Templates */}
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <InvoiceForm />
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <TemplateGrid onTemplateClick={handleTemplateClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
