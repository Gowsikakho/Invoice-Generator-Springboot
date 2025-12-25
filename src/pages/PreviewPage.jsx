import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { templates } from "../assets/assets.js";

const PreviewPage = () => {
    const previewRef = useRef();
    const navigate = useNavigate();
    const { selectedTemplate, setSelectedTemplate, invoiceData } = useContext(AppContext);

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
        toast.success(`Template ${templateId} selected`);
    };

    const handleSaveAndExit = () => {
        // Add save logic here
        toast.success("Invoice saved successfully!");
        navigate("/dashboard");
    };

    const handleDeleteInvoice = () => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            // Add delete logic here
            toast.success("Invoice deleted successfully!");
            navigate("/dashboard");
        }
    };

    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    const handleSendEmail = () => {
        // Add email functionality
        toast.info("Email functionality coming soon!");
    };

    const handleDownloadPDF = () => {
        // Add PDF download functionality
        toast.info("PDF download functionality coming soon!");
    };

    return (
        <div className="container-fluid d-flex flex-column p-3 min-vh-100">
            <div className="d-flex flex-column align-items-center mb-4 gap-3">
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({ id, label }) => (
                        <button
                            key={id}
                            style={{minWidth:"100px",height: "38px"}}
                            className={`btn btn-sm rounded-pill p-2 ${
                                selectedTemplate === id
                                    ? "btn-warning"
                                    : "btn-outline-secondary"
                            }`}
                            onClick={() => handleTemplateSelect(id)}
                            aria-pressed={selectedTemplate === id}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button 
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                        onClick={handleSaveAndExit}
                    >
                        Save and Exit
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={handleDeleteInvoice}
                    >
                        Delete Invoice
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={handleBackToDashboard}
                    >
                        Back to Dashboard
                    </button>
                    <button 
                        className="btn btn-info"
                        onClick={handleSendEmail}
                    >
                        Send Email
                    </button>
                    <button 
                        className="btn btn-success d-flex align-items-center justify-content-center"
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                </div>
            </div>
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
                <div ref={previewRef} className="bg-white shadow rounded p-4" style={{minHeight: "600px", width: "100%", maxWidth: "800px"}}>
                    {invoiceData.items?.length > 0 ? (
                        <div className="text-center">
                            <h4>Invoice Preview</h4>
                            <p className="text-muted">Template: {selectedTemplate}</p>
                            <div className="mt-4">
                                <p><strong>Invoice #:</strong> {invoiceData.invoice?.number}</p>
                                <p><strong>Company:</strong> {invoiceData.company?.name || "Not specified"}</p>
                                <p><strong>Items:</strong> {invoiceData.items?.length} item(s)</p>
                            </div>
                            <div className="alert alert-info mt-4">
                                PDF preview will be rendered here with the selected template
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted">
                            <h5>No Invoice Data</h5>
                            <p>Please add items to your invoice to see the preview</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate("/generate")}
                            >
                                Go to Invoice Form
                            </button>
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default PreviewPage;
