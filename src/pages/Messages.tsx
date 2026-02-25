import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Users, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { MOCK_LEADS } from '../lib/mockData';
import { cn } from '../lib/utils';
import { useToast, ToastContainer } from '../components/Toast';

export default function Messages() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'broadcast'>('inbox');
  const [selectedChat, setSelectedChat] = useState<string | null>(MOCK_LEADS[0].id);
  const [messageText, setMessageText] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [broadcastHistory, setBroadcastHistory] = useState<{id: string, message: string, audience: string, date: string, count: number}[]>([]);
  const { toasts, addToast, removeToast } = useToast();

  const getRecipients = () => {
    switch (selectedAudience) {
      case 'hot':
        return MOCK_LEADS.filter(l => ['Negotiation', 'Qualified'].includes(l.status));
      case 'new':
        return MOCK_LEADS.filter(l => l.status === 'New');
      default:
        return MOCK_LEADS;
    }
  };

  const recipients = getRecipients();

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    addToast('Pesan terkirim!', 'success');
    setMessageText('');
  };

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    
    setIsSending(true);
    setSendingProgress(0);

    // Simulate sending process
    const totalSteps = 100;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 5;
      setSendingProgress(currentStep);

      if (currentStep >= 100) {
        clearInterval(interval);
        setIsSending(false);
        setSendingProgress(0);
        
        // Add to history
        const newBroadcast = {
          id: Math.random().toString(36).substr(2, 9),
          message: broadcastMessage,
          audience: selectedAudience === 'all' ? 'Semua Leads' : selectedAudience === 'hot' ? 'Hot Leads' : 'Leads Baru',
          date: new Date().toLocaleString(),
          count: recipients.length
        };
        setBroadcastHistory([newBroadcast, ...broadcastHistory]);
        
        addToast(`Broadcast berhasil dikirim ke ${recipients.length} kontak!`, 'success');
        setBroadcastMessage('');
      }
    }, 100);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('inbox')}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === 'inbox' 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              Inbox
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === 'broadcast' 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              Broadcast
            </button>
          </div>
          
          {activeTab === 'inbox' && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari pesan..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'inbox' ? (
            <div className="divide-y divide-slate-100">
              {MOCK_LEADS.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedChat(lead.id)}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-slate-50 transition-colors",
                    selectedChat === lead.id ? "bg-emerald-50/50" : ""
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-slate-900">{lead.name}</h4>
                    <span className="text-xs text-slate-400">10:30</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    Halo, apakah properti di BSD masih tersedia? Saya ingin survey weekend ini.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-900 flex items-center mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  Target Audience
                </h4>
                <p className="text-sm text-blue-700">
                  Pilih grup kontak untuk mengirim pesan massal via WhatsApp.
                </p>
              </div>

              {broadcastHistory.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Riwayat Broadcast</h4>
                  <div className="space-y-3">
                    {broadcastHistory.map((history) => (
                      <div key={history.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium text-slate-700">{history.audience}</span>
                          <span className="text-[10px] text-slate-400">{history.date.split(',')[0]}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">{history.message}</p>
                        <div className="flex items-center text-[10px] text-emerald-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terkirim ke {history.count} kontak
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-50/50">
        {activeTab === 'inbox' ? (
          <>
            {/* Chat Header */}
            <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-3">
                  {MOCK_LEADS.find(l => l.id === selectedChat)?.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">
                    {MOCK_LEADS.find(l => l.id === selectedChat)?.name}
                  </h3>
                  <p className="text-xs text-emerald-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                    Online via WhatsApp
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-md shadow-sm">
                  <p className="text-sm">Halo Pak Ahmad, terima kasih sudah menghubungi kami. Properti di BSD masih tersedia.</p>
                  <span className="text-[10px] text-emerald-100 block text-right mt-1">10:25</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white text-slate-700 px-4 py-2 rounded-2xl rounded-tl-none max-w-md shadow-sm border border-slate-100">
                  <p className="text-sm">Halo, apakah properti di BSD masih tersedia? Saya ingin survey weekend ini.</p>
                  <span className="text-[10px] text-slate-400 block mt-1">10:30</span>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik pesan..."
                  className="flex-1 py-2 px-4 bg-slate-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 p-8 flex flex-col items-center justify-center overflow-y-auto">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6 mx-auto">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">WhatsApp Broadcast</h2>
              <p className="text-center text-slate-500 mb-8">
                Kirim pesan promosi ke banyak kontak sekaligus.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pilih Audience
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    disabled={isSending}
                  >
                    <option value="all">Semua Leads ({MOCK_LEADS.length})</option>
                    <option value="hot">Hot Leads ({MOCK_LEADS.filter(l => ['Negotiation', 'Qualified'].includes(l.status)).length})</option>
                    <option value="new">Leads Baru ({MOCK_LEADS.filter(l => l.status === 'New').length})</option>
                  </select>
                  
                  {/* Recipient Preview */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recipients.slice(0, 5).map(recipient => (
                      <span key={recipient.id} className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
                        {recipient.name}
                      </span>
                    ))}
                    {recipients.length > 5 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-500">
                        +{recipients.length - 5} lainnya
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pesan Broadcast
                  </label>
                  <textarea
                    rows={4}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Tulis pesan promosi Anda di sini..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    disabled={isSending}
                  />
                  <p className="text-xs text-slate-500 mt-1 text-right">
                    {broadcastMessage.length} karakter
                  </p>
                </div>

                {isSending ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Mengirim pesan...</span>
                      <span>{sendingProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${sendingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleSendBroadcast}
                    disabled={!broadcastMessage.trim() || recipients.length === 0}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Broadcast WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
