
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/common/StatusBadge';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  User,
  Clock,
  Euro,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { mockObjednavky } from '@/data/mockData';
import type { Objednavka } from '@/types';

const Objednavky = () => {
  const [objednavky] = useState<Objednavka[]>(mockObjednavky);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredObjednavky = objednavky.filter(obj => {
    const matchesSearch = obj.cislo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.zakaznik.nazov.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.popis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || obj.stav === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priorita: string) => {
    switch (priorita) {
      case 'Kritická': return 'bg-red-600 text-white';
      case 'Vysoká': return 'bg-orange-500 text-white';
      case 'Stredná': return 'bg-yellow-500 text-white';
      case 'Nízka': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Objednávky</h1>
          <p className="text-gray-600 mt-1">Správa všetkých servisných objednávok</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Nová objednávka
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Hľadať objednávky..."
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
              <option value="Nová">Nová</option>
              <option value="Naplánovaná">Naplánovaná</option>
              <option value="V procese">V procese</option>
              <option value="Dokončená">Dokončená</option>
              <option value="Fakturovaná">Fakturovaná</option>
            </select>
          </div>
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtre
          </Button>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredObjednavky.map((objednavka) => (
          <Card key={objednavka.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Header Row */}
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">#{objednavka.cislo}</span>
                  <StatusBadge status={objednavka.stav} />
                  <Badge className={getPriorityColor(objednavka.priorita)}>
                    {objednavka.priorita}
                  </Badge>
                  <Badge variant="outline">{objednavka.typ}</Badge>
                </div>

                {/* Description */}
                <p className="text-gray-700 font-medium">{objednavka.popis}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">{objednavka.zakaznik.nazov}</p>
                      <p className="text-xs">{objednavka.zakaznik.kontaktnaOsoba}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {new Date(objednavka.datumNaplanovaniaOd).toLocaleDateString('sk')}
                      </p>
                      <p className="text-xs">
                        {new Date(objednavka.datumNaplanovaniaOd).toLocaleTimeString('sk', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} - {new Date(objednavka.datumNaplanovaniaAk).toLocaleTimeString('sk', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">{objednavka.zakaznik.adresa.mesto}</p>
                      <p className="text-xs">{objednavka.zakaznik.adresa.ulica}</p>
                    </div>
                  </div>
                  
                  {objednavka.technik && (
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <div>
                        <p className="font-medium">{objednavka.technik}</p>
                        <p className="text-xs">Pridelený technik</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  {objednavka.casRealizacie && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{objednavka.casRealizacie}h</span>
                    </div>
                  )}
                  {objednavka.cena && (
                    <div className="flex items-center">
                      <Euro className="w-4 h-4 mr-1" />
                      <span className="font-medium">{objednavka.cena.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="text-xs">
                    Vytvorené: {new Date(objednavka.datumVytvorenia).toLocaleDateString('sk')}
                  </div>
                </div>

                {/* Notes */}
                {objednavka.poznamky && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Poznámky:</strong> {objednavka.poznamky}
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

export default Objednavky;
