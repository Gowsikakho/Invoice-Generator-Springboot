import { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1/Template1.jsx";
import Template2 from "../templates/Template2/Template2.jsx";
import Template3 from "../templates/Template3/Template3.jsx";

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
                return <Template1 data={formattedData} />; // Placeholder - will create Template4
            case 'template5':
                return <Template1 data={formattedData} />; // Placeholder - will create Template5
            case 'template6':
                return <Template1 data={formattedData} />; // Placeholder - will create Template6
            case 'template7':
                return <Template1 data={formattedData} />; // Placeholder - will create Template7
            case 'template8':
                return <Template1 data={formattedData} />; // Placeholder - will create Template8
            case 'template9':
                return <Template1 data={formattedData} />; // Placeholder - will create Template9
            case 'template10':
                return <Template1 data={formattedData} />; // Placeholder - will create Template10
            case 'template11':
                return <Template1 data={formattedData} />; // Placeholder - will create Template11
            case 'template12':
                return <Template1 data={formattedData} />; // Placeholder - will create Template12
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