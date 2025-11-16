const MainPage = () => {
    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        Editable text box for title
                    </div>
                </div>
                {/* Invoice form and template grid */}
                <div className="row g-4 align-items stretch">
                    {/* Invoice Form Section */}
                        <div className="col-12 col-lg-6 d-flex">
                            <div className="bg-white border rounded shadow-sm p-4 w-100">
                                Invoice Form
                            </div>
                        </div>
                    {/* Invoice Template Section */}
                        <div className="col-12 col-lg-6 d-flex">
                            <div className="bg-white border rounded shadow-sm p-4 w-100">
                                Template Grid
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default MainPage;