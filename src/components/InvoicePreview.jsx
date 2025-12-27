import { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1/Template1.jsx";
import Template2 from "../templates/Template2/Template2.jsx";
import Template3 from "../templates/Template3/Template3.jsx";
import Template4 from "../templates/Template4/Template4.jsx";
import Template5 from "../templates/Template5/Template5.jsx";
import Template6 from "../templates/Template6/Template6.jsx";
import Template7 from "../templates/Template7/Template7.jsx";
import Template8 from "../templates/Template8/Template8.jsx";
import Template9 from "../templates/Template9/Template9.jsx";
import Template10 from "../templates/Template10/Template10.jsx";

const InvoicePreview = forwardRef(({invoiceData, template}, ref) => {
    if (!invoiceData) {
        return (
            <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
                <div className="text-center p-4">
                    <p>No invoice data available</p>
                </div>
            </div>
        );
    }

    const formattedData = formatInvoiceData(invoiceData);

    const renderTemplate = () => {
        switch(template) {
            case 'template1':
                return <Template1 data={formattedData} />;
            case 'template2':
                return <Template2 data={formattedData} />;
            case 'template3':
                return <Template3 data={formattedData} />;
            case 'template4':
                return <Template4 data={formattedData} />;
            case 'template5':
                return <Template5 data={formattedData} />;
            case 'template6':
                return <Template6 data={formattedData} />;
            case 'template7':
                return <Template7 data={formattedData} />;
            case 'template8':
                return <Template8 data={formattedData} />;
            case 'template9':
                return <Template9 data={formattedData} />;
            case 'template10':
                return <Template10 data={formattedData} />;
            default:
                return <Template1 data={formattedData} />;
        }
    };

    return(
        <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
            {renderTemplate()}
        </div>
    )
});

export default InvoicePreview;