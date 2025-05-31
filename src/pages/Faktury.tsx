
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Euro,
  Eye,
  Edit,
  Trash2,
  Download,
  Send
} from 'lucide-react';

const mockFaktury = [
  {
    id: 1,
    cislo: "FAK-2024-001",
    zakaznik: "HVAC Solutions s.r.o.",
    suma: 1250.00,
    datumVystavenia: "2024-01-15",
    datumSplatnosti: "2024-02-14",
    stav: "Zaplatená",
    objednavka: "OBJ-2024-045"
  },
  {
    id: 2,
    cislo: "FAK-2024-002", 
    zakaznik: "TechnoClima SK",
    suma: 890.50,
    datumVystavenia: "2024-01-18",
    datumSplatnosti: "2024-02-17",
    stav: "Odoslaná",
    objednavka: "OBJ-2024-048"
  },
  {
    id: 3,
    cislo: "FAK-2024-003",
    zakaznik: "AirCool Trade",
    suma: 2150.75,
    datumVystavenia: "2024-01-20",
    datumSplatnosti: "2024-02-19",
    stav: "Konceptová",
    objednavka: "OBJ-2024-052"
  }
];

const Faktury = () => {
  const [faktury] = useState(mockFaktury);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredFaktury = faktury.filter(faktura => {
    const matchesSearch = faktura.cislo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faktura.zakaznik.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || faktura.stav === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (stav: string) => {
    switch (stav) {
      case 'Zaplatená': return 'bg-green-500 text-white';
      case 'Odoslaná': return 'bg-blue-500 text-white';
      case 'Konceptová': return 'bg-yellow-500 text-white';
      case 'Po splatnosti': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Faktúry</h1>
          <p className="text-gray-600 mt-1">Správa fakturácie a platieb</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Nová faktúra
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Hľadať faktúry..."
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
              <option value="Konceptová">Konceptová</option>
              <option value="Odoslaná">Odoslaná</option>
              <option value="Zaplatená">Zaplatená</option>
              <option value="Po splatnosti">Po splatnosti</option>
            </select>
          </div>
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtre
          </Button>
        </div>
      </Card>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredFaktury.map((faktura) => (
          <Card key={faktura.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-3">
                {/* Header Row */}
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">#{faktura.cislo}</span>
                  <Badge className={getStatusColor(faktura.stav)}>
                    {faktura.stav}
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Zákazník</p>
                    <p className="font-medium">{faktura.zakaznik}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Suma</p>
                    <p className="font-medium text-lg flex items-center">
                      <Euro className="w-4 h-4 mr-1" />
                      {faktura.suma.toFixed(2)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Dátum vystavenia</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(faktura.datumVystavenia).toLocaleDateString('sk')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Splatnosť</p>
                    <p className="font-medium">
                      {new Date(faktura.datumSplatnosti).toLocaleDateString('sk')}
                    </p>
                  </div>
                </div>

                {/* Related Order */}
                <div className="text-sm text-gray-600">
                  <span>Objednávka: </span>
                  <span className="font-medium text-red-600">{faktura.objednavka}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Send className="w-4 h-4" />
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

export default Faktury;
