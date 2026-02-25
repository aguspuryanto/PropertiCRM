export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: 'Rumah' | 'Apartemen' | 'Tanah' | 'Ruko';
  status: 'Available' | 'Sold' | 'Rented';
  bedrooms: number;
  bathrooms: number;
  area: number; // m2
  image: string;
  agentId: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'WhatsApp' | 'Instagram' | 'Website' | 'Walk-in';
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
  interest: string; // Property ID or generic interest
  assignedAgentId: string;
  lastContact: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  activeListings: number;
  closedDeals: number;
  revenue: number;
  location: { lat: number; lng: number }; // Mock location
}

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'Budi Santoso',
    email: 'budi@properticrm.id',
    phone: '+6281234567890',
    photo: 'https://i.pravatar.cc/150?u=a1',
    activeListings: 12,
    closedDeals: 45,
    revenue: 1500000000,
    location: { lat: -6.2088, lng: 106.8456 }
  },
  {
    id: 'a2',
    name: 'Siti Aminah',
    email: 'siti@properticrm.id',
    phone: '+6281234567891',
    photo: 'https://i.pravatar.cc/150?u=a2',
    activeListings: 8,
    closedDeals: 32,
    revenue: 980000000,
    location: { lat: -6.2200, lng: 106.8200 }
  },
  {
    id: 'a3',
    name: 'Rizky Pratama',
    email: 'rizky@properticrm.id',
    phone: '+6281234567892',
    photo: 'https://i.pravatar.cc/150?u=a3',
    activeListings: 15,
    closedDeals: 28,
    revenue: 850000000,
    location: { lat: -6.1900, lng: 106.8300 }
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Rumah Minimalis Modern di BSD',
    address: 'Jl. Anggrek No. 12, BSD City, Tangerang',
    price: 2500000000,
    type: 'Rumah',
    status: 'Available',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800&q=80',
    agentId: 'a1'
  },
  {
    id: 'p2',
    title: 'Apartemen Mewah Sudirman View',
    address: 'Jl. Jend. Sudirman Kav. 50, Jakarta Pusat',
    price: 3800000000,
    type: 'Apartemen',
    status: 'Available',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    agentId: 'a2'
  },
  {
    id: 'p3',
    title: 'Tanah Kavling Siap Bangun',
    address: 'Jl. Raya Bogor KM 30, Depok',
    price: 800000000,
    type: 'Tanah',
    status: 'Available',
    bedrooms: 0,
    bathrooms: 0,
    area: 200,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    agentId: 'a3'
  },
  {
    id: 'p4',
    title: 'Ruko Strategis Kelapa Gading',
    address: 'Jl. Boulevard Raya, Kelapa Gading, Jakarta Utara',
    price: 5500000000,
    type: 'Ruko',
    status: 'Sold',
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    agentId: 'a1'
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Ahmad Dhani',
    email: 'ahmad@gmail.com',
    phone: '081299998888',
    source: 'WhatsApp',
    status: 'New',
    interest: 'Rumah di BSD',
    assignedAgentId: 'a1',
    lastContact: '2023-10-25T10:00:00'
  },
  {
    id: 'l2',
    name: 'Maya Estianty',
    email: 'maya@yahoo.com',
    phone: '081277776666',
    source: 'Instagram',
    status: 'Negotiation',
    interest: 'p2',
    assignedAgentId: 'a2',
    lastContact: '2023-10-24T14:30:00'
  },
  {
    id: 'l3',
    name: 'Mulan Jameela',
    email: 'mulan@hotmail.com',
    phone: '081255554444',
    source: 'Website',
    status: 'Qualified',
    interest: 'Tanah Depok',
    assignedAgentId: 'a3',
    lastContact: '2023-10-23T09:15:00'
  },
  {
    id: 'l4',
    name: 'Al Ghazali',
    email: 'al@gmail.com',
    phone: '081233332222',
    source: 'Walk-in',
    status: 'Closed',
    interest: 'p4',
    assignedAgentId: 'a1',
    lastContact: '2023-10-20T16:45:00'
  }
];

export interface Task {
  id: string;
  title: string;
  type: 'Survey' | 'Meeting' | 'Follow-up' | 'Call';
  date: string; // ISO string
  status: 'Pending' | 'Completed';
  agentId: string;
  leadId?: string;
}

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Survey Rumah BSD dengan Ahmad Dhani',
    type: 'Survey',
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Tomorrow
    status: 'Pending',
    agentId: 'a1',
    leadId: 'l1'
  },
  {
    id: 't2',
    title: 'Meeting Negosiasi Maya Estianty',
    type: 'Meeting',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // Day after tomorrow
    status: 'Pending',
    agentId: 'a2',
    leadId: 'l2'
  },
  {
    id: 't3',
    title: 'Follow-up Leads Baru',
    type: 'Follow-up',
    date: new Date().toISOString(), // Today
    status: 'Pending',
    agentId: 'a3'
  },
  {
    id: 't4',
    title: 'Call Mulan Jameela',
    type: 'Call',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
    status: 'Completed',
    agentId: 'a3',
    leadId: 'l3'
  }
];

export interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'Image' | 'Word' | 'Other';
  size: string;
  uploadDate: string;
  propertyId: string;
  url: string;
}

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'd1',
    title: 'Sertifikat Hak Milik (SHM)',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2023-10-01',
    propertyId: 'p1',
    url: '#'
  },
  {
    id: 'd2',
    title: 'Denah Lantai 1',
    type: 'Image',
    size: '1.2 MB',
    uploadDate: '2023-10-02',
    propertyId: 'p1',
    url: '#'
  },
  {
    id: 'd3',
    title: 'PBB 2023',
    type: 'PDF',
    size: '0.8 MB',
    uploadDate: '2023-09-15',
    propertyId: 'p2',
    url: '#'
  },
  {
    id: 'd4',
    title: 'Perjanjian Sewa',
    type: 'Word',
    size: '0.5 MB',
    uploadDate: '2023-08-20',
    propertyId: 'p4',
    url: '#'
  }
];

export interface Comparable {
  id: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  soldDate: string;
  type: 'Rumah' | 'Apartemen' | 'Tanah' | 'Ruko';
  location: string; // e.g., "BSD", "Jakarta Pusat"
}

export const MOCK_COMPARABLES: Comparable[] = [
  {
    id: 'c1',
    address: 'Jl. Anggrek No. 10, BSD City',
    price: 2400000000,
    area: 115,
    bedrooms: 3,
    soldDate: '2023-09-01',
    type: 'Rumah',
    location: 'BSD'
  },
  {
    id: 'c2',
    address: 'Jl. Mawar No. 5, BSD City',
    price: 2600000000,
    area: 125,
    bedrooms: 3,
    soldDate: '2023-08-15',
    type: 'Rumah',
    location: 'BSD'
  },
  {
    id: 'c3',
    address: 'Apartemen Sudirman Park',
    price: 3500000000,
    area: 80,
    bedrooms: 2,
    soldDate: '2023-09-10',
    type: 'Apartemen',
    location: 'Jakarta Pusat'
  },
  {
    id: 'c4',
    address: 'Thamrin Residence',
    price: 4000000000,
    area: 90,
    bedrooms: 2,
    soldDate: '2023-08-25',
    type: 'Apartemen',
    location: 'Jakarta Pusat'
  }
];
