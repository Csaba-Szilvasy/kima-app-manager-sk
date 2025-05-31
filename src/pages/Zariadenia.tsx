
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Wrench,
  Calendar,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';

const mockZariadenia = [
  {
    id: 1,
    nazov: "Klimatizácia Samsung AR12",
    model: "AR12TXHQASINEU",
    serioveeCislo: "SN240150012",
    typ: "Split klimatizácia",
    vykon: "3.5 kW",
    zakaznik: "HVAC Solutions s.r.o.",
    adresa: "Priemyselná 15, Bratislava",
    datumInshalacie: "2023-06-15",
    zaruka: "2025-06-15",
    poslednyServis: "2024-01-10",
    dalsiServis: "2024-07-10",
    stav: "Aktívne",
    pocetServisov: 3,
    poznamky: "Pravidelná údržba každých 6 mesiacov"
  },
  {
    id: 2,
    nazov: "VRV systém Daikin",
    model: "RXYSQ8T8V1B",
    serioveeCislo: "DK240280045",
    typ: "VRV systém",
    vykon: "22.4 kW",
    zakaznik: "TechnoClima SK s.r.o.",
    adresa: "Technická 42, Košice",
    datumInshalacie: "2023-03-20",
    zaruka: "2028-03-20",
    poslednyServis: "2023-12-15",
    dalsiServis: "2024-06-15",
    stav: "Servis potrebný",
    pocetServisov: 2,
    poznamky: "Upozornenie: Potrebná výmena filtrov"
  },
  {
    id: 3,
    nazov: "Klimatizácia LG Dual Cool",
    model: "S12EQ.NSJ",
    serioveeCislo: "LG240190078",
    typ: "Split klimatizácia", 
    vykon: "3.5 kW",
    zakaznik: "Rodinný dom - Kováč",
    adresa: "Slnečná 8, Trnava",
    datumInshalacie: "2023-08-22",
    zaruka: "2025-08-22",
    poslednyServis: "2024-01-18",
    dalsiServis: "2024-08-18",
    stav: "Aktívne",
    pocetServisov: 1,
    poznamky: null
  }
];

const Zariadenia = () => {
  const [zariadenia] = useState(mockZariadenia);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredZariadenia = zariadenia.filter(zariadenie => {
    const matchesSearch = zariadenie.nazov.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zariadenie.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zariadenie.serioveeCislo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zariadenie.zakaznik.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || zariadenie.stav === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (stav: string) => {
    switch (stav) {
      case 'Aktívne': return 'bg-green-500 text-white';
      case 'Servis potrebný': return 'bg-yellow-500 text-white';
      case 'Porucha': return 'bg-red-500 text-white';
      case 'Mimo prevádzky': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (stav: string) => {
    switch (stav) {
      case 'Aktívne': return <CheckCircle className="w-4 h-4" />;
      case 'Servis potrebný': return <AlertTriangle className="w-4 h-4" />;
      case 'Porucha': return <AlertTriangle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const isWarrantyExpiringSoon = (zaruka: string) => {
    const warrantyDate = new Date(zaruka);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);
    return warrantyDate <= sixMonthsFromNow && warrantyDate > now;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Zariadenia</h1>
          <p className="text-gray-600 mt-1">Správa klimatizačných zariadení</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Nové zariadenie
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Hľadať zariadenia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Všetky stavy</option>
              <option value="Aktívne">Aktívne</option>
              <option value="Servis potrebný">Servis potrebný</option>
              <option value="Porucha">Porucha</option>
              <option value="Mimo prevádzky">Mimo prevádzky</option>
            </select>
          </div>
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtre
          </Button>
        </div>
      </Card>

      {/* Equipment List */}
      <div className="space-y-4">
        {filteredZariadenia.map((zariadenie) => (
          <Card key={zariadenie.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Header Row */}
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">{zariadenie.nazov}</span>
                  <Badge className={getStatusColor(zariadenie.stav)}>
                    {getStatusIcon(zariadenie.stav)}
                    <span className="ml-1">{zariadenie.stav}</span>
                  </Badge>
                  <Badge variant="outline">{zariadenie.typ}</Badge>
                  {isWarrantyExpiringSoon(zariadenie.zaruka) && (
                    <Badge className="bg-orange-500 text-white">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Záruka končí
                    </Badge>
                  )}
                </div>

                {/* Model and Serial */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Model:</span> {zariadenie.model} | 
                  <span className="font-medium ml-2">SN:</span> {zariadenie.serioveeCislo} |
                  <span className="font-medium ml-2">Výkon:</span> {zariadenie.vykon}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">{zariadenie.zakaznik}</p>
                      <p className="text-xs">{zariadenie.adresa}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">Posledný servis</p>
                      <p className="text-xs">{new Date(zariadenie.poslednyServis).toLocaleDateString('sk')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Wrench className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">Ďalší servis</p>
                      <p className="text-xs">{new Date(zariadenie.dalsiServis).toLocaleDateString('sk')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Settings className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">{zariadenie.pocetServisov} servisov</p>
                      <p className="text-xs">Záruka do: {new Date(zariadenie.zaruka).toLocaleDateString('sk')}</p>
                    </div>
                  </div>
                </div>

                {/* Installation Date */}
                <div className="text-sm text-gray-600">
                  <span>Inštalácia: </span>
                  <span className="font-medium">{new Date(zariadenie.datumInshalacie).toLocaleDateString('sk')}</span>
                </div>

                {/* Notes */}
                {zariadenie.poznamky && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Poznámky:</strong> {zariadenie.poznamky}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Zariadenia;
