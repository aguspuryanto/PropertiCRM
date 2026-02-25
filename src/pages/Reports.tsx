import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
import { MOCK_AGENTS } from '../lib/mockData';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000, target: 3500 },
  { name: 'Feb', revenue: 3000, target: 3500 },
  { name: 'Mar', revenue: 2000, target: 3500 },
  { name: 'Apr', revenue: 2780, target: 4000 },
  { name: 'May', revenue: 1890, target: 4000 },
  { name: 'Jun', revenue: 2390, target: 4000 },
  { name: 'Jul', revenue: 3490, target: 4500 },
  { name: 'Aug', revenue: 4200, target: 4500 },
  { name: 'Sep', revenue: 3800, target: 4500 },
  { name: 'Oct', revenue: 5100, target: 5000 },
];

const PROPERTY_TYPE_DATA = [
  { name: 'Rumah', value: 45 },
  { name: 'Apartemen', value: 30 },
  { name: 'Ruko', value: 15 },
  { name: 'Tanah', value: 10 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Laporan Kinerja</h2>
          <p className="text-slate-500 text-sm">Analisis detail performa penjualan dan agen.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Calendar className="w-4 h-4 mr-2" />
            Bulan Ini
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Revenue vs Target Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Pendapatan vs Target (2023)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" name="Pendapatan" />
              <Area type="monotone" dataKey="target" stroke="#64748B" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorTarget)" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Performa Agen</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Agen</th>
                  <th className="px-4 py-3">Deals</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_AGENTS.map((agent) => (
                  <tr key={agent.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center">
                      <img src={agent.photo} alt="" className="w-6 h-6 rounded-full mr-2" />
                      {agent.name}
                    </td>
                    <td className="px-4 py-3">{agent.closedDeals}</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">
                      Rp {(agent.revenue / 1000000).toFixed(0)} Jt
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Excellent
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Distribusi Penjualan per Tipe</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROPERTY_TYPE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                <Tooltip cursor={{ fill: '#F1F5F9' }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
