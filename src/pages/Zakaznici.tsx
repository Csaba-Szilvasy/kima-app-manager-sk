
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Phone,
  Mail,
  MapPin,
  Building,
  Eye,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';

const mockZakaznici = [
  {
    id: 1,
    nazov: "HVAC Solutions s.r.o.",
    kontaktnaOsoba: "Ing. Peter Novák",
    telefon: "+421 902 123 456",
    email: "peter.novak@hvacsolutions.sk",
    adresa: {
      ulica: "Priemyselná 15",
      mesto: "Bratislava",
      psc: "82109"
    },
    ico: "12345678",
    dic: "2023456789",
    typ: "Podnik",
    datumRegistracie: "2023-05-15",
    pocetObjednavok: 12,
    celkovaTrzba: 15850.50,
    poslednaObjednavka: "2024-01-20"
  },
  {
    id: 2,
    nazov: "Rodinný dom - Kováč",
    kontaktnaOsoba: "Marián Kováč",
    telefon: "+421 905 987 654",
    email: "marian.kovac@email.sk",
    adresa: {
      ulica: "Slnečná 8",
      mesto: "Trnava",
      psc: "91701"
    },
    ico: null,
    dic: null,
    typ: "Fyzická osoba",
    datumRegistracie: "2023-08-22",
    pocetObjednavok: 3,
    celkovaTrzba: 2890.00,
    poslednaObjednavka: "2024-01-18"
  },
  {
    id: 3,
    nazov: "TechnoClima SK s.r.o.",
    kontaktnaOsoba: "Mgr. Jana Svobodová",
    telefon: "+421 911 555 777",
    email: "jana@technoclima.sk",
    adresa: {
      ulica: "Technická 42",
      mesto: "Košice",
      psc: "04001"
    },
    ico: "87654321",
    dic: "2087654321",
    typ: "Podnik",
    datumRegistracie: "2023-03-10",
    pocetObjednavok: 8,
    celkovaTrzba: 9240.75,
    poslednaObjednavka: "2024-01-15"
  }
];

const Zakaznici = () => {
  const [zakaznici] = useState(mockZakaznici);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredZakaznici = zakaznici.filter(zakaznik => {
    const matchesSearch = zakaznik.nazov.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zakaznik.kontaktnaOsoba.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zakaznik.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || zakaznik.typ === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (typ: string) => {
    switch (typ) {
      case 'Podnik': return 'bg-blue-500 text-white';
      case 'Fyzická osoba': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Zákazníci</h1>
          <p className="text-gray-600 mt-1">Databáza zákazníkov a kontaktov</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Nový zákazník
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Hľadať zákazníkov..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Všetky typy</option>
              <option value="Podnik">Podnik</option>
              <option value="Fyzická osoba">Fyzická osoba</option>
            </select>
          </div>
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtre
          </Button>
        </div>
      </Card>

      {/* Customers List */}
      <div className="space-y-4">
        {filteredZakaznici.map((zakaznik) => (
          <Card key={zakaznik.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Header Row */}
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">{zakaznik.nazov}</span>
                  <Badge className={getTypeColor(zakaznik.typ)}>
                    {zakaznik.typ}
                  </Badge>
                </div>

                {/* Contact Person */}
                <p className="text-gray-700 font-medium">{zakaznik.kontaktnaOsoba}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{zakaznik.telefon}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{zakaznik.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p>{zakaznik.adresa.ulica}</p>
                      <p>{zakaznik.adresa.psc} {zakaznik.adresa.mesto}</p>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                {zakaznik.ico && (
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      <span>IČO: {zakaznik.ico}</span>
                    </div>
                    {zakaznik.dic && (
                      <span>DIČ: {zakaznik.dic}</span>
                    )}
                  </div>
                )}

                {/* Statistics */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="bg-blue-50 px-3 py-1 rounded-full">
                    <span className="text-blue-700 font-medium">{zakaznik.pocetObjednavok} objednávok</span>
                  </div>
                  <div className="bg-green-50 px-3 py-1 rounded-full">
                    <span className="text-green-700 font-medium">€{zakaznik.celkovaTrzba.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Posledná: {new Date(zakaznik.poslednaObjednavka).toLocaleDateString('sk')}</span>
                  </div>
                </div>
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

export default Zakaznici;
