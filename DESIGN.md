---
version: alpha
name: Poľný tábor rytiera Andreasa (PTRA)
description: Rytiersky, kráľovský, tajomný a čarovný vizuálny jazyk festivalu — tmavé filmové pozadie, zlatá koruna detailov, karmínová sila akcií.
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
  surface-panel: "#141A26"
  text-on-dark: "#EBE4D6"
  text-muted: "#C9C0B0"
  ink: "#1C1917"
  link: "#E4C992"
  link-hover: "#F2E4CC"
  border-gold: "#AE884C"
  focus: "#FFCB00"
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
  headline-sm:
    fontFamily: Cinzel
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.58
  body-md:
    fontFamily: Source Sans 3
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.62
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.1em
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
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.md}"
    padding: 16px
  nav-link:
    textColor: "{colors.tertiary-bright}"
    typography: "{typography.label-md}"
  section-title:
    textColor: "{colors.tertiary}"
    typography: "{typography.headline-md}"
  input-field:
    backgroundColor: "{colors.surface-dark-2}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 12px
---

## Overview

Vizuálny jazyk **Poľného tábora rytiera Andreasa** je rytiersky, kráľovský, tajomný a zároveň čarovný. Stránka má pôsobiť ako večerný tábor pod bránou hradu: hlboká tma, zlaté svetlo pochodní, karmínové plamene dôležitých rozhodnutí a jemná zelená prírody v pozadí.

Nie sme „čistý minimalizmus“ ani kreslená rozprávka — sme **filmová stredoveká fantasy** s remeselnou dôstojnosťou. Hero a navigácia môžu žiariť výraznejšie; obsah (texty, formuláre, šachové úlohy) musí zostať pokojný, čitateľný a jednotný.

## Colors

Paleta je postavená na kontraste tmavých plôch a teplých kovových akcentov:

- **Primary (#D9241C):** karmínová krv a oheň — hlavné CTA, dôležité výzvy, varovania. Kráľovská sila bez krikľavosti.
- **Secondary (#329932):** lesná zeleň — harmonogram, pozitívne stavy, jemná prírodná magia okolia Pod vlekom.
- **Tertiary (#FFCB00):** korunné zlato — nadpisy sekcií, navigácia, časové údaje, „čarovné“ detaily.
- **Neutral (#FFEED2):** pergamen — svetlý text na tmavom, tlačidlá, vstupy.
- **Surface dark (#0E1219 / #0A0C12):** nočné nebo tábora — pozadie stránky, panely, karty.

V prose môžete hovoriť o „korunnom zlate“ (tertiary), „karmínovom plameni“ (primary) a „nočnom kameni“ (surface).

## Typography

Tri rodiny, tri role — nikdy viac na jednej obrazovke:

- **Cinzel** — nadpisy, erb, rytierska autorita (`headline-*`).
- **Source Sans 3** — odstavce, popisy, formuláre, šachové vysvetlenia (`body-*`).
- **Montserrat** — navigácia, tlačidlá, štítky, meta text (`label-*`).

Nepoužívajte Cormorant ani iné serifové fonty v UI — narúšajú jednotu.

## Layout

Stupnica medzier: 4 → 8 → 16 → 24 → 32 → 48 px. Obsah v `page-main` je centrovaný, sekcie sú oddelené panelmi s jemným zlatým obrysom.

Mobil: jeden stĺpec, horizontálna navigácia s posuvom, dosky a formuláre na plnú šírku.

## Elevation & Depth

Hĺbka cez **vrstvené tmavé gradienty** a jemný vnútorný lesk zlata — nie materiálové tieňe Material Design. Karty sú o niečo svetlejšie ako pozadie sekcie; hero je najdramatickejší.

Žiara (ember pulse) je povolená len na hero CTA a tlačidlách Podpor / Prispieť.

## Shapes

Radius **6px** pre karty, tlačidlá a formuláre; **4px** pre vstupy. Dekoratívne hero prvky môžu mať ostré heraldické hrany (kicker bez radius). Žiadne veľké pill buttony okrem počítadiel.

## Components

- **Buttons:** primár = karmínový gradient + pergamenový text; outline = tmavý panel + zlatý okraj.
- **Cards / sekcie:** `surface-panel` gradient, okraj `border-gold`, nadpis v zlate.
- **Navigation:** zlaté linky na tmavom kamennom podklade (`vy-navbar-bg`).
- **Forms:** tmavé polia, zlatý focus ring, labely v Montserrat.
- **Šach / Taktika:** rovnaké karty ako zvyšok webu; doska v zlatom ráme.

## Do's and Don'ts

- Do drž všetky stránky v triede `home-page` a jednotnom tmavom skin-e.
- Do používaj len tokeny z frontmatter; pri novej farbe aktualizuj DESIGN.md aj `css/design-language.css`.
- Do udržiavaj WCAG AA kontrast pre bežný text.
- Don't nepoužívaj svetlé pergamenové pozadia kariet (legacy prihlášky) — všetko je tmavý panel.
- Don't nemiešaj burgundy odkazy v texte — odkazy sú zlaté (`link`).
- Don't nepoužívaj viac ako tri fonty alebo náhodné `#hex` mimo tokenov.
