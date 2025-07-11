import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/SubHeader.css";

const SubHeader = ({ title, description, icon, onBack }) => {
  return (
    <div className="subheader shadow-sm">
      <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between py-2 px-2">
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <button onClick={onBack}>
            <FaArrowLeft /> Back
          </button>

          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              {icon && <span className="subheader-icon">{icon}</span>}
              <h5 className="mb-0 subheader-title">{title}</h5>
            </div>
            {description && (
              <small className="subheader-desc">{description}</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
