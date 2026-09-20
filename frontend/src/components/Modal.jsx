import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from './Skeletons';

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'confirm',
    isDestructive = false,
    defaultValue = ''
}) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setInputValue(defaultValue);
            setIsProcessing(false);
        }
    }, [isOpen, defaultValue]);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsProcessing(true);
        try {
            if (type === 'prompt') {
                await onConfirm(inputValue);
            } else {
                await onConfirm();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
            onClose();
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-surface-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border-subtle">
                <div className="p-space-lg">
                    <h3 className="font-headline-sm text-headline-sm text-text-primary mb-2">{title}</h3>
                    {message && <p className="font-body-md text-body-md text-text-secondary mb-6">{message}</p>}

                    {type === 'prompt' && (
                        <div className="mb-6">
                            <input
                                type="text"
                                className="w-full h-11 px-4 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-border-subtle"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg font-label-md text-label-md text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isProcessing}
                            className={`px-5 py-2.5 rounded-lg font-label-md text-label-md text-on-primary transition-colors flex items-center justify-center ${isDestructive ? 'bg-status-rejected hover:bg-red-600' : 'bg-primary hover:bg-primary-fixed-dim'} ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? (
                                <Spinner />
                            ) : (
                                type === 'prompt' ? 'Submit' : 'Confirm'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
