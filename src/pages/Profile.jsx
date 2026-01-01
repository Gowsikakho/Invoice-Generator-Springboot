import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus, Eye, User, Save, Building, Mail, Phone, MapPin, CreditCard, Globe } from "lucide-react";

const Profile = () => {
    const [profileData, setProfileData] = useState({
        // Business Information
        businessName: "",
        businessType: "",
        logo: "",
        
        // Contact Information
        email: "",
        phone: "",
        
        // Address Information
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        
        // Banking Information
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        
        // Invoice Settings
        defaultCurrency: "INR",
        defaultTax: "",
        paymentTerms: "30",
        
        // Personal Information
        firstName: "",
        lastName: "",
        title: "",
        profilePicture: ""
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        // Handle file upload for logo
        if (name === 'logo' && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileData(prev => ({
                    ...prev,
                    logo: e.target.result
                }));
            };
            reader.readAsDataURL(file);
            return;
        }
        
        // Prevent negative values for tax rate
        if (name === 'defaultTax' && parseFloat(value) < 0) {
            return;
        }
        
        // Phone number validation: only 10 digits
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length > 10) {
                return;
            }
            setProfileData(prev => ({
                ...prev,
                [name]: numericValue
            }));
            return;
        }
        
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Save profile data to localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        console.log("Profile saved:", profileData);
        alert("Profile saved successfully!");
    };

    // Load saved profile data on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfileData(JSON.parse(savedProfile));
        }
    }, []);

    return (
        <div className="d-flex min-vh-100 bg-gray-50">
            {/* Sidebar */}
            <div className="bg-white shadow-sm w-64 flex flex-col" style={{minHeight: "100vh"}}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">QuickInvoice</h2>
                    <nav className="flex flex-col space-y-2">
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap">
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
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium whitespace-nowrap">
                            <User className="w-5 h-5" />
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
                        <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
                        <p className="text-gray-600">Manage your business information and invoice settings.</p>
                    </div>
                    <button 
                        onClick={handleSave}
                        style={{
                            backgroundColor: '#dc2626',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: '3px solid #b91c1c',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                    >
                        <Save size={16} />
                        Save Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Business Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-4">
                            <Building className="text-blue-600 mr-3" size={24} />
                            <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={profileData.businessName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Business Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                                <select
                                    name="businessType"
                                    value={profileData.businessType}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Type</option>
                                    <option value="sole_proprietorship">Sole Proprietorship</option>
                                    <option value="llc">LLC</option>
                                    <option value="corporation">Corporation</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    onChange={handleInputChange}
                                    accept="image/*"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {profileData.logo && (
                                    <div className="mt-2">
                                        <img 
                                            src={profileData.logo} 
                                            alt="Logo Preview" 
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'contain',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                backgroundColor: '#f9f9f9'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-4">
                            <Mail className="text-green-600 mr-3" size={24} />
                            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={profileData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title/Position</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={profileData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., CEO, Founder, Consultant"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="business@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="1234567890"
                                    maxLength="10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-4">
                            <MapPin className="text-purple-600 mr-3" size={24} />
                            <h3 className="text-lg font-semibold text-gray-900">Business Address</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={profileData.streetAddress}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="123 Business Street"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={profileData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={profileData.state}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={profileData.zipCode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="12345"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <select
                                        name="country"
                                        value={profileData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                        <option value="IN">India</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-4">
                            <FileText className="text-orange-600 mr-3" size={24} />
                            <h3 className="text-lg font-semibold text-gray-900">Invoice Settings</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                                    <select
                                        name="defaultCurrency"
                                        value={profileData.defaultCurrency}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="INR">INR (₹)</option>
                                        <option value="CAD">CAD (C$)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        name="defaultTax"
                                        value={profileData.defaultTax}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms (Days)</label>
                                <select
                                    name="paymentTerms"
                                    value={profileData.paymentTerms}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="0">Due on Receipt</option>
                                    <option value="15">Net 15</option>
                                    <option value="30">Net 30</option>
                                    <option value="45">Net 45</option>
                                    <option value="60">Net 60</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <input
                                    type="text"
                                    name="bankName"
                                    value={profileData.bankName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Bank Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    value={profileData.accountNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Account Number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                                <input
                                    type="text"
                                    name="ifscCode"
                                    value={profileData.ifscCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="IFSC Code"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;