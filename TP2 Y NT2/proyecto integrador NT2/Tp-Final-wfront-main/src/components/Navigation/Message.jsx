import React from "react";

const Message = ({ text, type }) => {
  const getMessageStyle = () => {
    // Estilos base
    const baseStyle = {
      padding: "1rem",
      margin: "1rem 0",
      borderRadius: "8px",
      fontWeight: "500",
      textAlign: "center",
      border: "1px solid transparent",
    };

    if (type === "success") {
      return {
        ...baseStyle,
        color: "#155724",
        backgroundColor: "#d4edda",
        borderColor: "#c3e6cb",
      };
    } else if (type === "error") {
      return {
        ...baseStyle,
        color: "#721c24",
        backgroundColor: "#f8d7da",
        borderColor: "#f5c6cb",
      };
    }

    // Default (Info)
    return {
      ...baseStyle,
      color: "#0c5460",
      backgroundColor: "#d1ecf1",
      borderColor: "#bee5eb",
    };
  };

  if (!text) return null;

  return <div style={getMessageStyle()}>{text}</div>;
};

export default Message;