import { createContext, useState } from "react";

export const AppContext = createContext();

const initialInvoicedata={
    title:"New Invoice",
    billing: {name: "", phone:"", address:""},
    shipping:{name: "",phone:"", address:""},
    invoice:{number:"", date:"", dueDate:""},
    account:{name:"",number:"",ifsccode:""},
    company:{name:"",number:"",address:""},
    tax:0,
    notes:"",
    items:[
        {name:"",qty:"",amount:"",description:"",total:0},
    ],
    logo:""
};

export const AppContextProvider = ({ children }) => {
    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoicedata);
    const [selectedTemplate, setSelectedTemplate] = useState("template1");
    const contextValue = {
        invoiceTitle,setInvoiceTitle,
        invoiceData,setInvoiceData,
        selectedTemplate,setSelectedTemplate,
        initialInvoicedata,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
