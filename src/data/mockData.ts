
import { Objednavka, Zakaznik, Zariadenie, Faktura } from '@/types';

export const mockZakaznici: Zakaznik[] = [
  {
    id: '1',
    nazov: 'Mesto Dunajská Streda',
    kontaktnaOsoba: 'Ing. Peter Novák',
    telefon: '+421 901 234 567',
    email: 'admin@dunstreda.eu',
    adresa: {
      ulica: 'Hlavná ul. 50/16',
      mesto: 'Dunajská Streda',
      psc: '92901'
    },
    typ: 'Právnická osoba'
  },
  {
    id: '2',
    nazov: 'Hotel Thermal',
    kontaktnaOsoba: 'Jana Kováčová',
    telefon: '+421 907 345 678',
    email: 'info@thermal.sk',
    adresa: {
      ulica: 'Kúpeľná 15',
      mesto: 'Piešťany',
      psc: '92101'
    },
    typ: 'Právnická osoba'
  },
  {
    id: '3',
    nazov: 'Ján Svoboda',
    kontaktnaOsoba: 'Ján Svoboda',
    telefon: '+421 905 123 456',
    email: 'jan.svoboda@email.sk',
    adresa: {
      ulica: 'Bratislavská 23',
      mesto: 'Trnava',
      psc: '91701'
    },
    typ: 'Fyzická osoba'
  }
];

export const mockZariadenia: Zariadenie[] = [
  {
    id: '1',
    typ: 'Split jednotka',
    vyrobca: 'Daikin',
    model: 'FTXM35N',
    serioveC: 'JA-182SH',
    vykon: '3.5 kW',
    rokInstalacie: 2021,
    zaruka: '5 rokov',
    zakaznikId: '1',
    poslednyServis: '2024-03-15',
    stav: 'Funkčné'
  },
  {
    id: '2',
    typ: 'VRV/VRF',
    vyrobca: 'Mitsubishi',
    model: 'PURY-P250YNW-A',
    serioveC: 'BAT CR123A',
    vykon: '25 kW',
    rokInstalacie: 2020,
    zaruka: '7 rokov',
    zakaznikId: '2',
    poslednyServis: '2024-01-20',
    stav: 'Vyžaduje servis'
  },
  {
    id: '3',
    typ: 'Tepelné čerpadlo',
    vyrobca: 'Samsung',
    model: 'EHS-TDM075DA2V',
    serioveC: 'S206',
    vykon: '7.5 kW',
    rokInstalacie: 2023,
    zaruka: '3 roky',
    zakaznikId: '3',
    stav: 'Funkčné'
  }
];

export const mockObjednavky: Objednavka[] = [
  {
    id: '1',
    cislo: '2024-001',
    zakaznik: mockZakaznici[0],
    zariadenie: mockZariadenia[0],
    typ: 'Servis',
    stav: 'Naplánovaná',
    priorita: 'Stredná',
    datumVytvorenia: '2024-05-20',
    datumNaplanovaniaOd: '2024-05-31T13:30',
    datumNaplanovaniaAk: '2024-05-31T15:30',
    technik: 'Borsányi Jozef',
    popis: 'Servis klimatizácie - čistenie filtrov a kontrola chladiva',
    poznamky: 'Zákazník bude prítomný od 13:30',
    cena: 89.50,
    casRealizacie: 2
  },
  {
    id: '2',
    cislo: '2024-002',
    zakaznik: mockZakaznici[1],
    zariadenie: mockZariadenia[1],
    typ: 'Oprava',
    stav: 'V procese',
    priorita: 'Vysoká',
    datumVytvorenia: '2024-05-25',
    datumNaplanovaniaOd: '2024-05-31T09:00',
    datumNaplanovaniaAk: '2024-05-31T12:00',
    technik: 'Borsányi Jozef',
    popis: 'Oprava úniku chladiva v exteriérovej jednotke',
    poznamky: 'Nutné objednať náhradné diely',
    cena: 245.00,
    casRealizacie: 3
  },
  {
    id: '3',
    cislo: '2024-003',
    zakaznik: mockZakaznici[2],
    zariadenie: mockZariadenia[2],
    typ: 'Údržba',
    stav: 'Nová',
    priorita: 'Nízka',
    datumVytvorenia: '2024-05-30',
    datumNaplanovaniaOd: '2024-06-02T14:00',
    datumNaplanovaniaAk: '2024-06-02T16:00',
    popis: 'Pravidelná údržba tepelného čerpadla',
    cena: 125.00,
    casRealizacie: 2
  }
];

export const mockFaktury: Faktura[] = [
  {
    id: '1',
    cislo: 'F2024-001',
    objednavkaId: '1',
    zakaznik: mockZakaznici[0],
    datumVystavenia: '2024-05-15',
    datumSplatnosti: '2024-06-14',
    celkovaSuma: 89.50,
    stav: 'Odoslaná',
    polozky: [
      {
        id: '1',
        nazov: 'Servis klimatizácie',
        mnozstvo: 1,
        jednotka: 'ks',
        cenaZaJednotku: 75.00,
        celkovaCena: 75.00
      },
      {
        id: '2',
        nazov: 'Čistenie filtrov',
        mnozstvo: 2,
        jednotka: 'ks',
        cenaZaJednotku: 7.25,
        celkovaCena: 14.50
      }
    ]
  }
];
