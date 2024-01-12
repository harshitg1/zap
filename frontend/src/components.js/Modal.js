// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, invoice }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed bg-white inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className=" p-8 rounded shadow-md z-50">
            <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
            {invoice && (
              <div>
                <p className="text-lg font-semibold mb-2">{invoice.title}</p>
                <p className="text-gray-600">${invoice.amount.toFixed(2)}</p>
                <p className="text-gray-500">Due Date: {invoice.dueDate}</p>
                <p className="text-gray-500">Recipient: {invoice.recipient}</p>
              </div>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
