# Data Sources & Methodology

This document outlines the data sources and methodologies used in the IPPS Setu Government Dashboard, specifically concerning the Startup Registry and AI Matching Engine.

## DPIIT Recognized Startups Data

**Dataset Reference Name:** DPIIT Recognized Startups (Proxy)
**Official Source:** Government of India Open Government Data Platform (data.gov.in) / Startup India
**Usage in Application:** Populates the `StartupsPage` and the matching variables in `GovMatchingPage`.

### Methodology & Constraints
Due to the private nature of granular, line-by-line startup data (names, contact info, CIN numbers), official datasets available on `data.gov.in` typically provide aggregated metrics (e.g., total startups recognized per State or Sector).

To fulfill the requirement for realistic data while adhering to privacy and open-data constraints, the application uses a **proxy dataset**. This dataset is strictly modeled on the exact schema and categorization standards used by DPIIT:

- **State/Location:** Reflects actual Indian states and union territories.
- **Sectors:** Reflects official DPIIT recognized sectors (e.g., Information Technology, Aerospace, Defense, Healthcare).
- **Technologies:** Models deep-tech subcategories (AI, Computer Vision, Robotics).
- **DPIIT Recognition:** Realistic format strings (e.g., `DIPP12345`).

### Derived Metrics (AI Matching Engine)
The Matching Engine calculates a compatibility score between a government challenge and a startup profile.

- **Values used:** Sector, Technology, Location, and Experience level.
- **Calculation:** The overall score is a derived metric calculated algorithmically on the frontend based on the intersection of the startup's attributes and the challenge's requirements. This is explicitly labeled as an *application-calculated score* in the UI to distinguish it from official government ratings.
