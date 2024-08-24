import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdError, MdCheckCircle } from "react-icons/md";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (type, message) => {
    if (type === "error") {
      toast.error(
        <div className="flex items-center">
          <MdError className="text-red-500 mr-2" size={24} />
          {message}
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: "#E57373",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          },
        }
      );
    } else if (type === "success") {
      toast.success(
        <div className="flex items-center">
          <MdCheckCircle className="text-green-500 mr-2" size={24} />
          {message}
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          },
        }
      );
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
