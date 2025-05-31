
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Objednavky from "./pages/Objednavky";
import NotFound from "./pages/NotFound";
import Faktury from "./pages/Faktury";
import Zakaznici from "./pages/Zakaznici";
import Zariadenia from "./pages/Zariadenia";
import Prehlady from "./pages/Prehlady";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<MainLayout title="Dashboard" subtitle="Prehľad aktivít a štatistík" />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/objednavky" element={<MainLayout title="Objednávky" subtitle="Správa servisných objednávok" />}>
            <Route index element={<Objednavky />} />
          </Route>
          <Route path="/faktury" element={<MainLayout title="Faktúry" subtitle="Fakturácia a platby" />}>
            <Route index element={<Faktury />} />
          </Route>
          <Route path="/zakaznici" element={<MainLayout title="Zákazníci" subtitle="Databáza zákazníkov" />}>
            <Route index element={<Zakaznici />} />
          </Route>
          <Route path="/zariadenia" element={<MainLayout title="Zariadenia" subtitle="Klimatizačné zariadenia" />}>
            <Route index element={<Zariadenia />} />
          </Route>
          <Route path="/kalendar" element={<MainLayout title="Kalendár" subtitle="Plánovanie prác" />}>
            <Route index element={
              <div className="p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">Kalendár</h3>
                  <p className="text-gray-600 mt-2">Stránka bude implementovaná v ďalšej verzii</p>
                </div>
              </div>
            } />
          </Route>
          <Route path="/prehlady" element={<MainLayout title="Prehľady" subtitle="Štatistiky a reporty" />}>
            <Route index element={<Prehlady />} />
          </Route>
          <Route path="/nastavenia" element={<MainLayout title="Nastavenia" subtitle="Konfigurácia systému" />}>
            <Route index element={
              <div className="p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">Nastavenia</h3>
                  <p className="text-gray-600 mt-2">Stránka bude implementovaná v ďalšej verzii</p>
                </div>
              </div>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
