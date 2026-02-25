import React from 'react';
import { MapPin, Phone, Mail, Award } from 'lucide-react';
import { MOCK_AGENTS } from '../lib/mockData';

export default function Agents() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Agent List */}
      <div className="w-full lg:w-1/3 overflow-y-auto space-y-4">
        {MOCK_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-500 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <img src={agent.photo} alt={agent.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{agent.name}</h3>
                <div className="flex items-center text-slate-500 text-xs mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Sedang di Lokasi Survey</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-lg font-bold text-emerald-600">{agent.closedDeals}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">Deals</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-50">
              <button className="flex items-center justify-center py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </button>
              <button className="flex items-center justify-center py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Map Simulation */}
      <div className="flex-1 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Jakarta_location_map.svg')] bg-cover bg-center opacity-50">
          {/* Map is simulated with an image background */}
        </div>
        
        {/* Simulated Pins */}
        {MOCK_AGENTS.map((agent, idx) => (
          <div 
            key={agent.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ 
              top: `${40 + (idx * 15)}%`, 
              left: `${40 + (idx * 20)}%` 
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden animate-bounce">
                <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {agent.name}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
          <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Live Tracking</h4>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-slate-700">3 Agen Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
}
