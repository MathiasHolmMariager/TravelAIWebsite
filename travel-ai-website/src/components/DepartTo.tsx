import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const DepartToInput = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const [airportData] = useState<
  { code: string; name: string; country: string; icao: string; city: string }[]
  >([
      { name: 'Tirana Airport', country: 'Albania', code: 'TIA', icao: 'LATI', city: 'Tirana' },
      { name: 'Yerevan Zvartnots Airport', country: 'Armenia', code: 'EVN', icao: 'UDYZ', city: 'Yerevan' },
      { name: 'Graz Airport', country: 'Austria', code: 'GRZ', icao: 'LOWG', city: 'Graz' },
      { name: 'Innsbruck Airport', country: 'Austria', code: 'INN', icao: 'LOWI', city: 'Innsbruck' },
      { name: 'Klagenfurt Airport', country: 'Austria', code: 'KLU', icao: 'LOWK', city: 'Klagenfurt' },
      { name: 'Linz Airport', country: 'Austria', code: 'LNZ', icao: 'LOWL', city: 'Linz' },
      { name: 'Salzburg Airport', country: 'Austria', code: 'SZG', icao: 'LOWS', city: 'Salzburg' },
      { name: 'Vienna Airport', country: 'Austria', code: 'VIE', icao: 'LOWW', city: 'Vienna' },
      { name: 'Baku Airport', country: 'Azerbaijan', code: 'GYD', icao: 'UBBB', city: 'Baku' },
      { name: 'Minsk Airport', country: 'Belarus', code: 'MSQ', icao: 'UMMS', city: 'Minsk' },
      { name: 'Antwerp Airport', country: 'Belgium', code: 'ANR', icao: 'EBAW', city: 'Antwerp' },
      { name: 'Brussels Airport', country: 'Belgium', code: 'BRU', icao: 'EBBR', city: 'Brussels' },
      { name: 'Charleroi Airport', country: 'Belgium', code: 'CRL', icao: 'EBCI', city: 'Charleroi' },
      { name: 'Liege Airport', country: 'Belgium', code: 'LGG', icao: 'EBLG', city: 'Liege' },
      { name: 'Ostend Bruges Airport', country: 'Belgium', code: 'OST', icao: 'EBOS', city: 'Ostend' },
      { name: 'Sarajevo Airport', country: 'Bosnia and Herzegovina', code: 'SJJ', icao: 'LQSA', city: 'Sarajevo' },
      { name: 'Tuzla Airport', country: 'Bosnia and Herzegovina', code: 'TZL', icao: 'LQTZ', city: 'Tuzla' },
      { name: 'Burgas Airport', country: 'Bulgaria', code: 'BOJ', icao: 'LBBG', city: 'Burgas' },
      { name: 'Sofia Airport', country: 'Bulgaria', code: 'SOF', icao: 'LBSF', city: 'Sofia' },
      { name: 'Varna Airport', country: 'Bulgaria', code: 'VAR', icao: 'LBWN', city: 'Varna' },
      { name: 'Dubrovnik Airport', country: 'Croatia', code: 'DBV', icao: 'LDDU', city: 'Dubrovnik' },
      { name: 'Pula Airport', country: 'Croatia', code: 'PUY', icao: 'LDPL', city: 'Pula' },
      { name: 'Rijeka Krk Airport', country: 'Croatia', code: 'RJK', icao: 'LDRI', city: 'Rijeka' },
      { name: 'Split Airport', country: 'Croatia', code: 'SPU', icao: 'LDSP', city: 'Split' },
      { name: 'Zadar Airport', country: 'Croatia', code: 'ZAD', icao: 'LDZD', city: 'Zadar' },
      { name: 'Zagreb Airport', country: 'Croatia', code: 'ZAG', icao: 'LDZA', city: 'Zagreb' },
      { name: 'Larnaca Airport', country: 'Cyprus', code: 'LCA', icao: 'LCLK', city: 'Larnaca' },
      { name: 'Paphos Airport', country: 'Cyprus', code: 'PFO', icao: 'LCPH', city: 'Paphos' },
      { name: 'Brno Airport', country: 'Czech Republic', code: 'BRQ', icao: 'LKTB', city: 'Brno' },
      { name: 'Prague Airport', country: 'Czech Republic', code: 'PRG', icao: 'LKPR', city: 'Prague' },
      { name: 'Aalborg Airport', country: 'Denmark', code: 'AAL', icao: 'EKYT', city: 'Aalborg' },
      { name: 'Aarhus Airport', country: 'Denmark', code: 'AAR', icao: 'EKAH', city: 'Aarhus' },
      { name: 'Billund Airport', country: 'Denmark', code: 'BLL', icao: 'EKBI', city: 'Billund' },
      { name: 'Copenhagen Airport', country: 'Denmark', code: 'CPH', icao: 'EKCH', city: 'Copenhagen' },
      { name: 'Vágar Airport', country: 'Denmark', code: 'FAE', icao: 'EKVG', city: 'Vágar' },
      { name: 'Tallinn Airport', country: 'Estonia', code: 'TLL', icao: 'EETN', city: 'Tallinn' },
      { name: 'Helsinki Airport', country: 'Finland', code: 'HEL', icao: 'EFHK', city: 'Helsinki' },
      { name: 'Kittilä Airport', country: 'Finland', code: 'KTT', icao: 'EFKT', city: 'Kittilä' },
      { name: 'Oulu Airport', country: 'Finland', code: 'OUL', icao: 'EFOU', city: 'Oulu' },
      { name: 'Rovaniemi Airport', country: 'Finland', code: 'RVN', icao: 'EFRO', city: 'Rovaniemi' },
      { name: 'Tampere Airport', country: 'Finland', code: 'TMP', icao: 'EFTP', city: 'Tampere' },
      { name: 'Turku Airport', country: 'Finland', code: 'TKU', icao: 'EFTU', city: 'Turku' },
      { name: 'Vaasa Airport', country: 'Finland', code: 'VAA', icao: 'EFVA', city: 'Vaasa' },
      { name: 'Ajaccio Airport', country: 'France', code: 'AJA', icao: 'LFKJ', city: 'Ajaccio' },
      { name: 'Bastia Airport', country: 'France', code: 'BIA', icao: 'LFKB', city: 'Bastia' },
      { name: 'Bergerac Airport', country: 'France', code: 'EGC', icao: 'LFBE', city: 'Bergerac' },
      { name: 'Biarritz Airport', country: 'France', code: 'BIQ', icao: 'LFBZ', city: 'Biarritz' },
      { name: 'Bordeaux Airport', country: 'France', code: 'BOD', icao: 'LFBD', city: 'Bordeaux' },
      { name: 'Brest Bretagne Airport', country: 'France', code: 'BES', icao: 'LFRB', city: 'Brest' },
      { name: 'Figari South Corsica Airport', country: 'France', code: 'FSC', icao: 'LFKF', city: 'Figari' },
      { name: 'Lille Airport', country: 'France', code: 'LIL', icao: 'LFQQ', city: 'Lille' },
      { name: 'Lyon-Saint Exupéry Airport', country: 'France', code: 'LYS', icao: 'LFLL', city: 'Lyon' },
      { name: 'Marseille Airport', country: 'France', code: 'MRS', icao: 'LFML', city: 'Marseille' },
      { name: 'Montpellier Airport', country: 'France', code: 'MPL', icao: 'LFMT', city: 'Montpellier' },
      { name: 'Nantes Airport', country: 'France', code: 'NTE', icao: 'LFRS', city: 'Nantes' },
      { name: 'Nice Airport', country: 'France', code: 'NCE', icao: 'LFMN', city: 'Nice' },
      { name: 'Paris Beauvais Airport', country: 'France', code: 'BVA', icao: 'LFOB', city: 'Paris Beauvais' },
      { name: 'Paris Charles de Gaulle Airport', country: 'France', code: 'CDG', icao: 'LFPG', city: 'Paris' },
      { name: 'Paris Orly Airport', country: 'France', code: 'ORY', icao: 'LFPO', city: 'Paris' },
      { name: 'Rennes Bretagne Airport', country: 'France', code: 'RNS', icao: 'LFRN', city: 'Rennes' },
      { name: 'Réunion Roland Garros Airport', country: 'France', code: 'RUN', icao: 'FMEE', city: 'Réunion' },
      { name: 'Strasbourg Airport', country: 'France', code: 'SXB', icao: 'LFST', city: 'Strasbourg' },
      { name: 'Toulon-Hyères Airport', country: 'France', code: 'TLN', icao: 'LFTH', city: 'Toulon-Hyères' },
      { name: 'Toulouse Blagnac Airport', country: 'France', code: 'TLS', icao: 'LFBO', city: 'Toulouse' },
      { name: 'Kutaisi Airport', country: 'Georgia', code: 'KUT', icao: 'UGKO', city: 'Kutaisi' },
      { name: 'Tbilisi Airport', country: 'Georgia', code: 'TBS', icao: 'UGTB', city: 'Tbilisi' },
      { name: 'Allgäu Airport Memmingen', country: 'Germany', code: 'FMM', icao: 'EDJA', city: 'Memmingen' },
      { name: 'Berlin Brandenburg Airport', country: 'Germany', code: 'BER', icao: 'EDDB', city: 'Berlin' },
      { name: 'Bremen Airport', country: 'Germany', code: 'BRE', icao: 'EDDW', city: 'Bremen' },
      { name: 'Cologne Bonn Airport', country: 'Germany', code: 'CGN', icao: 'EDDK', city: 'Cologne' },
      { name: 'Dortmund Airport', country: 'Germany', code: 'DTM', icao: 'EDLW', city: 'Dortmund' },
      { name: 'Dresden Airport', country: 'Germany', code: 'DRS', icao: 'EDDC', city: 'Dresden' },
      { name: 'Düsseldorf Airport', country: 'Germany', code: 'DUS', icao: 'EDDL', city: 'Düsseldorf' },
      { name: 'Frankfurt Airport', country: 'Germany', code: 'FRA', icao: 'EDDF', city: 'Frankfurt' },
      { name: 'Frankfurt-Hahn Airport', country: 'Germany', code: 'HHN', icao: 'EDFH', city: 'Frankfurt-Hahn' },
      { name: 'Friedrichshafen Airport', country: 'Germany', code: 'FDH', icao: 'EDNY', city: 'Friedrichshafen' },
      { name: 'Hamburg Airport', country: 'Germany', code: 'HAM', icao: 'EDDH', city: 'Hamburg' },
      { name: 'Hanover Airport', country: 'Germany', code: 'HAJ', icao: 'EDDV', city: 'Hanover' },
      { name: 'Karlsruhe Baden-Baden Airport', country: 'Germany', code: 'FKB', icao: 'EDSB', city: 'Karlsruhe' },
      { name: 'Leipzig Halle Airport', country: 'Germany', code: 'LEJ', icao: 'EDDP', city: 'Leipzig' },
      { name: 'Munich Airport', country: 'Germany', code: 'MUC', icao: 'EDDM', city: 'Munich' },
      { name: 'Münster Osnabrück Airport', country: 'Germany', code: 'FMO', icao: 'EDDG', city: 'Münster' },
      { name: 'Nuremberg Airport', country: 'Germany', code: 'NUE', icao: 'EDDN', city: 'Nuremberg' },
      { name: 'Paderborn Lippstadt Airport', country: 'Germany', code: 'PAD', icao: 'EDLP', city: 'Paderborn' },
      { name: 'Stuttgart Airport', country: 'Germany', code: 'STR', icao: 'EDDS', city: 'Stuttgart' },
      { name: 'Weeze Airport', country: 'Germany', code: 'NRN', icao: 'EDLV', city: 'Weeze' },
      { name: 'Aktion Airport', country: 'Greece', code: 'PVK', icao: 'LGPZ', city: 'Aktion' },
      { name: 'Athens Airport', country: 'Greece', code: 'ATH', icao: 'LGAV', city: 'Athens' },
      { name: 'Chania Airport', country: 'Greece', code: 'CHQ', icao: 'LGSA', city: 'Chania' },
      { name: 'Corfu Airport', country: 'Greece', code: 'CFU', icao: 'LGKR', city: 'Corfu' },
      { name: 'Heraklion Airport', country: 'Greece', code: 'HER', icao: 'LGIR', city: 'Heraklion' },
      { name: 'Kefalonia Airport', country: 'Greece', code: 'EFL', icao: 'LGKF', city: 'Kefalonia' },
      { name: 'Kos Airport', country: 'Greece', code: 'KGS', icao: 'LGKO', city: 'Kos' },
      { name: 'Lesvos Mytilene Airport', country: 'Greece', code: 'MJT', icao: 'LGMT', city: 'Mytilene' },
      { name: 'Mykonos Airport', country: 'Greece', code: 'JMK', icao: 'LGMK', city: 'Mykonos' },
      { name: 'Rhodes Airport', country: 'Greece', code: 'RHO', icao: 'LGRP', city: 'Rhodes' },
      { name: 'Samos Airport', country: 'Greece', code: 'SMI', icao: 'LGSM', city: 'Samos' },
      { name: 'Santorini Airport', country: 'Greece', code: 'JTR', icao: 'LGSR', city: 'Santorini' },
      { name: 'Skiathos Airport', country: 'Greece', code: 'JSI', icao: 'LGSK', city: 'Skiathos' },
      { name: 'Thessaloniki Airport', country: 'Greece', code: 'SKG', icao: 'LGTS', city: 'Thessaloniki' },
      { name: 'Zante Airport', country: 'Greece', code: 'ZTH', icao: 'LGZA', city: 'Zakynthos' },
      { name: 'Budapest Airport', country: 'Hungary', code: 'BUD', icao: 'LHBP', city: 'Budapest' },
      { name: 'Debrecen Airport', country: 'Hungary', code: 'DEB', icao: 'LHDC', city: 'Debrecen' },
      { name: 'Keflavik Airport', country: 'Iceland', code: 'KEF', icao: 'BIKF', city: 'Keflavik' },
      { name: 'Cork Airport', country: 'Ireland', code: 'ORK', icao: 'EICK', city: 'Cork' },
      { name: 'Dublin Airport', country: 'Ireland', code: 'DUB', icao: 'EIDW', city: 'Dublin' },
      { name: 'Ireland West Airport Knock', country: 'Ireland', code: 'NOC', icao: 'EIKN', city: 'Knock' },
      { name: 'Kerry Airport', country: 'Ireland', code: 'KIR', icao: 'EIKY', city: 'Kerry' },
      { name: 'Shannon Airport', country: 'Ireland', code: 'SNN', icao: 'EINN', city: 'Shannon' },
      { name: 'Alghero Airport', country: 'Italy', code: 'AHO', icao: 'LIEA', city: 'Alghero' },
      { name: 'Ancona Airport', country: 'Italy', code: 'AOI', icao: 'LIPY', city: 'Ancona' },
      { name: 'Bari Airport', country: 'Italy', code: 'BRI', icao: 'LIBD', city: 'Bari' },
      { name: 'Bergamo Airport', country: 'Italy', code: 'BGY', icao: 'LIME', city: 'Bergamo' },
      { name: 'Bologna Airport', country: 'Italy', code: 'BLQ', icao: 'LIPE', city: 'Bologna' },
      { name: 'Brindisi Airport', country: 'Italy', code: 'BDS', icao: 'LIBR', city: 'Brindisi' },
      { name: 'Cagliari Airport', country: 'Italy', code: 'CAG', icao: 'LIEE', city: 'Cagliari' },
      { name: 'Catania Fontanarossa Airport', country: 'Italy', code: 'CTA', icao: 'LICC', city: 'Catania' },
      { name: 'Comiso Airport', country: 'Italy', code: 'CIY', icao: 'LICB', city: 'Comiso' },
      { name: 'Florence Airport', country: 'Italy', code: 'FLR', icao: 'LIRQ', city: 'Florence' },
      { name: 'Genoa Airport', country: 'Italy', code: 'GOA', icao: 'LIMJ', city: 'Genoa' },
      { name: 'Lamezia Terme Airport', country: 'Italy', code: 'SUF', icao: 'LICA', city: 'Lamezia Terme' },
      { name: 'Milan Linate Airport', country: 'Italy', code: 'LIN', icao: 'LIML', city: 'Milan' },
      { name: 'Milan Malpensa Airport', country: 'Italy', code: 'MXP', icao: 'LIMC', city: 'Milan' },
      { name: 'Naples Airport', country: 'Italy', code: 'NAP', icao: 'LIRN', city: 'Naples' },
      { name: 'Olbia Costa Smeralda Airport', country: 'Italy', code: 'OLB', icao: 'LIEO', city: 'Olbia' },
      { name: 'Palermo Airport', country: 'Italy', code: 'PMO', icao: 'LICJ', city: 'Palermo' },
      { name: 'Perugia Airport', country: 'Italy', code: 'PEG', icao: 'LIRZ', city: 'Perugia' },
      { name: 'Pescara Airport', country: 'Italy', code: 'PSR', icao: 'LIBP', city: 'Pescara' },
      { name: 'Pisa Airport', country: 'Italy', code: 'PSA', icao: 'LIRP', city: 'Pisa' },
      { name: 'Rome Ciampino Airport', country: 'Italy', code: 'CIA', icao: 'LIRA', city: 'Rome' },
      { name: 'Rome Fiumicino Airport', country: 'Italy', code: 'FCO', icao: 'LIRF', city: 'Rome' },
      { name: 'Trapani Airport', country: 'Italy', code: 'TPS', icao: 'LICT', city: 'Trapani' },
      { name: 'Treviso Airport', country: 'Italy', code: 'TSF', icao: 'LIPH', city: 'Treviso' },
      { name: 'Trieste Airport', country: 'Italy', code: 'TRS', icao: 'LIPQ', city: 'Trieste' },
      { name: 'Turin Airport', country: 'Italy', code: 'TRN', icao: 'LIMF', city: 'Turin' },
      { name: 'Venice Airport', country: 'Italy', code: 'VCE', icao: 'LIPZ', city: 'Venice' },
      { name: 'Verona Airport', country: 'Italy', code: 'VRN', icao: 'LIPX', city: 'Verona' },
      { name: 'Almaty Airport', country: 'Kazakhstan', code: 'ALA', icao: 'UAAA', city: 'Almaty' },
      { name: 'Nursultan Nazarbayev Airport', country: 'Kazakhstan', code: 'TSE', icao: 'UACC', city: 'Nursultan' },
      { name: 'Pristina Airport', country: 'Kosovo', code: 'PRN', icao: 'BKPR', city: 'Pristina' },
      { name: 'Riga Airport', country: 'Latvia', code: 'RIX', icao: 'EVRA', city: 'Riga' },
      { name: 'Kaunas Airport', country: 'Lithuania', code: 'KUN', icao: 'EYKA', city: 'Kaunas' },
      { name: 'Vilnius Airport', country: 'Lithuania', code: 'VNO', icao: 'EYVI', city: 'Vilnius' },
      { name: 'Luxembourg Airport', country: 'Luxembourg', code: 'LUX', icao: 'ELLX', city: 'Luxembourg' },
      { name: 'Malta Airport', country: 'Malta', code: 'MLA', icao: 'LMML', city: 'Malta' },
      { name: 'Chisinau Airport', country: 'Moldova', code: 'KIV', icao: 'LUKK', city: 'Chisinau' },
      { name: 'Podgorica Airport', country: 'Montenegro', code: 'TGD', icao: 'LYPG', city: 'Podgorica' },
      { name: 'Tivat Airport', country: 'Montenegro', code: 'TIV', icao: 'LYTV', city: 'Tivat' },
      { name: 'Amsterdam Airport Schiphol', country: 'Netherlands', code: 'AMS', icao: 'EHAM', city: 'Amsterdam' },
      { name: 'Eindhoven Airport', country: 'Netherlands', code: 'EIN', icao: 'EHEH', city: 'Eindhoven' },
      { name: 'Groningen Airport Eelde', country: 'Netherlands', code: 'GRQ', icao: 'EHGG', city: 'Groningen' },
      { name: 'Maastricht Aachen Airport', country: 'Netherlands', code: 'MST', icao: 'EHBK', city: 'Maastricht' },
      { name: 'Rotterdam The Hague Airport', country: 'Netherlands', code: 'RTM', icao: 'EHRD', city: 'Rotterdam' },
      { name: 'Skopje Airport', country: 'North Macedonia', code: 'SKP', icao: 'LWSK', city: 'Skopje' },
      { name: 'Ålesund Airport', country: 'Norway', code: 'AES', icao: 'ENAL', city: 'Ålesund' },
      { name: 'Bergen Airport', country: 'Norway', code: 'BGO', icao: 'ENBR', city: 'Bergen' },
      { name: 'Bodø Airport', country: 'Norway', code: 'BOO', icao: 'ENBO', city: 'Bodø' },
      { name: 'Haugesund Airport', country: 'Norway', code: 'HAU', icao: 'ENHD', city: 'Haugesund' },
      { name: 'Kristiansand Airport', country: 'Norway', code: 'KRS', icao: 'ENCN', city: 'Kristiansand' },
      { name: 'Oslo Airport', country: 'Norway', code: 'OSL', icao: 'ENGM', city: 'Oslo' },
      { name: 'Sandefjord Airport Torp', country: 'Norway', code: 'TRF', icao: 'ENTO', city: 'Sandefjord' },
      { name: 'Stavanger Airport', country: 'Norway', code: 'SVG', icao: 'ENZV', city: 'Stavanger' },
      { name: 'Tromsø Airport', country: 'Norway', code: 'TOS', icao: 'ENTC', city: 'Tromsø' },
      { name: 'Trondheim Airport', country: 'Norway', code: 'TRD', icao: 'ENVA', city: 'Trondheim' },
      { name: 'Gdansk Airport', country: 'Poland', code: 'GDN', icao: 'EPGD', city: 'Gdansk' },
      { name: 'Katowice Airport', country: 'Poland', code: 'KTW', icao: 'EPKT', city: 'Katowice' },
      { name: 'Kraków Airport', country: 'Poland', code: 'KRK', icao: 'EPKK', city: 'Kraków' },
      { name: 'Poznan Airport', country: 'Poland', code: 'POZ', icao: 'EPPO', city: 'Poznan' },
      { name: 'Szczecin-Goleniów Airport', country: 'Poland', code: 'SZZ', icao: 'EPSC', city: 'Szczecin' },
      { name: 'Warsaw Airport', country: 'Poland', code: 'WAW', icao: 'EPWA', city: 'Warsaw' },
      { name: 'Warsaw Modlin Airport', country: 'Poland', code: 'WMI', icao: 'EPMO', city: 'Warsaw' },
      { name: 'Wroclaw Airport', country: 'Poland', code: 'WRO', icao: 'EPWR', city: 'Wroclaw' },
      { name: 'Faro Airport', country: 'Portugal', code: 'FAO', icao: 'LPFR', city: 'Faro' },
      { name: 'Lisbon Airport', country: 'Portugal', code: 'LIS', icao: 'LPPT', city: 'Lisbon' },
      { name: 'Madeira Airport', country: 'Portugal', code: 'FNC', icao: 'LPMA', city: 'Madeira' },
      { name: 'Ponta Delgada Airport', country: 'Portugal', code: 'PDL', icao: 'LPPD', city: 'Ponta Delgada' },
      { name: 'Porto Airport', country: 'Portugal', code: 'OPO', icao: 'LPPR', city: 'Porto' },
      { name: 'Bucharest Henri Coanda Airport', country: 'Romania', code: 'OTP', icao: 'LROP', city: 'Bucharest' },
      { name: 'Cluj-Napoca Airport', country: 'Romania', code: 'CLJ', icao: 'LRCL', city: 'Cluj-Napoca' },
      { name: 'Iasi Airport', country: 'Romania', code: 'IAS', icao: 'LRIA', city: 'Iasi' },
      { name: 'Sibiu Airport', country: 'Romania', code: 'SBZ', icao: 'LRSB', city: 'Sibiu' },
      { name: 'Timisoara Airport', country: 'Romania', code: 'TSR', icao: 'LRTR', city: 'Timisoara' },
      { name: 'Krasnodar Airport', country: 'Russia', code: 'KRR', icao: 'URKK', city: 'Krasnodar' },
      { name: 'Moscow Domodedovo Airport', country: 'Russia', code: 'DME', icao: 'UUDD', city: 'Moscow' },
      { name: 'Moscow Sheremetyevo Airport', country: 'Russia', code: 'SVO', icao: 'UUEE', city: 'Moscow' },
      { name: 'Moscow Vnukovo Airport', country: 'Russia', code: 'VKO', icao: 'UUWW', city: 'Moscow' },
      { name: 'Saint Petersburg Pulkovo Airport', country: 'Russia', code: 'LED', icao: 'ULLI', city: 'Saint Petersburg' },
      { name: 'Sochi Airport', country: 'Russia', code: 'AER', icao: 'URSS', city: 'Sochi' },
      { name: 'Belgrade Nikola Tesla Airport', country: 'Serbia', code: 'BEG', icao: 'LYBE', city: 'Belgrade' },
      { name: 'Niš Airport', country: 'Serbia', code: 'INI', icao: 'LYNI', city: 'Niš' },
      { name: 'Bratislava Airport', country: 'Slovakia', code: 'BTS', icao: 'LZIB', city: 'Bratislava' },
      { name: 'Košice Airport', country: 'Slovakia', code: 'KSC', icao: 'LZKZ', city: 'Košice' },
      { name: 'Ljubljana Airport', country: 'Slovenia', code: 'LJU', icao: 'LJLJ', city: 'Ljubljana' },
      { name: 'Alicante Airport', country: 'Spain', code: 'ALC', icao: 'LEAL', city: 'Alicante' },
      { name: 'Almeria Airport', country: 'Spain', code: 'LEI', icao: 'LEAM', city: 'Almeria' },
      { name: 'Asturias Airport', country: 'Spain', code: 'OVD', icao: 'LEAS', city: 'Asturias' },
      { name: 'Barcelona Airport', country: 'Spain', code: 'BCN', icao: 'LEBL', city: 'Barcelona' },
      { name: 'Bilbao Airport', country: 'Spain', code: 'BIO', icao: 'LEBB', city: 'Bilbao' },
      { name: 'Fuerteventura Airport', country: 'Spain', code: 'FUE', icao: 'GCFV', city: 'Fuerteventura' },
      { name: 'Girona Airport', country: 'Spain', code: 'GRO', icao: 'LEGE', city: 'Girona' },
      { name: 'Gran Canaria Airport', country: 'Spain', code: 'LPA', icao: 'GCLP', city: 'Gran Canaria' },
      { name: 'Granada-Jaén Airport', country: 'Spain', code: 'GRX', icao: 'LEGR', city: 'Granada-Jaén' },
      { name: 'Ibiza Airport', country: 'Spain', code: 'IBZ', icao: 'LEIB', city: 'Ibiza' },
      { name: 'Jerez Airport', country: 'Spain', code: 'XRY', icao: 'LEJR', city: 'Jerez' },
      { name: 'La Palma Airport', country: 'Spain', code: 'SPC', icao: 'GCLA', city: 'La Palma' },
      { name: 'Lanzarote Airport', country: 'Spain', code: 'ACE', icao: 'GCRR', city: 'Lanzarote' },
      { name: 'Madrid Barajas Airport', country: 'Spain', code: 'MAD', icao: 'LEMD', city: 'Madrid' },
      { name: 'Malaga Airport', country: 'Spain', code: 'AGP', icao: 'LEMG', city: 'Malaga' },
      { name: 'Menorca Airport', country: 'Spain', code: 'MAH', icao: 'LEMH', city: 'Menorca' },
      { name: 'Palma de Mallorca Airport', country: 'Spain', code: 'PMI', icao: 'LEPA', city: 'Palma de Mallorca' },
      { name: 'Región de Murcia Airport', country: 'Spain', code: 'RMU', icao: 'LEMI', city: 'Región de Murcia' },
      { name: 'Reus Airport', country: 'Spain', code: 'REU', icao: 'LERS', city: 'Reus' },
      { name: 'Santander Airport', country: 'Spain', code: 'SDR', icao: 'LEXJ', city: 'Santander' },
      { name: 'Santiago de Compostela Airport', country: 'Spain', code: 'SCQ', icao: 'LEST', city: 'Santiago de Compostela' },
      { name: 'Seville Airport', country: 'Spain', code: 'SVQ', icao: 'LEZL', city: 'Seville' },
      { name: 'Tenerife North Airport', country: 'Spain', code: 'TFN', icao: 'GCXO', city: 'Tenerife North' },
      { name: 'Tenerife South Airport', country: 'Spain', code: 'TFS', icao: 'GCTS', city: 'Tenerife South' },
      { name: 'Valencia Airport', country: 'Spain', code: 'VLC', icao: 'LEVC', city: 'Valencia' },
      { name: 'Zaragoza Airport', country: 'Spain', code: 'ZAZ', icao: 'LEZG', city: 'Zaragoza' },
      { name: 'Gothenburg Landvetter Airport', country: 'Sweden', code: 'GOT', icao: 'ESGG', city: 'Gothenburg' },
      { name: 'Malmö Airport', country: 'Sweden', code: 'MMX', icao: 'ESMS', city: 'Malmö' },
      { name: 'Stockholm Arlanda Airport', country: 'Sweden', code: 'ARN', icao: 'ESSA', city: 'Stockholm' },
      { name: 'Stockholm Bromma Airport', country: 'Sweden', code: 'BMA', icao: 'ESSB', city: 'Stockholm' },
      { name: 'Stockholm Skavsta Airport', country: 'Sweden', code: 'NYO', icao: 'ESKN', city: 'Stockholm' },
      { name: 'Basel Mulhouse Freiburg Airport', country: 'Switzerland', code: 'BSL', icao: 'LFSB', city: 'Basel' },
      { name: 'Geneva Airport', country: 'Switzerland', code: 'GVA', icao: 'LSGG', city: 'Geneva' },
      { name: 'Zurich Airport', country: 'Switzerland', code: 'ZRH', icao: 'LSZH', city: 'Zurich' },
      { name: 'Adana Airport', country: 'Turkey', code: 'ADA', icao: 'LTAF', city: 'Adana' },
      { name: 'Ankara Esenboga Airport', country: 'Turkey', code: 'ESB', icao: 'LTAC', city: 'Ankara' },
      { name: 'Antalya Airport', country: 'Turkey', code: 'AYT', icao: 'LTAI', city: 'Antalya' },
      { name: 'Dalaman Airport', country: 'Turkey', code: 'DLM', icao: 'LTBS', city: 'Dalaman' },
      { name: 'Istanbul Airport', country: 'Turkey', code: 'IST', icao: 'LTFM', city: 'Istanbul' },
      { name: 'Istanbul Sabiha Gökcen Airport', country: 'Turkey', code: 'SAW', icao: 'LTFJ', city: 'Istanbul' },
      { name: 'Izmir Adnan Menderes Airport', country: 'Turkey', code: 'ADB', icao: 'LTBJ', city: 'Izmir' },
      { name: 'Milas-Bodrum Airport', country: 'Turkey', code: 'BJV', icao: 'LTFE', city: 'Milas-Bodrum' },
      { name: 'Trabzon Airport', country: 'Turkey', code: 'TZX', icao: 'LTCG', city: 'Trabzon' },
      { name: 'Kharkiv Airport', country: 'Ukraine', code: 'HRK', icao: 'UKHH', city: 'Kharkiv' },
      { name: 'Kiev Boryspil Airport', country: 'Ukraine', code: 'KBP', icao: 'UKBB', city: 'Kiev' },
      { name: 'Kiev Zhuliany Airport', country: 'Ukraine', code: 'IEV', icao: 'UKKK', city: 'Kiev' },
      { name: 'Lviv Airport', country: 'Ukraine', code: 'LWO', icao: 'UKLL', city: 'Lviv' },
      { name: 'Odessa Airport', country: 'Ukraine', code: 'ODS', icao: 'UKOO', city: 'Odessa' },
      { name: 'Aberdeen Airport', country: 'United Kingdom', code: 'ABZ', icao: 'EGPD', city: 'Aberdeen' },
      { name: 'Belfast City Airport', country: 'United Kingdom', code: 'BHD', icao: 'EGAC', city: 'Belfast' },
      { name: 'Belfast International Airport', country: 'United Kingdom', code: 'BFS', icao: 'EGAA', city: 'Belfast' },
      { name: 'Birmingham Airport', country: 'United Kingdom', code: 'BHX', icao: 'EGBB', city: 'Birmingham' },
      { name: 'Bristol Airport', country: 'United Kingdom', code: 'BRS', icao: 'EGGD', city: 'Bristol' },
      { name: 'Cardiff Airport', country: 'United Kingdom', code: 'CWL', icao: 'EGFF', city: 'Cardiff' },
      { name: 'East Midlands Airport', country: 'United Kingdom', code: 'EMA', icao: 'EGNX', city: 'East Midlands' },
      { name: 'Edinburgh Airport', country: 'United Kingdom', code: 'EDI', icao: 'EGPH', city: 'Edinburgh' },
      { name: 'Exeter Airport', country: 'United Kingdom', code: 'EXT', icao: 'EGTE', city: 'Exeter' },
      { name: 'Glasgow Airport', country: 'United Kingdom', code: 'GLA', icao: 'EGPF', city: 'Glasgow' },
      { name: 'Glasgow Prestwick Airport', country: 'United Kingdom', code: 'PIK', icao: 'EGPK', city: 'Glasgow' },
      { name: 'Jersey Airport', country: 'United Kingdom', code: 'JER', icao: 'EGJJ', city: 'Jersey' },
      { name: 'Leeds Bradford Airport', country: 'United Kingdom', code: 'LBA', icao: 'EGNM', city: 'Leeds Bradford' },
      { name: 'Liverpool Airport', country: 'United Kingdom', code: 'LPL', icao: 'EGGP', city: 'Liverpool' },
      { name: 'London City Airport', country: 'United Kingdom', code: 'LCY', icao: 'EGLC', city: 'London' },
      { name: 'London Gatwick Airport', country: 'United Kingdom', code: 'LGW', icao: 'EGKK', city: 'London' },
      { name: 'London Heathrow Airport', country: 'United Kingdom', code: 'LHR', icao: 'EGLL', city: 'London' },
      { name: 'London Luton Airport', country: 'United Kingdom', code: 'LTN', icao: 'EGGW', city: 'London' },
      { name: 'London Southend Airport', country: 'United Kingdom', code: 'SEN', icao: 'EGMC', city: 'London' },
      { name: 'London Stansted Airport', country: 'United Kingdom', code: 'STN', icao: 'EGSS', city: 'London' },
      { name: 'Manchester Airport', country: 'United Kingdom', code: 'MAN', icao: 'EGCC', city: 'Manchester' },
      { name: 'Newcastle Airport', country: 'United Kingdom', code: 'NCL', icao: 'EGNT', city: 'Newcastle' },
      { name: 'Southampton Airport', country: 'United Kingdom', code: 'SOU', icao: 'EGHI', city: 'Southampton' },
  ]);


  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      city: any;
      code: string;
      name: string;
      country: any;
    }[]
  >([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);

    if (newValue === "") {
        localStorage.setItem("STRING_VALUE_TO", "");
        setSuggestions([]);
        return;
      }


    const isValidAirportCode = /^[A-Z]{1,3}$/.test(newValue);

    if (isValidAirportCode || newValue.length >= 3) {
      const matchingAirports: {
        code: string;
        name: string;
        city: string;
        country: string;
      }[] = airportData.filter(
        (airport) =>
          airport.code.toUpperCase().startsWith(newValue) ||
          airport.name.toUpperCase().startsWith(newValue) ||
          airport.city.toUpperCase().startsWith(newValue) ||
          airport.country.toUpperCase().startsWith(newValue)
      );

      setSuggestions(matchingAirports);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (code: string, city: string) => {
    setInputValue(`${code}, ${city}`);
    setSuggestions([]);
    localStorage.setItem("STRING_VALUE_TO", code);
    
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      e.preventDefault();
      const selectedSuggestion = suggestions[selectedSuggestionIndex];
      handleSuggestionClick(selectedSuggestion.code, selectedSuggestion.city);
    }
  };

  useEffect(() => {
    const handleDocumentMouseDown = (e: MouseEvent) => {
      if (
        (containerRef.current && containerRef.current.contains(e.target as Node)) ||
        (suggestionsRef.current && suggestionsRef.current.contains(e.target as Node))
      ) {
        return;
      }

      if (suggestions.length > 0) {
        const firstSuggestion = suggestions[0];
        handleSuggestionClick(firstSuggestion.code, firstSuggestion.city);
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [suggestions]);
  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative", 
        }}
      >
        <TextField
          margin="normal"
          required
          id="Depart To"
          label="Depart to"
          name="Depart to"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            style={{
              position: "absolute",
              top: "90%", 
              left: 0,
              zIndex: 1, 
              width: "200%", 
              backgroundColor: "white", 
              borderRadius: "5px 5px 5px 5px", 
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", 
              maxHeight: "500px", 
              overflowY: "auto",
              
            }}
          >
            <List>
              {suggestions.map((airport, index) => (
                <ListItem
                  key={airport.code}
                  button
                  onClick={() => handleSuggestionClick(airport.code, airport.city)}
                  selected={index === selectedSuggestionIndex}
                >
                  <ListItemText
                    primary={`${airport.code} - ${airport.name} (${airport.city}, ${airport.country})`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Box>
    </Container>
  );
};


export default DepartToInput;
