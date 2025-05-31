
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Users, 
  Settings,
  BarChart3,
  Wrench,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { 
    name: 'Objednávky', 
    href: '/objednavky', 
    icon: ClipboardList,
    description: 'Správa servisných objednávok'
  },
  { 
    name: 'Faktúry', 
    href: '/faktury', 
    icon: FileText,
    description: 'Fakturácia a platby'
  },
  { 
    name: 'Zákazníci', 
    href: '/zakaznici', 
    icon: Users,
    description: 'Databáza zákazníkov'
  },
  { 
    name: 'Zariadenia', 
    href: '/zariadenia', 
    icon: Wrench,
    description: 'Klimatizačné zariadenia'
  },
  { 
    name: 'Kalendár', 
    href: '/kalendar', 
    icon: Calendar,
    description: 'Plánovanie prác'
  },
  { 
    name: 'Prehľady', 
    href: '/prehlady', 
    icon: BarChart3,
    description: 'Štatistiky a reporty'
  },
  { 
    name: 'Nastavenia', 
    href: '/nastavenia', 
    icon: Settings,
    description: 'Konfigurácia systému'
  }
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-gray-900 text-white", className)}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-red-600">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-xl font-bold font-poppins">KlímaApp</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )
              }
            >
              <Icon className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-75 mt-0.5">{item.description}</div>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          KlímaApp v2.0
          <br />
          © 2024 HVAC Solutions
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
