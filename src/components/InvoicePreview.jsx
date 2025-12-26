import { forwardRef } from "react";

const InvoicePreview=forwardRef(({invoiceData,template},ref)=>{
    return(
        <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
            Render the pdf

        </div>
    )
});
export default InvoicePreview;