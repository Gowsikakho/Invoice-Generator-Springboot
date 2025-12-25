import { createContext, useState } from "react";

export const AppContext = createContext();

// --------------------------------------------
// Initial Invoice Data (Clean + Corrected)
// --------------------------------------------
export const initialInvoicedata = {
  title: "New Invoice",

  billing: {
    name: "",
    phone: "",
    address: "",
  },

  shipping: {
    name: "",
    phone: "",
    address: "",
  },

  invoice: {
    number: "",
    date: "",
    dueDate: "",
  },

  account: {
    name: "",
    number: "",
    ifsccode: "",
  },

  company: {
    name: "",
    phone: "", // fixed key (was `number` earlier)
    address: "",
  },

  tax: 0,
  notes: "",

  // IMPORTANT: Should start empty, not with a blank item
  items: [],

  logo: "",
};

// --------------------------------------------
// Context Provider
// --------------------------------------------
export const AppContextProvider = ({ children }) => {
  const [invoiceTitle, setInvoiceTitle] = useState(initialInvoicedata.title);
  const [invoiceData, setInvoiceData] = useState(initialInvoicedata);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateInvoiceData = (data) => {
    const newErrors = {};
    
    if (!data.company?.name?.trim()) {
      newErrors.companyName = "Company name is required";
    }
    
    if (!data.billing?.name?.trim()) {
      newErrors.billingName = "Billing name is required";
    }
    
    if (!data.items || data.items.length === 0) {
      newErrors.items = "At least one item is required";
    }
    
    return newErrors;
  };

  // Reset invoice data
  const resetInvoiceData = () => {
    setInvoiceData(initialInvoicedata);
    setInvoiceTitle(initialInvoicedata.title);
    setErrors({});
  };

  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,

    invoiceData,
    setInvoiceData,

    selectedTemplate,
    setSelectedTemplate,

    isLoading,
    setIsLoading,

    errors,
    setErrors,

    validateInvoiceData,
    resetInvoiceData,
    initialInvoicedata,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
