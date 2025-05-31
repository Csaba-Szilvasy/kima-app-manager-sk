
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Euro, 
  Users, 
  Wrench, 
  Calendar,
  FileText,
  Clock,
  Download,
  Filter,
  Search
} from 'lucide-react';

// Mock data for charts
const monthlyRevenue = [
  { mesiac: 'Jan', trzby: 12500, objednavky: 45 },
  { mesiac: 'Feb', trzby: 15200, objednavky: 52 },
  { mesiac: 'Mar', trzby: 18700, objednavky: 67 },
  { mesiac: 'Apr', trzby: 16800, objednavky: 59 },
  { mesiac: 'Máj', trzby: 21300, objednavky: 78 },
  { mesiac: 'Jún', trzby: 25600, objednavky: 89 }
];

const serviceTypes = [
  { typ: 'Montáž', hodnota: 45, farba: '#ef4444' },
  { typ: 'Servis', hodnota: 30, farba: '#f97316' },
  { typ: 'Oprava', hodnota: 20, farba: '#eab308' },
  { typ: 'Údržba', hodnota: 5, farba: '#22c55e' }
];

const technicianPerformance = [
  { id: 1, meno: 'Ján Novák', dokonceneObjednavky: 23, priemernyRating: 4.8, prijem: 3200 },
  { id: 2, meno: 'Peter Kováč', dokonceneObjednavky: 19, priemernyRating: 4.6, prijem: 2850 },
  { id: 3, meno: 'Milan Horák', dokonceneObjednavky: 21, priemernyRating: 4.9, prijem: 3100 },
  { id: 4, meno: 'Tomáš Varga', dokonceneObjednavky: 17, priemernyRating: 4.5, prijem: 2600 }
];

const topCustomers = [
  { id: 1, nazov: 'HVAC Solutions s.r.o.', objednavky: 8, hodnota: 12500 },
  { id: 2, nazov: 'TechnoClima SK', objednavky: 6, hodnota: 9800 },
  { id: 3, nazov: 'AirCool Trade', objednavky: 5, hodnota: 8200 },
  { id: 4, nazov: 'Klimatex Plus', objednavky: 4, hodnota: 6800 },
  { id: 5, nazov: 'CoolAir Systems', objednavky: 3, hodnota: 5200 }
];

const chartConfig = {
  trzby: {
    label: "Tržby",
    color: "#ef4444",
  },
  objednavky: {
    label: "Objednávky",
    color: "#f97316",
  },
};

const Prehlady = () => {
  const [dateFilter, setDateFilter] = useState('lastMonth');
  const [searchTerm, setSearchTerm] = useState('');

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.trzby, 0);
  const totalOrders = monthlyRevenue.reduce((sum, month) => sum + month.objednavky, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Prehľady</h1>
          <p className="text-gray-600 mt-1">Štatistiky a reporty</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="lastWeek">Posledný týždeň</option>
            <option value="lastMonth">Posledný mesiac</option>
            <option value="last3Months">Posledné 3 mesiace</option>
            <option value="lastYear">Posledný rok</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportovať
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Celkové tržby</CardTitle>
            <Euro className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% oproti minulému obdobiu
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Celkové objednávky</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2% oproti minulému obdobiu
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Priemerná hodnota objednávky</CardTitle>
            <Euro className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{avgOrderValue.toFixed(0)}</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingDown className="w-3 h-3 mr-1" />
              -2.1% oproti minulému obdobiu
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktívni technici</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2 noví technici
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Vývoj tržieb
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mesiac" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="trzby" 
                    stroke="var(--color-trzby)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-trzby)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Service Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-red-600" />
              Rozdelenie typov služieb
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ typ, hodnota }) => `${typ}: ${hodnota}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hodnota"
                  >
                    {serviceTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.farba} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Technicians */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-red-600" />
              Výkonnosť technikov
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Technik</TableHead>
                  <TableHead>Objednávky</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Príjem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technicianPerformance.map((technik) => (
                  <TableRow key={technik.id}>
                    <TableCell className="font-medium">{technik.meno}</TableCell>
                    <TableCell>{technik.dokonceneObjednavky}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        ⭐ {technik.priemernyRating}
                      </Badge>
                    </TableCell>
                    <TableCell>€{technik.prijem}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-red-600" />
              Najlepší zákazníci
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zákazník</TableHead>
                  <TableHead>Objednávky</TableHead>
                  <TableHead>Hodnota</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((zakaznik) => (
                  <TableRow key={zakaznik.id}>
                    <TableCell className="font-medium">{zakaznik.nazov}</TableCell>
                    <TableCell>{zakaznik.objednavky}</TableCell>
                    <TableCell>€{zakaznik.hodnota.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-red-600" />
            Počet objednávok za mesiac
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mesiac" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="objednavky" 
                  fill="var(--color-objednavky)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prehlady;
