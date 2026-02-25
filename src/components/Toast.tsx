import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export function ToastContainer({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-center p-4 rounded-lg shadow-lg text-white min-w-[300px] animate-in slide-in-from-right-full duration-300",
            toast.type === 'success' ? "bg-emerald-600" :
            toast.type === 'error' ? "bg-red-600" :
            "bg-blue-600"
          )}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 mr-3" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 mr-3" />}
          {toast.type === 'info' && <Info className="w-5 h-5 mr-3" />}
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="ml-3 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
