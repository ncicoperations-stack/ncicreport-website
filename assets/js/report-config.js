/**
 * ============================================================
 * NCIC Report Configuration
 * File: report-config.js
 * Version: 1.0
 *
 * Defines:
 * - Report Types
 * - Step 3 Configuration
 * - Preview Sections
 * - Hidden Defaults
 * ============================================================
 */

"use strict";

const REPORT_CONFIG = {

    /* =========================================================
       ONLINE SCAM
    ========================================================= */

    "online-scam": {

        title: "Online Scam Report",

        step3Title: "Online Scam Details",

        fields: [

            "ScamType",
            "PlatformUsed",
            "PaymentMethod",
            "AmountLost",
            "Currency"

        ]

    },

    /* =========================================================
       IDENTITY THEFT
    ========================================================= */

    "identity-theft": {

        title: "Identity Theft Report",

        step3Title: "Identity Theft Details",

        fields: [

            "IdentityType",
            "CompromisedInformation",
            "FraudDiscovered",
            "FinancialLoss",
            "AuthoritiesContacted"

        ]

    },

    /* =========================================================
       FINANCIAL FRAUD
    ========================================================= */

    "financial-fraud": {

        title: "Financial Fraud Report",

        step3Title: "Financial Fraud Details",

        fields: [

            "FraudType",
            "FinancialInstitution",
            "PaymentMethod",
            "AmountLost",
            "Currency"

        ]

    },

    /* =========================================================
       CYBERCRIME
    ========================================================= */

    "cybercrime": {

        title: "Cybercrime Report",

        step3Title: "Cybercrime Details",

        fields: [

            "AttackType",
            "AffectedDevice",
            "OperatingSystem",
            "DataCompromised",
            "EvidenceAvailable"

        ]

    },

    /* =========================================================
       ROMANCE SCAM
    ========================================================= */

    "romance-scam": {

        title: "Romance Scam Report",

        step3Title: "Romance Scam Details",

        fields: [

            "PlatformUsed",
            "RelationshipDuration",
            "MoneySent",
            "AmountLost",
            "Currency"

        ]

    },

    /* =========================================================
       CHILD EXPLOITATION
    ========================================================= */

    "child-exploitation": {

        title: "Child Exploitation Report",

        step3Title: "Child Exploitation Details",

        fields: [

            "PlatformUsed",
            "ContentType",
            "VictimAge",
            "EvidenceAvailable",
            "LawEnforcementContacted"

        ]

    },

    /* =========================================================
       OTHER
    ========================================================= */

    "other": {

        title: "Other Report",

        step3Title: "Additional Information",

        fields: [

            "IncidentCategory",
            "AdditionalDetails"

        ]

    }

};

/* =============================================================
   COMMON SECTIONS
============================================================= */

const REPORT_SECTIONS = [

    {

        title: "Personal Information",

        fields: [

            "FirstName",
            "MiddleName",
            "LastName",
            "Age",
            "Email",
            "Phone",
            "City",
            "State",
            "ZIPCode"

        ]

    },

    {

        title: "Incident Information",

        fields: [

            "IncidentDate",
            "IncidentLocation",
            "IncidentDescription"

        ]

    }

];

/* =============================================================
   BACKEND DEFAULTS
============================================================= */

const REPORT_DEFAULTS = {

    Status: "Pending Review",

    Source: "Website"

};

/* =============================================================
   HELPERS
============================================================= */

function getReportConfig(reportType) {

    return REPORT_CONFIG[reportType] || null;

}

function getReportSections() {

    return REPORT_SECTIONS;

}

function getReportDefaults() {

    return REPORT_DEFAULTS;

}
