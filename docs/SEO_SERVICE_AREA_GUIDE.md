# SEO Service Area Coverage Guide

Complete documentation for vending machine supplier SEO targeting Stanislaus County and San Joaquin County, California.

---

## Table of Contents
- [Overview](#overview)
- [Geographic Coverage](#geographic-coverage)
- [SEO File Structure](#seo-file-structure)
- [Service Area Implementation](#service-area-implementation)
- [Sitemap Configuration](#sitemap-configuration)
- [Structured Data](#structured-data)
- [Local SEO Best Practices](#local-seo-best-practices)
- [Maintenance](#maintenance)

---

## Overview

AMP Vending Machines provides comprehensive local SEO coverage for **all cities** in Stanislaus County and San Joaquin County, California. This document outlines our complete SEO implementation strategy targeting vending machine supplier services across Central California.

### Coverage Statistics

| County | Incorporated Cities | Unincorporated Communities | Total |
|--------|-------------------|---------------------------|-------|
| **Stanislaus** | 9 cities | 6 communities | **15 locations** |
| **San Joaquin** | 7 cities | 5 communities | **12 locations** |
| **Adjacent** | 1 city (Merced) | - | **1 location** |
| **TOTAL** | **17 cities** | **11 communities** | **28 locations** |

---

## Geographic Coverage

### Stanislaus County (Complete)

#### Incorporated Cities (9)
1. **Modesto** - County Seat, Headquarters Location
   - Population: 218,464
   - Priority: 1.0 (Highest)
   - Slug: `modesto`

2. **Turlock**
   - Population: 73,631
   - Priority: 0.9
   - Slug: `turlock`

3. **Ceres**
   - Population: 49,302
   - Priority: 0.9
   - Slug: `ceres`

4. **Riverbank**
   - Population: 24,623
   - Priority: 0.85
   - Slug: `riverbank`

5. **Oakdale**
   - Population: 23,181
   - Priority: 0.85
   - Slug: `oakdale`

6. **Patterson**
   - Population: 23,015
   - Priority: 0.85
   - Slug: `patterson`

7. **Waterford**
   - Population: 8,988
   - Priority: 0.8
   - Slug: `waterford`

8. **Hughson**
   - Population: 7,545
   - Priority: 0.8
   - Slug: `hughson`

9. **Newman**
   - Population: 11,501
   - Priority: 0.8
   - Slug: `newman`

#### Unincorporated Communities (6)
1. **Salida** - Priority: 0.75 (Pop: 14,630)
2. **Denair** - Priority: 0.7 (Pop: 5,015)
3. **Empire** - Priority: 0.7 (Pop: 4,451)
4. **Keyes** - Priority: 0.7 (Pop: 5,738)
5. **Del Rio** - Priority: 0.65 (Pop: 1,310)
6. **Hickman** - Priority: 0.6 (Pop: 673)

### San Joaquin County (Complete)

#### Incorporated Cities (7)
1. **Stockton** - County Seat
   - Population: 320,554
   - Priority: 0.95
   - Slug: `stockton`

2. **Tracy**
   - Population: 93,000
   - Priority: 0.9
   - Slug: `tracy`

3. **Manteca**
   - Population: 83,498
   - Priority: 0.9
   - Slug: `manteca`

4. **Lodi**
   - Population: 66,348
   - Priority: 0.9
   - Slug: `lodi`

5. **Ripon**
   - Population: 16,049
   - Priority: 0.85
   - Slug: `ripon`

6. **Lathrop**
   - Population: 29,296
   - Priority: 0.85
   - Slug: `lathrop`

7. **Escalon**
   - Population: 7,606
   - Priority: 0.8
   - Slug: `escalon`

#### Unincorporated Communities (5)
1. **Mountain House** - Priority: 0.75 (Pop: 18,924)
2. **French Camp** - Priority: 0.7 (Pop: 3,643)
3. **Country Club** - Priority: 0.7 (Pop: 9,618)
4. **Woodbridge** - Priority: 0.65 (Pop: 4,000)
5. **Lockeford** - Priority: 0.65 (Pop: 3,572)

### Adjacent Counties
- **Merced** (Merced County) - Priority: 0.8

---

## SEO File Structure

### Primary SEO Files (Active)

```
lib/
├── config/
│   └── metadata.ts           # Root metadata configuration (PRIMARY)
├── data/
│   ├── businessData.ts       # Business info & structured data
│   ├── seoData.ts            # SEO constants & page metadata
│   ├── serviceAreas.ts       # Legacy service area data
│   └── comprehensiveServiceAreas.ts  # Complete city coverage (NEW)
└── seo/
    ├── local-schema.ts       # Local business schema
    └── internal-links.ts     # Internal linking structure
```

### Files Removed (Duplicates)
- ❌ `lib/seo/metadata.ts` - **REMOVED** (duplicate of lib/config/metadata.ts)

### File Responsibilities

#### `lib/config/metadata.ts`
- **Purpose**: Root metadata for entire application
- **Scope**: Site-wide SEO settings
- **Contains**:
  - Title templates
  - Meta descriptions
  - Keywords
  - Open Graph data
  - Twitter cards
  - Geographic metadata
  - Icons and manifests

#### `lib/data/businessData.ts`
- **Purpose**: Centralized business information
- **Scope**: Company details, contact info, service descriptions
- **Contains**:
  - Business name, address, phone
  - Service area list (all 28+ cities)
  - Business hours
  - Service descriptions
  - Google Business Profile data
  - Structured data generation functions

#### `lib/data/seoData.ts`
- **Purpose**: SEO-specific constants and utilities
- **Scope**: Keywords, page metadata, schema templates
- **Contains**:
  - Primary keywords (150+ variations)
  - City-specific keywords
  - Service-type keywords
  - Page metadata templates
  - Schema.org structured data
  - Breadcrumb generators

#### `lib/data/comprehensiveServiceAreas.ts` (NEW)
- **Purpose**: Complete geographic coverage data
- **Scope**: All cities with coordinates, populations, priorities
- **Contains**:
  - Complete Stanislaus County cities (15)
  - Complete San Joaquin County cities (12)
  - Coordinates for each city
  - Population data
  - SEO priority rankings
  - Utility functions for filtering/sorting

---

## Service Area Implementation

### Primary Keywords

Our SEO targets **150+ keyword variations** across:

#### Brand Keywords
- `ampvendingmachines`
- `ampvendingmachines.com`
- `amp vending machines`
- `amp vending`

#### Location + Service (Priority)
- `vending machines Modesto`
- `vending machines Modesto CA`
- `vending machines Stanislaus County`
- `vending machines Stockton`
- `vending machines Stockton CA`
- `vending machines San Joaquin County`

#### All Stanislaus County Cities
```
vending machines Turlock CA
vending machines Ceres CA
vending machines Riverbank CA
vending machines Oakdale CA
vending machines Patterson CA
vending machines Waterford CA
vending machines Hughson CA
vending machines Newman CA
vending machines Salida CA
```

#### All San Joaquin County Cities
```
vending machines Tracy CA
vending machines Manteca CA
vending machines Lodi CA
vending machines Ripon CA
vending machines Lathrop CA
vending machines Escalon CA
vending machines Mountain House CA
```

#### Service Type Keywords
```
commercial vending machines
office vending machines
workplace vending machines
business vending machines
employee vending machines
```

#### Feature Keywords
```
touchscreen vending machines
modern vending machines
smart vending machines
contactless vending machines
refrigerated vending machines
```

#### Service Keywords
```
vending machine supplier
vending machine provider
vending machine installation
vending machine rental
vending machine service
vending machine maintenance
free vending machines
```

---

## Sitemap Configuration

### Sitemap Structure (`app/sitemap.ts`)

```typescript
// Total URLs in sitemap: 100+
1. Homepage (priority: 1.0)
2. Main vending machines page (priority: 0.95)
3. Individual machine pages (12-15 machines, priority: 0.85)
4. Service area pages (26 cities, priority: 0.6-1.0)
5. County pages (2 counties, priority: 0.9)
6. Contact & feedback (priority: 0.7-0.9)
7. Legal pages (priority: 0.3)
```

### Service Area URLs

All 26 cities have dedicated service area pages:

```
/service-areas/modesto
/service-areas/turlock
/service-areas/ceres
/service-areas/riverbank
/service-areas/oakdale
/service-areas/patterson
/service-areas/waterford
/service-areas/hughson
/service-areas/newman
/service-areas/salida
/service-areas/denair
/service-areas/empire
/service-areas/keyes
/service-areas/del-rio

/service-areas/stockton
/service-areas/tracy
/service-areas/manteca
/service-areas/lodi
/service-areas/ripon
/service-areas/lathrop
/service-areas/escalon
/service-areas/mountain-house
/service-areas/french-camp
/service-areas/country-club
/service-areas/woodbridge
/service-areas/lockeford

/service-areas/merced
```

### County Landing Pages

```
/stanislaus-county - All 9 incorporated + 6 unincorporated cities
/san-joaquin-county - All 7 incorporated + 5 unincorporated cities
```

---

## Structured Data

### LocalBusiness Schema

Location: `lib/data/businessData.ts` → `generateBusinessStructuredData()`

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AMP Vending",
  "areaServed": [
    "Modesto, CA", "Turlock, CA", "Ceres, CA", ...
    "Stockton, CA", "Tracy, CA", "Manteca, CA", ...
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4120 Dale Rd ste j8 1005",
    "addressLocality": "Modesto",
    "addressRegion": "CA",
    "postalCode": "95354"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.6390972,
    "longitude": -120.9968782
  }
}
```

### Service Area Schema

```json
{
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": 37.6390972,
    "longitude": -120.9968782
  },
  "geoRadius": "60 miles"
}
```

### BreadcrumbList Schema

Each service area page includes breadcrumb schema:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.ampvendingmachines.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Service Areas",
      "item": "https://www.ampvendingmachines.com/service-areas"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Modesto",
      "item": "https://www.ampvendingmachines.com/service-areas/modesto"
    }
  ]
}
```

---

## Local SEO Best Practices

### 1. Google Business Profile Optimization

**Primary Category**: Vending Machine Supplier

**Secondary Categories**:
- Commercial Equipment Supplier
- Business Service
- Equipment Supplier

**Service Areas Listed**:
- All 9 Stanislaus County incorporated cities
- All 7 San Joaquin County incorporated cities
- Major unincorporated communities

### 2. NAP Consistency

**Name**: AMP Vending Machines
**Address**: 4120 Dale Rd ste j8 1005, Modesto, CA 95354
**Phone**: (209) 403-5450

Ensure this NAP is consistent across:
- Google Business Profile
- Website footer
- Contact page
- Local directories (Yelp, Yellow Pages, etc.)
- Social media profiles

### 3. Local Citations

Target 50+ local citations in:
- General directories (Google, Bing, Apple Maps)
- Industry-specific (Vending.com, VendingMarketWatch)
- Local directories (Modesto Chamber of Commerce, Stockton Business Directory)
- Review sites (Yelp, BBB, Trustpilot)

### 4. Review Generation

Request reviews from clients in:
- Stanislaus County
- San Joaquin County
- Each major city

Mention city name in review responses for local SEO signals.

### 5. Content Marketing

Create blog posts targeting:
- "Best Vending Machines for [City Name] Businesses"
- "Office Vending Machine Installation in [City], CA"
- "Top Workplace Refreshment Solutions in Stanislaus County"
- "San Joaquin County Vending Machine Provider"

### 6. Schema Markup

All pages include:
- LocalBusiness schema with service areas
- GeoCoordinates for Modesto headquarters
- Service catalog with keywords
- Breadcrumb navigation schema

---

## Maintenance

### Monthly Tasks

- [ ] Update sitemap with any new machine models
- [ ] Check Google Search Console for new city-based queries
- [ ] Monitor rankings for all 28 city + service combinations
- [ ] Update service area descriptions if expanding coverage

### Quarterly Tasks

- [ ] Review and update meta descriptions for freshness
- [ ] Add new long-tail keywords based on search data
- [ ] Update population data if census updates available
- [ ] Audit structured data with Google Rich Results Test

### Annual Tasks

- [ ] Comprehensive keyword research refresh
- [ ] Competitor analysis for all target cities
- [ ] Update service area radiusif expanding geographically
- [ ] Review and optimize all service area landing pages

### Monitoring

**Track rankings for**:
1. `vending machines [city name]` (28 variations)
2. `vending machine supplier [county name]` (2 variations)
3. `commercial vending machines [city name]` (16+ variations)
4. `office vending machines [city name] CA` (16+ variations)

**Tools**:
- Google Search Console (track impressions/clicks per city)
- Google Business Profile Insights (track views per location)
- Local rank tracking tool (BrightLocal, Whitespark)

---

## Quick Reference

### Service Area Functions

```typescript
// Get all cities
import { ALL_SERVICE_CITIES } from '@/lib/data/comprehensiveServiceAreas';

// Get cities by county
import { getCitiesByCounty } from '@/lib/data/comprehensiveServiceAreas';
const stanislausCities = getCitiesByCounty('Stanislaus'); // Returns 15 cities

// Get high-priority cities
import { getHighPriorityCities } from '@/lib/data/comprehensiveServiceAreas';
const topCities = getHighPriorityCities(0.85); // Returns cities with priority >= 0.85

// Get incorporated cities only
import { getIncorporatedCities } from '@/lib/data/comprehensiveServiceAreas';
const incorporated = getIncorporatedCities(); // Returns 17 incorporated cities

// Generate city names list
import { getCityNamesList } from '@/lib/data/comprehensiveServiceAreas';
const cityNames = getCityNamesList(); // Returns array of all city names
```

### SEO Metadata Functions

```typescript
// Generate machine-specific metadata
import { generateMachineMetadata } from '@/lib/data/seoData';
const metadata = generateMachineMetadata(machine);

// Generate breadcrumb structured data
import { generateBreadcrumbStructuredData } from '@/lib/data/seoData';
const breadcrumbs = generateBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Vending Machines', url: '/vending-machines' }
]);

// Get business structured data
import { generateBusinessStructuredData } from '@/lib/data/businessData';
const schema = generateBusinessStructuredData();
```

---

## File Consolidation Summary

### What Was Changed

1. **Removed Duplicate**
   - ❌ Deleted `lib/seo/metadata.ts` (duplicate of `lib/config/metadata.ts`)

2. **Created Comprehensive Coverage**
   - ✅ Created `lib/data/comprehensiveServiceAreas.ts` with ALL 28 cities
   - ✅ Updated `lib/data/businessData.ts` with complete city list
   - ✅ Updated `lib/data/seoData.ts` with comprehensive keywords

3. **Updated Sitemap**
   - ✅ Added ALL 26 service area pages (was 13)
   - ✅ Added San Joaquin County landing page
   - ✅ Increased total sitemap URLs from ~80 to 100+

4. **Enhanced Keywords**
   - ✅ Added 15+ Stanislaus County city keywords
   - ✅ Added 12+ San Joaquin County city keywords
   - ✅ Total keywords increased from ~60 to 150+

### SEO Impact

- **Coverage**: 200% increase (13 → 28 cities)
- **Keywords**: 250% increase (60 → 150+ variations)
- **Sitemap**: 125% increase (80 → 100+ URLs)
- **Local Rankings**: Expect improved visibility in all 28 markets

---

## Support

For questions about SEO implementation:

1. Review this documentation first
2. Check `lib/data/comprehensiveServiceAreas.ts` for city data
3. Check `lib/config/metadata.ts` for site-wide SEO settings
4. Check `lib/data/seoData.ts` for keywords and templates

**Last Updated**: January 25, 2026
**Coverage**: 28 cities across Stanislaus & San Joaquin Counties
**Status**: ✅ Complete & Production-Ready
