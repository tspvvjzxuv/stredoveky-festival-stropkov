---
version: alpha
name: Stredoveky Festival Stropkov
description: Dark medieval-fantasy visual system for the festival website with warm gold and crimson accents.
colors:
  primary: "#D9241C"
  primary-dark: "#A11C16"
  primary-mid: "#E23A33"
  secondary: "#329932"
  tertiary: "#FFCB00"
  tertiary-dim: "#C79D00"
  tertiary-bright: "#FFE066"
  neutral: "#FFEED2"
  surface-dark: "#0E1219"
  surface-dark-2: "#0A0C12"
  text-on-dark: "#EBE4D6"
  text-muted: "#E8E2D6"
  ink: "#1C1917"
  black: "#0A0A0A"
typography:
  headline-lg:
    fontFamily: Cinzel
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0.04em
  headline-md:
    fontFamily: Cinzel
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.035em
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.58
    letterSpacing: 0.01em
  body-md:
    fontFamily: Source Sans 3
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: 0.01em
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 10px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-mid}"
    textColor: "{colors.neutral}"
  button-outline:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-md}"
  card-default:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.md}"
    padding: 16px
  nav-link:
    textColor: "{colors.tertiary}"
    typography: "{typography.label-md}"
  section-title:
    textColor: "{colors.tertiary}"
    typography: "{typography.headline-md}"
---

## Overview

Vizuálny jazyk festivalu je tmavý, filmový a stredoveko-fantasy. Stránka má pôsobiť slávnostne, historicky a remeselne, nie minimalisticky. Základ je hlboké tmavé pozadie so zlatými svetelnými akcentmi a červeným dôrazom pre hlavné akcie.

Pri bežnom obsahu preferuj vysokú čitateľnosť, pokojné kontrasty a konzistentné rytmy medzier. Hero, navigácia a CTA môžu byť dramatickejšie, ale zvyšok rozhrania musí zostať stabilný a čitateľný.

## Colors

Farebný systém je postavený na trojici rolí:

- **Primary:** karmínovo-červená pre hlavné akcie, dôležité CTA a stavové dôrazy.
- **Secondary:** lesná zelená pre doplnkové zvýraznenia, pozitívne signály a atmosférické prvky.
- **Tertiary:** zlatá pre titulky, ikonické detaily a orientačné body rozhrania.
- **Neutral:** pergamenové tóny pre svetlý text, jemné vrstvy a kontrast voči tmavému pozadiu.

## Typography

Typografia kombinuje výrazný historický charakter s modernou čitateľnosťou:

- **Headlines:** `Cinzel` pre titulky a sekčné nadpisy.
- **Body:** `Source Sans 3` pre text odstavcov, vysvetlení a formulárov.
- **UI Labels:** `Montserrat` pre tlačidlá, navigáciu a krátke systémové štítky.

Nadpisy majú jemne zvýšené rozostupy písmen; text tela zostáva neutrálne čitateľný bez dekoratívneho preťaženia.

## Layout

Layout využíva konzistentnú stupnicu medzier (4/8/16/24/32/48), centrálne zarovnaný obsahový kontajner a oddelené obsahové sekcie s vizuálnymi panelmi. Hero a hlavička sú výraznejšie vrstvené, ale hlavný obsah zostáva modulárny a pravidelný.

Na menších zariadeniach sa navigácia a akčné prvky skladajú do jednoduchších blokov bez straty hierarchie.

## Elevation & Depth

Hĺbka je riešená najmä jemnými tieňmi, gradientmi a vnútorným leskom zlatých detailov. Namiesto ostrých materiálových tieňov sa používa mäkká, filmová atmosféra.

Pre dôležité prvky (karty, CTA, sticky hlavička) je dovolená mierne vyššia elevácia, no stále v tmavom rozsahu bez agresívneho kontrastu.

## Shapes

Tvarový jazyk používa malé až stredné radiusy (`4px` až `10px`) a občasné ostré dekoratívne hrany v hero/nav prvkoch. Väčšina interaktívnych komponentov (tlačidlá, karty, formuláre) drží konzistentný radius `6px`.

## Components

Kľúčové komponentové pravidlá:

- **Buttons:** primárne CTA sú červeno-zlaté, sekundárne tlačidlá tmavé so zeleno-zlatým akcentom.
- **Cards:** tmavé vrstvené panely s jemným svetlým vnútorným leskom.
- **Navigation:** zlaté labely na tmavom podklade, bez silného rušivého podsvietenia.
- **Section Titles:** nadpisy sú zlaté, výrazné a konzistentné naprieč sekciami.
- **Forms:** tmavé pozadie vstupov, zlatý focus ring pre jasný stav zamerania.

## Do's and Don'ts

- Do používaj červenú (`primary`) len pre najdôležitejšie akcie alebo varovania.
- Do udržiavaj minimálne WCAG AA kontrasty pre text voči tmavému pozadiu.
- Do drž jednotný rytmus medzier podľa tokenov `spacing`.
- Don't nemiešaj veľa rôznych tieňových štýlov v tej istej sekcii.
- Don't nepoužívaj viac ako 2 dekoratívne fonty na jednej obrazovke.
- Don't nepoužívaj nové odtiene zlata/červenej mimo definovaných tokenov bez aktualizácie tohto dokumentu.
