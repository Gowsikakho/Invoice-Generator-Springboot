import { templates } from "../assets/assets.js";

const TemplateGrid = ({ onTemplateClick }) => {
    const handleKeyPress = (e, id) => {
        if (e.key === "Enter") onTemplateClick(id);
    };

    return (
        <div className="row g-3">
            {templates.map(({ id, label, image }) => (
                <div key={id} className="col-12 col-sm-6 col-lg-4">
                    <div
                        className="border rounded shadow-sm overflow-hidden template-hover"
                        title={label}
                        role="button"
                        tabIndex={0}
                        onClick={() => onTemplateClick(id)}
                        onKeyPress={(e) => handleKeyPress(e, id)}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={image}
                            alt={label}
                            className="w-100 img-fluid"
                            loading="lazy"
                        />
                        <div className="p-2 text-center fw-medium">{label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemplateGrid;
