import React from "react";
import assets from "../../assets/assets.js";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <header
        id="hero"
        className="text-white text-center d-flex align-items-center"
        style={{ backgroundColor: "#010851", minHeight: "80vh" }}
      >
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-4">Create Beautiful Invoices in Minutes</h1>
          <p className="lead mb-5" style={{ fontSize: "1.3rem" }}>
            Stop wrestling with spreadsheets. QuickInvoice helps you create and send invoices instantly.
          </p>
          <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 px-4">
            Generate Your First Invoice
          </button>
          <br />
          <a href="#how-it-works" className="btn btn-lg btn-outline-light rounded-pill my-2 px-4">
            Learn More
          </a>
        </div>
      </header>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold">Get Started in 4 Simple Steps</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-3 d-flex">
              <div className="wavy-card flex-fill">
                <svg className="wavy-bg wave-1" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M0.00,49.98 C137.47,150.00 271.56,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path></svg>
                <div className="wavy-step step-2">1</div>
                <div className="wavy-icon text-primary"><i className="bi bi-person-plus"></i></div>
                <h5 className="fw-bold">Enter Details</h5>
                <p className="small text-muted">Quickly fill your client information, item description, quantities and prices. Our intuitive form makes it a breeze.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex">
              <div className="wavy-card flex-fill">
                <svg className="wavy-bg wave-2" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M0.00,49.98 C137.47,150.00 271.56,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path></svg>
                <div className="wavy-step step-1">2</div>
                <div className="wavy-icon text-success"><i className="bi bi-card-list"></i></div>
                <h5 className="fw-bold">Choose Template</h5>
                <p className="small text-muted">Browse our gallery of professional invoice templates and select the one that fits your brand.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex">
              <div className="wavy-card flex-fill">
                <svg className="wavy-bg wave-3" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M0.00,49.98 C137.47,150.00 271.56,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path></svg>
                <div className="wavy-step step-1">3</div>
                <div className="wavy-icon text-warning"><i className="bi bi-receipt"></i></div>
                <h5 className="fw-bold">Preview Invoice</h5>
                <p className="small text-muted">See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex">
              <div className="wavy-card flex-fill">
                <svg className="wavy-bg wave-4" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M0.00,49.98 C137.47,150.00 271.56,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path></svg>
                <div className="wavy-step step-1">4</div>
                <div className="wavy-icon text-danger"><i className="bi bi-send"></i></div>
                <h5 className="fw-bold">Download & Save</h5>
                <p className="small text-muted">Download your invoice as a PDF, send it directly via email or save it for future reference.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-md-6">
              <img
                src={assets.landing}
                className="img-fluid rounded shadow-lg"
                alt="Invoice Customization"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x350?text=Image+Not+Found";
                }}
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mx-2">Easy to fill invoice details</h3>
              <p className="text-muted lead fs-6 mx-2">Quickly create professional invoices with easy fields and smart calculations.</p>
              <ul className="list-unstyled text-muted mx-2">
                <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Add items with price, quantity & tax</li>
                <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Auto-calculates totals and discounts</li>
                <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Customize invoice theme & layout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE QUICKINVOICE SECTION */}
      <section id="why-choose" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold display-5 mb-4 text-primary">Why Choose QuickInvoice?</h2>

          <div className="row align-items-center gy-4">
            <div className="col-md-6">
              <img
                src={assets.landing}
                alt="Why Choose QuickInvoice"
                className="img-fluid rounded shadow"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
                }}
              />
            </div>

            <div className="col-md-6 text-start">
              <h3 className="fw-bold">Easy to fill invoice details</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <ul className="text-muted list-unstyled">
                <li className="mb-2">✔ Curated list of templates from gallery</li>
                <li className="mb-2">✔ Add your logo and invoice details</li>
                <li className="mb-2">✔ Tailor fields to your needs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-start">
              <h3 className="fw-bold">Beautiful & Easy-to-Use Dashboard</h3>
              <p className="text-muted">A clean dashboard designed to help you focus. No clutter. No confusion.</p>
              <ul className="text-muted list-unstyled">
                <li className="mb-2">✔ Track invoices and payments at a glance</li>
                <li className="mb-2">✔ Clean cards and spacious UI</li>
                <li className="mb-2">✔ Designed for fast input and fewer clicks</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img src={assets.dashboard} alt="QuickInvoice Dashboard" className="img-fluid rounded shadow-lg border" onError={(e) => { e.target.src = "https://via.placeholder.com/900x500?text=Dashboard+Preview"; }} />
            </div>
          </div>
        </div>
      </section>

      {/* INVOICE PREVIEW SECTION */}
      <section id="invoice-preview" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-6 text-start">
              <h3 className="fw-bold">Invoice Preview</h3>
              <p className="text-muted">Take a quick look at your invoice layout before sending — clean, simple and professional.</p>
              <ul className="text-muted list-unstyled">
                <li className="mb-2">✔ Real-time visual preview</li>
                <li className="mb-2">✔ Make final adjustments instantly</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img src={assets.invoicePreview} alt="Invoice Preview" className="img-fluid rounded shadow-lg border" onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Invoice+Preview"; }} />
            </div>
          </div>
        </div>
      </section>

      {/* SEND INVOICES INSTANTLY SECTION */}
      <section id="send-instantly" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-start">
              <h3 className="fw-bold">Send Invoices Instantly</h3>
              <p className="text-muted">Deliver invoices to your clients the moment they are ready. Fast, smooth, and automated.</p>
              <ul className="text-muted list-unstyled">
                <li className="mb-2">✔ Send via email in one click</li>
                <li className="mb-2">✔ Automatic formatting</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img src={assets.sendInvoice} alt="Send Invoice Instantly" className="img-fluid rounded shadow-lg border" onError={(e) => { e.target.src = "https://via.placeholder.com/800x500?text=Send+Invoices+Instantly"; }} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-5 text-white text-center" style={{ backgroundColor: '#0056FF' }}>
        <div className="container">
          <h2 className="fw-bold mb-3 display-6">Ready to Streamline Your Invoicing?</h2>
          <p className="mb-4" style={{ fontSize: '1.1rem' }}>
            Join thousands of freelancers and small businesses who trust QuickInvoice. Start creating professional
            invoices today — it's fast, easy, and effective!
          </p>
          <button className="btn btn-warning btn-lg fw-bold rounded-pill px-4">
            Start Generating Invoices Now
          </button>
          <p className="mt-3 small opacity-75">(This will lead to the invoice generation interface)</p>
        </div>
      </footer>

      {/* DARK BOTTOM FOOTER */}
      <footer className="py-4 text-white" style={{ backgroundColor: '#0B0F19' }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          <div className="mb-3 mb-md-0 d-flex align-items-center gap-2">
            <img src={assets.logo || "https://via.placeholder.com/40"} alt="Logo" width="40" height="40" className="me-2" />
            <span className="fw-bold">QuickInvoice</span>
          </div>

          <p className="mb-3 mb-md-0 small opacity-75">© 2025 QuickInvoice. All rights reserved.</p>

          <div className="d-flex gap-3">
            <a href="#" className="text-white fs-5"><Twitter /></a>
            <a href="#" className="text-white fs-5"><Facebook /></a>
            <a href="#" className="text-white fs-5"><Instagram /></a>
            <a href="#" className="text-white fs-5"><Linkedin /></a>
          </div>
        </div>
      </footer>

    </>
  );
};

export default LandingPage;
