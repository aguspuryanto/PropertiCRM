import React, { useState } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Maximize, Plus, X, Upload, Camera, Phone, Edit, Trash2 } from 'lucide-react';
import { MOCK_PROPERTIES, Property } from '../lib/mockData';
import { cn } from '../lib/utils';
import { useToast, ToastContainer } from '../components/Toast';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const defaultFormData = {
    title: '',
    type: 'Rumah',
    address: '',
    landArea: '',
    buildingArea: '',
    direction: 'utara',
    bedrooms: '',
    bathrooms: '',
    floors: '1',
    certificateStatus: '',
    water: '',
    electricity: '',
    price: '',
    phone: ''
  };

  const [formData, setFormData] = useState(defaultFormData);

  const filteredProperties = properties.filter(p => {
    const matchesFilter = filter === 'All' || p.type === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenModal = (property?: Property) => {
    if (property) {
      setEditingPropertyId(property.id);
      setFormData({
        ...defaultFormData,
        title: property.title,
        type: property.type,
        address: property.address,
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        buildingArea: property.area.toString(),
        price: (property.price / 1000000).toString(), // Convert to JT
      });
    } else {
      setEditingPropertyId(null);
      setFormData(defaultFormData);
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus listing ini?')) {
      setProperties(properties.filter(p => p.id !== id));
      addToast('Listing properti berhasil dihapus!', 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty: Property = {
      id: editingPropertyId || Math.random().toString(36).substr(2, 9),
      title: formData.title || `${formData.type} di ${formData.address.split(',')[0]}`,
      address: formData.address,
      price: Number(formData.price) * 1000000, // Convert from JT
      type: formData.type as any,
      status: 'Available',
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      area: Number(formData.buildingArea) || 0,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800&q=80',
      agentId: 'a1'
    };

    if (editingPropertyId) {
      setProperties(properties.map(p => p.id === editingPropertyId ? { ...p, ...newProperty } : p));
      addToast('Listing properti berhasil diperbarui!', 'success');
    } else {
      setProperties([newProperty, ...properties]);
      addToast('Listing properti berhasil ditambahkan!', 'success');
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari properti, lokasi..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {['All', 'Rumah', 'Apartemen', 'Tanah', 'Ruko'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                filter === type 
                  ? "bg-emerald-600 text-white" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              {type}
            </button>
          ))}
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors ml-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Listing
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-slate-900">{editingPropertyId ? 'Edit Listing Properti' : 'Tambah Listing Properti'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Listing</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Rumah Minimalis Modern di BSD"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe Properti</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Rumah">Rumah</option>
                    <option value="Apartemen">Apartemen</option>
                    <option value="Tanah">Tanah</option>
                    <option value="Ruko">Ruko</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Lokasi</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">1. Luas Tanah (m2)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.landArea}
                    onChange={(e) => setFormData({...formData, landArea: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">2. Luas Bangunan (m2)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.buildingArea}
                    onChange={(e) => setFormData({...formData, buildingArea: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">3. Arah Rumah</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.direction}
                    onChange={(e) => setFormData({...formData, direction: e.target.value})}
                  >
                    <option value="utara">Utara</option>
                    <option value="selatan">Selatan</option>
                    <option value="timur">Timur</option>
                    <option value="barat">Barat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">4. Kamar Tidur</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">5. Kamar Mandi</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">6. Berapa Lantai</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.floors}
                    onChange={(e) => setFormData({...formData, floors: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">7. Status Surat</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: sertifikat SHM pribadi"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.certificateStatus}
                    onChange={(e) => setFormData({...formData, certificateStatus: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">8. Air</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: sumur dan pdam"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.water}
                    onChange={(e) => setFormData({...formData, water: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">9. Listrik (kwh)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.electricity}
                    onChange={(e) => setFormData({...formData, electricity: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">10. Jual (JT)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="number" 
                      required
                      className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">JT</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Telp / WA</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Upload Foto Properti (Maks 3)</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 cursor-pointer transition-all bg-slate-50">
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="text-xs font-medium">Foto {i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                >
                  Simpan Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <span className={cn(
                  "px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-center",
                  property.status === 'Available' ? "bg-emerald-500 text-white" :
                  property.status === 'Sold' ? "bg-red-500 text-white" :
                  "bg-amber-500 text-white"
                )}>
                  {property.status}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(property)}
                    className="p-1.5 bg-white text-slate-700 hover:text-blue-600 rounded-md shadow-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="p-1.5 bg-white text-slate-700 hover:text-red-600 rounded-md shadow-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-bold text-lg">
                  Rp {(property.price / 1000000000).toFixed(1)} M
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-1 truncate">{property.title}</h3>
              <div className="flex items-start text-slate-500 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{property.address}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-slate-400 mb-1">
                    <Bed className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{property.bedrooms} KT</span>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100">
                  <div className="flex items-center text-slate-400 mb-1">
                    <Bath className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{property.bathrooms} KM</span>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100">
                  <div className="flex items-center text-slate-400 mb-1">
                    <Maximize className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{property.area} m²</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
