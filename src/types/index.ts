
export interface Objednavka {
  id: string;
  cislo: string;
  zakaznik: Zakaznik;
  zariadenie: Zariadenie;
  typ: 'Servis' | 'Inštalácia' | 'Oprava' | 'Údržba';
  stav: 'Nová' | 'Naplánovaná' | 'V procese' | 'Dokončená' | 'Fakturovaná';
  priorita: 'Nízka' | 'Stredná' | 'Vysoká' | 'Kritická';
  datumVytvorenia: string;
  datumNaplanovaniaOd: string;
  datumNaplanovaniaAk: string;
  technik?: string;
  popis: string;
  poznamky?: string;
  cena?: number;
  casRealizacie?: number;
}

export interface Zakaznik {
  id: string;
  nazov: string;
  kontaktnaOsoba: string;
  telefon: string;
  email: string;
  adresa: {
    ulica: string;
    mesto: string;
    psc: string;
  };
  typ: 'Fyzická osoba' | 'Právnická osoba';
}

export interface Zariadenie {
  id: string;
  typ: 'Split jednotka' | 'Multi-split' | 'VRV/VRF' | 'Chladič' | 'Tepelné čerpadlo';
  vyrobca: string;
  model: string;
  serioveC: string;
  vykon: string;
  rokInstalacie: number;
  zaruka?: string;
  zakaznikId: string;
  poslednyServis?: string;
  stav: 'Funkčné' | 'Vyžaduje servis' | 'Nefunkčné';
}

export interface Faktura {
  id: string;
  cislo: string;
  objednavkaId: string;
  zakaznik: Zakaznik;
  datumVystavenia: string;
  datumSplatnosti: string;
  celkovaSuma: number;
  stav: 'Koncept' | 'Odoslaná' | 'Zaplatená' | 'Po splatnosti';
  polozky: FakturaPolozka[];
}

export interface FakturaPolozka {
  id: string;
  nazov: string;
  mnozstvo: number;
  jednotka: string;
  cenaZaJednotku: number;
  celkovaCena: number;
}
