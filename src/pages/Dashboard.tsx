
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/common/StatsCard';
import StatusBadge from '@/components/common/StatusBadge';
import { 
  ClipboardList, 
  Users, 
  Wrench, 
  Euro,
  Calendar,
  Plus,
  MapPin,
  Clock
} from 'lucide-react';
import { mockObjednavky, mockZakaznici, mockZariadenia } from '@/data/mockData';

const Dashboard = () => {
  const dnesneObjednavky = mockObjednavky.filter(obj => 
    obj.datumNaplanovaniaOd.startsWith('2024-05-31')
  );

  const stats = {
    celkoveObjednavky: mockObjednavky.length,
    aktivniZakaznici: mockZakaznici.length,
    zariadeniaPodServisom: mockZariadenia.filter(z => z.stav === 'Vyžaduje servis').length,
    mesacnyPrijem: mockObjednavky.reduce((sum, obj) => sum + (obj.cena || 0), 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins">Vitajte v KlímaApp</h1>
            <p className="text-red-100 mt-2">Správa klimatizačných služieb pre váš tím</p>
          </div>
          <Button 
            className="bg-white text-red-600 hover:bg-gray-100"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nová objednávka
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Celkové objednávky"
          value={stats.celkoveObjednavky}
          change="+2 tento týždeň"
          changeType="positive"
          icon={ClipboardList}
        />
        <StatsCard
          title="Aktívni zákazníci"
          value={stats.aktivniZakaznici}
          change="+1 nový zákazník"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Servis potrebný"
          value={stats.zariadeniaPodServisom}
          change="Vyžaduje pozornosť"
          changeType="negative"
          icon={Wrench}
        />
        <StatsCard
          title="Mesačný príjem"
          value={`€${stats.mesacnyPrijem.toFixed(2)}`}
          change="+12% oproti minulému"
          changeType="positive"
          icon={Euro}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-red-600" />
              Dnešné objednávky
            </h3>
            <Button variant="outline" size="sm">
              Zobraziť všetky
            </Button>
          </div>
          <div className="space-y-4">
            {dnesneObjednavky.map((objednavka) => (
              <div key={objednavka.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">#{objednavka.cislo}</span>
                      <StatusBadge status={objednavka.stav} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{objednavka.popis}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {objednavka.zakaznik.nazov}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(objednavka.datumNaplanovaniaOd).toLocaleTimeString('sk', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">€{objednavka.cena?.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{objednavka.technik}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Equipment Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-red-600" />
              Stav zariadení
            </h3>
            <Button variant="outline" size="sm">
              Správa zariadení
            </Button>
          </div>
          <div className="space-y-4">
            {mockZariadenia.map((zariadenie) => (
              <div key={zariadenie.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{zariadenie.vyrobca} {zariadenie.model}</span>
                      <StatusBadge status={zariadenie.stav} type="zariadenie" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{zariadenie.typ} - {zariadenie.vykon}</p>
                    <p className="text-xs text-gray-500">SN: {zariadenie.serioveC}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {zariadenie.poslednyServis ? 
                        `Posledný servis: ${new Date(zariadenie.poslednyServis).toLocaleDateString('sk')}` :
                        'Bez servisu'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
