import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success', duration = 3000) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), duration);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`fixed bottom-space-xl right-space-lg bg-surface-elevated border border-surface-container-high rounded-lg p-space-md shadow-lg text-text-primary z-50 flex items-center gap-space-sm border-l-4 animate-fade-in-up ${toast.type === 'error' ? 'border-l-status-rejected' : 'border-l-status-accepted'}`}>
                    <span className={`material-symbols-outlined ${toast.type === 'error' ? 'text-status-rejected' : 'text-status-accepted'}`}>
                        {toast.type === 'error' ? 'error' : 'check_circle'}
                    </span>
                    <span className="font-label-md text-label-md px-1">{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    );
};
