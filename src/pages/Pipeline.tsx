import React from 'react';
import { MoreHorizontal, Phone, MessageCircle, Calendar } from 'lucide-react';
import { MOCK_LEADS } from '../lib/mockData';
import { cn } from '../lib/utils';

const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed'];

export default function Pipeline() {
  return (
    <div className="h-[calc(100vh-8rem)] overflow-x-auto">
      <div className="flex gap-6 min-w-max h-full pb-4">
        {STAGES.map((stage) => {
          const leadsInStage = MOCK_LEADS.filter(l => l.status === stage);
          
          return (
            <div key={stage} className="w-80 flex flex-col bg-slate-100 rounded-xl p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-semibold text-slate-700 flex items-center">
                  {stage}
                  <span className="ml-2 bg-slate-200 text-slate-600 text-xs py-0.5 px-2 rounded-full">
                    {leadsInStage.length}
                  </span>
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {leadsInStage.map((lead) => (
                  <div key={lead.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900">{lead.name}</h4>
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                        lead.source === 'WhatsApp' ? "bg-green-100 text-green-700" :
                        lead.source === 'Instagram' ? "bg-pink-100 text-pink-700" :
                        "bg-blue-100 text-blue-700"
                      )}>
                        {lead.source}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">
                      Minat: {lead.interest}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-700 font-bold border-2 border-white">
                          AG
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {leadsInStage.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                    Kosong
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
