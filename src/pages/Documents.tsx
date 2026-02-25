import React, { useState } from 'react';
import { FileText, Upload, Share2, Download, Trash2, FolderOpen, Search, MoreVertical } from 'lucide-react';
import { MOCK_PROPERTIES, MOCK_DOCUMENTS } from '../lib/mockData';
import { cn } from '../lib/utils';
import { useToast, ToastContainer } from '../components/Toast';

export default function Documents() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(MOCK_PROPERTIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, addToast, removeToast } = useToast();

  const selectedProperty = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId);
  const documents = MOCK_DOCUMENTS.filter(d => d.propertyId === selectedPropertyId);

  const handleShare = (docTitle: string) => {
    addToast(`Link dokumen "${docTitle}" berhasil disalin!`, 'success');
  };

  const handleUpload = () => {
    addToast('Fitur upload sedang diproses...', 'info');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Property List Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Pilih Properti</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari properti..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_PROPERTIES
            .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((property) => (
            <button
              key={property.id}
              onClick={() => setSelectedPropertyId(property.id)}
              className={cn(
                "w-full text-left p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center gap-3",
                selectedPropertyId === property.id ? "bg-emerald-50 border-emerald-100" : ""
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                <img src={property.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className={cn(
                  "text-sm font-medium truncate",
                  selectedPropertyId === property.id ? "text-emerald-900" : "text-slate-900"
                )}>
                  {property.title}
                </h4>
                <p className="text-xs text-slate-500 truncate">{property.address}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
        {selectedProperty ? (
          <>
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <FolderOpen className="w-6 h-6 text-emerald-600" />
                  Dokumen Properti
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {selectedProperty.title}
                </p>
              </div>
              <button 
                onClick={handleUpload}
                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Dokumen
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow group bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn(
                          "p-3 rounded-lg",
                          doc.type === 'PDF' ? "bg-red-50 text-red-600" :
                          doc.type === 'Image' ? "bg-blue-50 text-blue-600" :
                          doc.type === 'Word' ? "bg-blue-50 text-blue-800" :
                          "bg-slate-50 text-slate-600"
                        )}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <h4 className="font-medium text-slate-900 mb-1 truncate" title={doc.title}>
                        {doc.title}
                      </h4>
                      <div className="flex items-center text-xs text-slate-500 mb-4 space-x-2">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-50">
                        <button 
                          onClick={() => handleShare(doc.title)}
                          className="flex-1 flex items-center justify-center py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5 mr-1.5" />
                          Share
                        </button>
                        <button className="flex items-center justify-center p-2 text-slate-400 bg-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <FolderOpen className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-lg font-medium text-slate-600">Belum ada dokumen</p>
                  <p className="text-sm">Upload dokumen terkait properti ini.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p>Pilih properti untuk melihat dokumen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
