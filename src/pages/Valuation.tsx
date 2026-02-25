import React, { useState } from 'react';
import { Calculator, MapPin, Home, DollarSign, Info } from 'lucide-react';
import { MOCK_COMPARABLES } from '../lib/mockData';
import { cn } from '../lib/utils';

export default function Valuation() {
  const [formData, setFormData] = useState({
    location: 'BSD',
    type: 'Rumah',
    area: 120,
    bedrooms: 3,
    bathrooms: 2
  });
  
  const [valuation, setValuation] = useState<number | null>(null);
  const [comparables, setComparables] = useState<typeof MOCK_COMPARABLES>([]);

  const handleCalculate = () => {
    // Simple mock valuation logic
    // Filter comparables by location and type
    const relevantComps = MOCK_COMPARABLES.filter(
      c => c.location === formData.location && c.type === formData.type
    );

    if (relevantComps.length === 0) {
      setValuation(0); // No data
      setComparables([]);
      return;
    }

    // Calculate average price per sqm
    const totalAvgPricePerSqm = relevantComps.reduce((acc, curr) => acc + (curr.price / curr.area), 0);
    const avgPricePerSqm = totalAvgPricePerSqm / relevantComps.length;

    // Estimated value = avg price/sqm * area
    const estimatedValue = avgPricePerSqm * formData.area;

    setValuation(estimatedValue);
    setComparables(relevantComps);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Penilaian Properti Otomatis</h2>
            <p className="text-slate-500 text-sm">Estimasi nilai pasar berdasarkan data penjualan properti serupa.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi (Area)</label>
              <select 
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                <option value="BSD">BSD City</option>
                <option value="Jakarta Pusat">Jakarta Pusat</option>
                <option value="Depok">Depok</option>
                <option value="Jakarta Utara">Jakarta Utara</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Properti</label>
              <select 
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Rumah">Rumah</option>
                <option value="Apartemen">Apartemen</option>
                <option value="Tanah">Tanah</option>
                <option value="Ruko">Ruko</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Luas Bangunan (m²)</label>
              <input 
                type="number"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: Number(e.target.value)})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kamar Tidur</label>
                <input 
                  type="number"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kamar Mandi</label>
                <input 
                  type="number"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: Number(e.target.value)})}
                />
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors mt-4"
            >
              Hitung Estimasi Nilai
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center items-center text-center">
            {valuation !== null ? (
              valuation > 0 ? (
                <>
                  <h3 className="text-slate-500 font-medium mb-2">Estimasi Nilai Pasar</h3>
                  <p className="text-4xl font-bold text-emerald-600 mb-4">
                    Rp {(valuation / 1000000000).toFixed(2)} M
                  </p>
                  <div className="text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-200 w-full">
                    <div className="flex justify-between mb-1">
                      <span>Harga per m²:</span>
                      <span className="font-semibold">Rp {((valuation / formData.area) / 1000000).toFixed(1)} Jt</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Akurasi:</span>
                      <span className="font-semibold text-emerald-600">High (85%)</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-slate-400">
                  <Info className="w-12 h-12 mx-auto mb-2" />
                  <p>Data pembanding tidak cukup untuk lokasi/tipe ini.</p>
                </div>
              )
            ) : (
              <div className="text-slate-400">
                <Home className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Masukkan detail properti dan klik tombol hitung untuk melihat estimasi.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {valuation !== null && valuation > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Properti Pembanding (Comparables)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Alamat</th>
                  <th className="px-4 py-3">Harga Jual</th>
                  <th className="px-4 py-3">Luas</th>
                  <th className="px-4 py-3">Kamar</th>
                  <th className="px-4 py-3 rounded-r-lg">Tanggal Terjual</th>
                </tr>
              </thead>
              <tbody>
                {comparables.map((comp) => (
                  <tr key={comp.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{comp.address}</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">
                      Rp {(comp.price / 1000000000).toFixed(2)} M
                    </td>
                    <td className="px-4 py-3">{comp.area} m²</td>
                    <td className="px-4 py-3">{comp.bedrooms}</td>
                    <td className="px-4 py-3 text-slate-500">{comp.soldDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
