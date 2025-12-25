import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FileText, Plus, Eye } from "lucide-react";

const Dashboard = () => {
    const { invoiceData, resetInvoiceData } = useContext(AppContext);
    
    const handleNewInvoice = () => {
        resetInvoiceData();
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Invoice Dashboard</h2>
                        <Link 
                            to="/generate" 
                            className="btn btn-primary d-flex align-items-center gap-2"
                            onClick={handleNewInvoice}
                        >
                            <Plus size={20} />
                            New Invoice
                        </Link>
                    </div>
                    
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <FileText size={48} className="text-primary mb-3" />
                                    <h5 className="card-title">Current Invoice</h5>
                                    <p className="card-text text-muted">
                                        {invoiceData.invoice?.number || "No invoice created"}
                                    </p>
                                    {invoiceData.items?.length > 0 ? (
                                        <div className="d-flex gap-2 justify-content-center">
                                            <Link to="/generate" className="btn btn-outline-primary btn-sm">
                                                Edit
                                            </Link>
                                            <Link to="/preview" className="btn btn-primary btn-sm">
                                                <Eye size={16} className="me-1" />
                                                Preview
                                            </Link>
                                        </div>
                                    ) : (
                                        <Link to="/generate" className="btn btn-primary">
                                            Create Invoice
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-8">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Activity</h5>
                                    <div className="text-muted">
                                        <p>No recent activity</p>
                                        <small>Your invoice history will appear here</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;