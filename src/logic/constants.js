export const INDUSTRIES = [
  { id: 'fintech', label: 'FinTech / Banking' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'saas', label: 'Technology / SaaS' },
  { id: 'ecommerce', label: 'E-commerce / Retail' },
  { id: 'agency', label: 'Agency / Professional Services' },
  { id: 'manufacturing', label: 'Manufacturing / Industrial' },
  { id: 'education', label: 'Education' },
  { id: 'government', label: 'Government / Public Sector' },
  { id: 'energy', label: 'Energy / Utilities' },
  { id: 'other', label: 'Other' }
];

export const REGIONS = [
  { id: 'us', label: 'United States (US)' },
  { id: 'eu', label: 'European Union (EU)' },
  { id: 'uae', label: 'UAE / Middle East' },
  { id: 'apac', label: 'Asia Pacific (APAC)' },
  { id: 'global', label: 'Global / Multi-Region' }
];

export const BUSINESS_MODELS = [
  { id: 'b2b', label: 'B2B (Business to Business)' },
  { id: 'b2c', label: 'B2C (Business to Consumer)' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'enterprise', label: 'Enterprise Software' }
];

export const COMPANY_SIZES = [
  { id: '1-10', label: '1-10 (Seed / Ideation)' },
  { id: '11-50', label: '11-50 (Startup)' },
  { id: '51-200', label: '51-200 (Scale-up)' },
  { id: '200+', label: '200+ (Established)' }
];

export const HOSTING_TYPES = [
  { id: 'cloud', label: 'Cloud (AWS/Azure/GCP)' },
  { id: 'onprem', label: 'On-Premise / Datacenter' },
  { id: 'hybrid', label: 'Hybrid' }
];

export const OS_TYPES = [
  { id: 'windows', label: 'Windows Shop' },
  { id: 'mac', label: 'Mac/Apple Driven' },
  { id: 'linux', label: 'Linux / Mixed' }
];

export const DATA_TYPES = [
  { id: 'customer', label: 'Customer Data' },
  { id: 'financial', label: 'Financial Data' },
  { id: 'pii', label: 'Personal Data (PII)' },
  { id: 'health', label: 'Health Data (PHI)' },
  { id: 'ip', label: 'Intellectual Property (IP)' },
  { id: 'biometric', label: 'Biometric Data' },
  { id: 'location', label: 'Location Data' }
];

export const DATA_VOLUMES = [
  { id: 'low', label: 'Low (< 1GB / < 1k records)' },
  { id: 'medium', label: 'Medium (1GB-100GB / 1k-100k)' },
  { id: 'high', label: 'High (>100GB / >100k records)' },
  { id: 'big_data', label: 'Big Data (>1TB / >1M records)' }
];

export const SECURITY_PREFS = {
  mfa: [
    { id: 'none', label: 'No MFA' },
    { id: 'optional', label: 'Optional / Voluntary' },
    { id: 'required', label: 'Required (Admins Only)' },
    { id: 'mandatory', label: 'Mandatory (All Users)' }
  ],
  password: [
    { id: 'basic', label: 'Basic (8 chars)' },
    { id: 'strong', label: 'Strong (12+ chars, complex)' },
    { id: 'passphrase', label: 'Passphrases (15+ chars)' }
  ],
  logging: [
    { id: 'none', label: 'No Logging' },
    { id: 'basic', label: 'Basic (Errors only)' },
    { id: 'advanced', label: 'Advanced (Audit Trails, SIEM)' }
  ]
};

export const RISK_TOLERANCE = [
  { id: 'low', label: 'Low (Risk Averse)' },
  { id: 'medium', label: 'Medium (Balanced)' },
  { id: 'high', label: 'High (Aggressive Growth)' }
];

// ========== NEW CONSTANTS FOR EXPANDED ASSESSMENT ==========

// Section G: Technical Infrastructure
export const DATABASE_TYPES = [
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'mysql', label: 'MySQL / MariaDB' },
  { id: 'mssql', label: 'Microsoft SQL Server' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'redis', label: 'Redis' },
  { id: 'dynamodb', label: 'DynamoDB' },
  { id: 'none', label: 'No Database / Serverless' }
];

export const API_AUTH_TYPES = [
  { id: 'none', label: 'No Authentication' },
  { id: 'api_key', label: 'API Keys' },
  { id: 'oauth', label: 'OAuth 2.0' },
  { id: 'jwt', label: 'JWT Tokens' },
  { id: 'mutual_tls', label: 'Mutual TLS' }
];

export const BACKUP_FREQUENCIES = [
  { id: 'none', label: 'No Backups' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'daily', label: 'Daily' },
  { id: 'real_time', label: 'Real-time / Continuous' }
];

