window.REPORT_CONFIG = {
  "online-scam": {
    title: "Online Scam Report",
    sheet: "Online Scam",
    fields: [
      "ScamType",
      "PlatformUsed",
      "WebsiteURL",
      "Username",
      "PaymentMethod",
      "AmountLost",
      "Currency"
    ]
  },

  "identity-theft": {
    title: "Identity Theft Report",
    sheet: "Identity Theft",
    fields: [
      "IdentityType",
      "CompromisedInformation",
      "FraudDiscovered",
      "FinancialLoss",
      "AuthoritiesContacted"
    ]
  },

  "financial-fraud": {
    title: "Financial Fraud Report",
    sheet: "Financial Fraud",
    fields: [
      "FraudType",
      "FinancialInstitution",
      "AccountType",
      "TransactionAmount",
      "Currency",
      "TransactionDate"
    ]
  },

  "cybercrime": {
    title: "Cybercrime Report",
    sheet: "Cybercrime",
    fields: [
      "CrimeType",
      "TargetSystem",
      "AffectedDevice",
      "OperatingSystem",
      "EvidenceAvailable"
    ]
  },

  "romance-scam": {
    title: "Romance Scam Report",
    sheet: "Romance Scam",
    fields: [
      "PlatformMet",
      "RelationshipDuration",
      "MoneySent",
      "AmountLost",
      "Currency"
    ]
  },

  "child-exploitation": {
    title: "Child Exploitation Report",
    sheet: "Child Exploitation",
    fields: [
      "Platform",
      "ContentType",
      "VictimAge",
      "EvidenceAvailable",
      "ReportedElsewhere"
    ]
  },

  "other": {
    title: "Other Report",
    sheet: "Other Reports",
    fields: [
      "Category",
      "Details"
    ]
  }
};
window.getReportConfig = function (reportType) {
    return window.REPORT_CONFIG[reportType] || null;
};
