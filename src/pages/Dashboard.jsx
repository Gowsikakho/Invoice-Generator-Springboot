import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FileText, Plus, Eye, Lightbulb, ArrowRight } from "lucide-react";
import "../dashboard.css";

const Dashboard = () => {
    const { invoiceData, resetInvoiceData } = useContext(AppContext);
    
    // Mock invoice data for dashboard (replace with API call later)
    const mockInvoices = [
        { id: 1, clientName: "Acme Corp", amount: 2500.00, status: "PAID", dueDate: "2024-01-15" },
        { id: 2, clientName: "Tech Solutions", amount: 1800.50, status: "UNPAID", dueDate: "2024-01-20" },
        { id: 3, clientName: "Design Studio", amount: 3200.00, status: "PAID", dueDate: "2024-01-10" },
        { id: 4, clientName: "Marketing Inc", amount: 950.75, status: "UNPAID", dueDate: "2024-01-25" },
        { id: 5, clientName: "Consulting LLC", amount: 4100.00, status: "PAID", dueDate: "2024-01-05" }
    ];

    // Calculate KPIs
    const totalInvoices = mockInvoices.length;
    const totalPaid = mockInvoices.filter(inv => inv.status === "PAID").reduce((sum, inv) => sum + inv.amount, 0);
    const totalUnpaid = mockInvoices.filter(inv => inv.status === "UNPAID").reduce((sum, inv) => sum + inv.amount, 0);
    
    const handleNewInvoice = () => {
        resetInvoiceData();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="d-flex min-vh-100 bg-gray-50">
            {/* Sidebar */}
            <div className="bg-white shadow-sm w-64 flex flex-col" style={{minHeight: "100vh"}}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">QuickInvoice</h2>
                    <nav className="flex flex-col space-y-2">
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium whitespace-nowrap">
                            <FileText className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/invoices" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap">
                            <FileText className="w-5 h-5" />
                            <span>Invoices</span>
                        </Link>
                        <Link to="/generate" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap">
                            <Plus className="w-5 h-5" />
                            <span>Create Invoice</span>
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap">
                            <Eye className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
                        <p className="text-gray-600">Here's your invoice overview.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <p className="font-medium text-gray-900">Alex</p>
                            <p className="text-sm text-gray-500">alex@timotprogram.com</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            A
                        </div>
                    </div>
                </div>

                {/* Dashboard Title */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
                    <p className="text-gray-600">A quick overview of your business finances.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Invoices */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <FileText className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                                <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Paid */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-green-600 text-2xl font-bold">₹</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Unpaid */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-red-600 text-2xl font-bold">₹</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Unpaid</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalUnpaid)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Insights Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <Lightbulb className="text-yellow-500 mr-3" size={24} />
                        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        {totalPaid > 0 && (
                            <p>• Great job! You've successfully collected {formatCurrency(totalPaid)} from paid invoices.</p>
                        )}
                        {totalUnpaid > 0 && (
                            <p>• You have {formatCurrency(totalUnpaid)} in unpaid invoices that need attention.</p>
                        )}
                        {totalPaid > 0 && totalUnpaid > 0 && (
                            <p>• Consider following up on overdue invoices to improve cash flow.</p>
                        )}
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                        <Link to="/invoices" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                            View All
                            <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockInvoices.slice(0, 5).map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {invoice.clientName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(invoice.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                invoice.status === 'PAID' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(invoice.dueDate)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;