export const FIREWALL_TYPES = [
  { id: 'none', label: 'No Firewall' },
  { id: 'basic', label: 'Basic Firewall' },
  { id: 'ngfw', label: 'Next-Gen Firewall (NGFW)' },
  { id: 'waf', label: 'Web Application Firewall (WAF)' }
];

// Section H: Security Posture
export const EDR_SOLUTIONS = [
  { id: 'none', label: 'No EDR' },
  { id: 'crowdstrike', label: 'CrowdStrike' },
  { id: 'sentinelone', label: 'SentinelOne' },
  { id: 'defender', label: 'Microsoft Defender' },
  { id: 'carbonblack', label: 'Carbon Black' },
  { id: 'other', label: 'Other EDR Solution' }
];

export const VULNERABILITY_SCAN_FREQ = [
  { id: 'never', label: 'Never' },
  { id: 'annually', label: 'Annually' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'continuous', label: 'Continuous Scanning' }
];

export const PATCHING_FREQUENCIES = [
  { id: 'never', label: 'No Patching Schedule' },
  { id: 'annually', label: 'Annually' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'asap', label: 'ASAP / Emergency Patches Only' }
];

export const TRAINING_FREQUENCIES = [
  { id: 'never', label: 'No Training' },
  { id: 'onboarding', label: 'Onboarding Only' },
  { id: 'annual', label: 'Annual' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'monthly', label: 'Monthly' }
];

// Section I: Compliance & Audit
export const COMPLIANCE_FRAMEWORKS = [
  { id: 'iso27001', label: 'ISO 27001' },
  { id: 'soc2', label: 'SOC 2' },
  { id: 'pci_dss', label: 'PCI-DSS' },
  { id: 'hipaa', label: 'HIPAA' },
  { id: 'gdpr', label: 'GDPR' },
  { id: 'ccpa', label: 'CCPA' },
  { id: 'nist', label: 'NIST Cybersecurity Framework' },
  { id: 'fedramp', label: 'FedRAMP' }
];

export const POLICY_COMPLETENESS = [
  { id: 'none', label: 'No Policies' },
  { id: 'partial', label: 'Partial / In Progress' },
  { id: 'complete', label: 'Complete & Up-to-date' }
];

export const REVIEW_FREQUENCIES = [
  { id: 'never', label: 'Never Reviewed' },
  { id: 'ad_hoc', label: 'Ad-hoc / When Needed' },
  { id: 'annual', label: 'Annual' },
  { id: 'semi_annual', label: 'Semi-annual' },
  { id: 'quarterly', label: 'Quarterly' }
];

// Section J: Third-Party & Supply Chain
export const VENDOR_REVIEW_FREQ = [
  { id: 'never', label: 'Never Review Vendors' },
  { id: 'before_onboarding', label: 'Before Onboarding Only' },
  { id: 'annual', label: 'Annual Reviews' },
  { id: 'quarterly', label: 'Quarterly Reviews' }
];

export const CODE_REVIEW_PROCESSES = [
  { id: 'none', label: 'No Code Review' },
  { id: 'peer', label: 'Peer Review' },
  { id: 'automated', label: 'Automated Tools Only' },
  { id: 'both', label: 'Peer + Automated' }
];

// Section K: Business Continuity
export const BCP_TEST_FREQ = [
  { id: 'never', label: 'Never Tested' },
  { id: 'annual', label: 'Annual' },
  { id: 'semi_annual', label: 'Semi-annual' },
  { id: 'quarterly', label: 'Quarterly' }
];

export const REDUNDANCY_LEVELS = [
  { id: 'none', label: 'No Redundancy' },
  { id: 'single', label: 'Single Server Backup' },
  { id: 'multi_az', label: 'Multi-Availability Zone' },
  { id: 'multi_region', label: 'Multi-Region' }
];

// Section L: Development & DevOps
export const SDLC_SECURITY_LEVELS = [
  { id: 'none', label: 'No Security in SDLC' },
  { id: 'partial', label: 'Partial Integration' },
  { id: 'full', label: 'Fully Integrated (DevSecOps)' }
];

export const SECRETS_MANAGEMENT = [
  { id: 'hardcoded', label: 'Hardcoded in Code' },
  { id: 'env_vars', label: 'Environment Variables' },
  { id: 'vault', label: 'Vault / Secrets Manager' },
  { id: 'hsm', label: 'Hardware Security Module (HSM)' }
];

export const PROD_ACCESS_CONTROL = [
  { id: 'open', label: 'All Developers Can Deploy' },
  { id: 'restricted', label: 'Restricted (Seniors Only)' },
  { id: 'automated', label: 'Fully Automated (No Manual Access)' }
];

// General Yes/No/Partial options (reusable)
export const YES_NO_OPTIONS = ['yes', 'no'];
export const YES_NO_PARTIAL_OPTIONS = ['yes', 'no', 'partial'];
