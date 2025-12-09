import React from "react";
import "../../assets/styles/Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Si solo hay 1 página, no mostramos nada para limpiar la vista
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((pageIndex) => (
        <button
          key={pageIndex}
          onClick={() => onPageChange(pageIndex)}
          className={`page-link ${pageIndex === currentPage ? "active" : ""}`}
          style={{
            // Estilos en línea por si no quieres tocar el CSS, 
            // pero idealmente esto iría en Pagination.css
            padding: "8px 16px",
            margin: "0 4px",
            border: "1px solid #ddd",
            background: pageIndex === currentPage ? "var(--primary)" : "white",
            color: pageIndex === currentPage ? "white" : "var(--text-dark)",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {pageIndex + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;