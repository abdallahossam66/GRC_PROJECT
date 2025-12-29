// Enhanced Scoring Framework with Industry-Specific Weighted Calculations
// Replaces simple rule-based scoring with sophisticated weighted approach

/**
 * Industry-specific scoring weights and thresholds
 * Each industry has different priorities for the 4 GRC dimensions
 */
export const INDUSTRY_WEIGHTS = {
    fintech: {
        dimensions: {
            access: { weight: 0.35, threshold: 85 },      // Financial data needs strong access control
            compliance: { weight: 0.40, threshold: 90 },  // Heavy regulatory burden
            risk: { weight: 0.15, threshold: 75 },
            governance: { weight: 0.10, threshold: 70 }
        },
        penalties: {
            no_mfa: -30,
            mfa_optional: -20,
            no_encryption_rest: -25,
            no_encryption_transit: -20,
            no_audit_logs: -20,
            no_siem: -15,
            no_vulnerability_scanning: -15,
            no_penetration_testing: -10,
            no_incident_response: -20
        },
        bonuses: {
            soc2_certified: +15,
            pci_compliant: +20,
            iso27001: +15,
            penetration_tested: +10,
            bug_bounty: +5
        }
    },
    healthcare: {
        dimensions: {
            compliance: { weight: 0.45, threshold: 95 },  // HIPAA is strict
            risk: { weight: 0.30, threshold: 80 },
            access: { weight: 0.15, threshold: 80 },
            governance: { weight: 0.10, threshold: 70 }
        },
        penalties: {
            no_encryption_rest: -40,           // PHI must be encrypted
            no_encryption_transit: -40,
            no_audit_logs: -35,
            no_mfa: -30,
            no_baa: -30,                      // Business Associate Agreements required
            failed_hipaa_assessment: -50,
            no_access_reviews: -20,
            no_incident_response: -25
        },
        bonuses: {
            hipaa_certified: +25,
            hitech_compliant: +15,
            iso27001: +15,
            regular_audits: +10
        }
    },
    saas: {
        dimensions: {
            access: { weight: 0.30 },
            risk: { weight: 0.30 },
            compliance: { weight: 0.25 },
            governance: { weight: 0.15 }
        },
        penalties: {
            no_mfa: -25,
            no_sso: -15,
            no_backup: -20,
            no_monitoring: -15,
            no_incident_response: -15
        },
        bonuses: {
            soc2_certified: +20,
            iso27001: +15,
            uptime_99_9: +10,
            security_training: +5
        }
    },
    ecommerce: {
        dimensions: {
            compliance: { weight: 0.35, threshold: 85 },  // PCI-DSS
            access: { weight: 0.30, threshold: 80 },
            risk: { weight: 0.25, threshold: 75 },
            governance: { weight: 0.10, threshold: 70 }
        },
        penalties: {
            no_pci_compliance: -40,
            no_waf: -25,
            no_encryption_transit: -30,
            no_fraud_detection: -20,
            no_mfa: -20,
            no_vulnerability_scanning: -20
        },
        bonuses: {
            pci_compliant: +25,
            fraud_prevention: +15,
            regular_pentests: +10,
            bug_bounty: +10
        }
    },
    // Default for other industries
    default: {
        dimensions: {
            governance: { weight: 0.25 },
            access: { weight: 0.25 },
            risk: { weight: 0.25 },
            compliance: { weight: 0.25 }
        },
        penalties: {
            no_mfa: -20,
            no_backup: -15,
            no_incident_response: -15,
            no_policies: -10
        },
        bonuses: {
            iso27001: +15,
            security_training: +10,
            regular_audits: +10
        }
    }
};

/**
 * Calculate governance score based on profile
 */
function calculateGovernanceScore(profile) {
    let score = 50; // Base score

    // Company maturity
    if (profile.size === '51-200' || profile.size === '200+') score += 10;
    if (profile.departments >= 3) score += 5;
    if (profile.departments >= 5) score += 5;

    // Internal IT control
    if (profile.outsourcedIT === 'no') score += 10;

    // Policy documentation
    if (profile.policiesDocumented === 'complete') score += 15;
    else if (profile.policiesDocumented === 'partial') score += 7;
    else score -= 10; // Penalty for no policies

    // Policy reviews
    if (profile.policyReviewFrequency === 'quarterly') score += 10;
    else if (profile.policyReviewFrequency === 'semi_annual') score += 7;
    else if (profile.policyReviewFrequency === 'annual') score += 5;

    // CISO presence
    if (profile.cisoPresent === 'yes') score += 15;

    // Security team
    if (profile.securityTeamSize >= 2) score += 10;
    else if (profile.securityTeamSize === 1) score += 5;
    else score -= 5; // Penalty for no security team

    // Privacy officer
    if (profile.privacyOfficerAppointed === 'yes') score += 5;

    return Math.max(0, Math.min(100, score));
}

/**
 * Calculate access control score
 */
function calculateAccessScore(profile) {
    let score = 50; // Base score

    // MFA (critical)
    if (profile.mfa === 'mandatory') score += 30;
    else if (profile.mfa === 'required') score += 15;
    else if (profile.mfa === 'optional') score += 5;
    else score -= 20; // Penalty for no MFA

    // Password policy
    if (profile.password === 'passphrase') score += 12;
    else if (profile.password === 'strong') score += 10;
    else if (profile.password === 'basic') score += 3;

    // SSO
    if (profile.ssoImplemented === 'yes') score += 10;

    // PAM
    if (profile.privilegedAccessManagement === 'yes') score += 10;

    // Admin ratio (should be low)
    const adminRatio = profile.adminCount / profile.employees;
    if (adminRatio <= 0.05) score += 15; // Excellent
    else if (adminRatio <= 0.10) score += 10; // Good
    else if (adminRatio <= 0.15) score += 5; // OK
    else score -= 10; // Too many admins

    // Account reviews
    if (profile.accountReviewFrequency === 'quarterly') score += 10;
    else if (profile.accountReviewFrequency === 'semi_annual') score += 7;
    else if (profile.accountReviewFrequency === 'annual') score += 5;

    // Session timeouts
    if (profile.sessionTimeouts <= 30) score += 5;
    else if (profile.sessionTimeouts <= 60) score += 3;

    return Math.max(0, Math.min(100, score));
}

/**
 * Calculate risk management score
 */
function calculateRiskScore(profile) {
    let score = 50; // Base score

    // Logging & monitoring
    if (profile.logging === 'advanced') score += 20;
    else if (profile.logging === 'basic') score += 8;
    else score -= 10;

    // SIEM
    if (profile.siemDeployed === 'yes') score += 15;

    // Vulnerability scanning
    if (profile.vulnerabilityScanning === 'continuous') score += 20;
    else if (profile.vulnerabilityScanning === 'weekly') score += 15;
    else if (profile.vulnerabilityScanning === 'monthly') score += 10;
    else if (profile.vulnerabilityScanning === 'quarterly') score += 5;
    else score -= 15; // Penalty for never scanning

    // Patching
    if (profile.patchingFrequency === 'weekly') score += 15;
    else if (profile.patchingFrequency === 'monthly') score += 10;
    else if (profile.patchingFrequency === 'quarterly') score += 5;

    // EDR/Antivirus
    if (profile.antivirusDeployed === 'yes') score += 10;

    // Incident response
    if (profile.incidentResponsePlan === 'yes') score += 15;
    if (profile.incidentResponseTested === 'yes') score += 10;

    // Backups
    if (profile.backupFrequency === 'real_time') score += 15;
    else if (profile.backupFrequency === 'daily') score += 12;
    else if (profile.backupFrequency === 'weekly') score += 7;
    else score -= 20; // Critical penalty for no backups

    // Backup testing
    if (profile.backupTesting === 'quarterly') score += 10;
    else if (profile.backupTesting === 'semi_annual') score += 7;
    else if (profile.backupTesting === 'annual') score += 5;

    // Cyber insurance
    if (profile.cyberInsurance === 'yes') score += 5;

    // Risk tolerance (conservative is better for score)
    if (profile.riskTolerance === 'low') score += 10;
    else if (profile.riskTolerance === 'high') score -= 5;

    return Math.max(0, Math.min(100, score));
}

/**
 * Calculate compliance score
 */
function calculateComplianceScore(profile) {
    let score = 50; // Base score

    // Existing certifications (major bonus)
    const certs = profile.existingCertifications || [];
    if (certs.includes('iso27001')) score += 20;
    if (certs.includes('soc2')) score += 20;
    if (certs.includes('pci_dss')) score += 15;
    if (certs.includes('hipaa')) score += 15;
    if (certs.includes('gdpr')) score += 10;

    // Policy documentation
    if (profile.policiesDocumented === 'complete') score += 15;
    else if (profile.policiesDocumented === 'partial') score += 7;
    else score -= 15;

    // Audit readiness
    if (profile.auditReady === 'yes') score += 15;

    // Recent audit with low findings
    if (profile.lastAuditDate && profile.auditFindings <= 5) score += 10;
    else if (profile.lastAuditDate && profile.auditFindings <= 15) score += 5;

    // Data mapping (required for GDPR/CCPA)
    if (profile.dataMappingCompleted === 'yes') score += 10;

    // Privacy impact assessments
    if (profile.privacyImpactAssessments === 'yes') score += 8;

    // Data classification
    if (profile.cloudDataClassification === 'yes') score += 7;

    // Encryption
    if (profile.dataEncryptionAtRest === 'yes') score += 10;
    else score -= 15;
    if (profile.dataEncryptionInTransit === 'yes') score += 10;
    else score -= 15;

    // Vendor risk management
    if (profile.vendorRiskAssessments === 'yes') score += 10;

    return Math.max(0, Math.min(100, score));
}

/**
 * Apply industry-specific penalties
 */
function applyPenalties(scores, profile, industryConfig) {
    const penalties = industryConfig.penalties || {};

    Object.entries(penalties).forEach(([gap, penaltyValue]) => {
        let hasGap = false;

        switch (gap) {
            case 'no_mfa':
                hasGap = profile.mfa === 'none';
                break;
            case 'mfa_optional':
                hasGap = profile.mfa === 'optional';
                break;
            case 'no_encryption_rest':
                hasGap = profile.dataEncryptionAtRest === 'no';
                break;
            case 'no_encryption_transit':
                hasGap = profile.dataEncryptionInTransit === 'no';
                break;
            case 'no_audit_logs':
                hasGap = profile.logging === 'none';
                break;
            case 'no_siem':
                hasGap = profile.siemDeployed === 'no';
                break;
            case 'no_vulnerability_scanning':
                hasGap = profile.vulnerabilityScanning === 'never';
                break;
            case 'no_incident_response':
                hasGap = profile.incidentResponsePlan === 'no';
                break;
            case 'no_backup':
                hasGap = profile.backupFrequency === 'none';
                break;
            // Add more gap checks as needed
        }

        if (hasGap) {
            // Apply penalty to relevant dimension
            const category = getGapCategory(gap);
            scores[category] += penaltyValue; // penaltyValue is negative
        }
    });

    return scores;
}

/**
 * Apply industry-specific bonuses
 */
function applyBonuses(scores, profile, industryConfig) {
    const bonuses = industryConfig.bonuses || {};

    Object.entries(bonuses).forEach(([achievement, bonusValue]) => {
        let hasAchievement = false;

        switch (achievement) {
            case 'soc2_certified':
                hasAchievement = profile.existingCertifications?.includes('soc2');
                break;
            case 'iso27001':
                hasAchievement = profile.existingCertifications?.includes('iso27001');
                break;
            case 'pci_compliant':
                hasAchievement = profile.existingCertifications?.includes('pci_dss');
                break;
            case 'hipaa_certified':
                hasAchievement = profile.existingCertifications?.includes('hipaa');
                break;
            case 'penetration_tested':
                hasAchievement = profile.vulnerabilityScanning === 'quarterly' || profile.vulnerabilityScanning === 'monthly';
                break;
            case 'security_training':
                hasAchievement = profile.securityTrainingFrequency === 'quarterly' || profile.securityTrainingFrequency === 'monthly';
                break;
            // Add more achievement checks
        }

        if (hasAchievement) {
            const category = getAchievementCategory(achievement);
            scores[category] += bonusValue;
        }
    });

    return scores;
}

/**
 * Map gap to GRC dimension
 */
function getGapCategory(gap) {
    if (gap.includes('mfa') || gap.includes('access') || gap.includes('sso')) return 'access';
    if (gap.includes('compliance') || gap.includes('encryption') || gap.includes('audit')) return 'compliance';
    if (gap.includes('backup') || gap.includes('incident') || gap.includes('siem') || gap.includes('vulnerability')) return 'risk';
    return 'governance';
}

/**
 * Map achievement to GRC dimension
 */
function getAchievementCategory(achievement) {
    if (achievement.includes('certified') || achievement.includes('compliant')) return 'compliance';
    if (achievement.includes('penetration') || achievement.includes('vulnerability')) return 'risk';
    if (achievement.includes('training') || achievement.includes('governance')) return 'governance';
    return 'access';
}

/**
 * Main scoring function - calculates weighted maturity score
 * @param {object} profile - Complete assessment profile
 * @returns {object} - Maturity scores by dimension and overall
 */
export function calculateMaturityScore(profile) {
    // Get industry-specific configuration
    const industryConfig = INDUSTRY_WEIGHTS[profile.industry] || INDUSTRY_WEIGHTS.default;

    // Calculate base scores per dimension
    let scores = {
        governance: calculateGovernanceScore(profile),
        access: calculateAccessScore(profile),
        risk: calculateRiskScore(profile),
        compliance: calculateComplianceScore(profile)
    };

    // Apply industry-specific penalties
    scores = applyPenalties(scores, profile, industryConfig);

    // Apply industry-specific bonuses
    scores = applyBonuses(scores, profile, industryConfig);

    // Ensure scores stay within 0-100
    Object.keys(scores).forEach(key => {
        scores[key] = Math.max(0, Math.min(100, Math.round(scores[key])));
    });

    // Calculate weighted overall score based on industry priorities
    const overall = Object.entries(industryConfig.dimensions).reduce((sum, [dim, config]) => {
        return sum + (scores[dim] * config.weight);
    }, 0);

    return {
        ...scores,
        overall: Math.round(overall),
        industry: profile.industry,
        thresholds: industryConfig.dimensions
    };
}

/**
 * Identify gaps based on calculated scores and profile
 * @param {object} profile - Assessment profile
 * @param {object} maturityScore - Calculated maturity scores
 * @returns {array} - Array of identified gaps
 */
export function identifyGaps(profile, maturityScore) {
    const gaps = [];
    const industryConfig = INDUSTRY_WEIGHTS[profile.industry] || INDUSTRY_WEIGHTS.default;

    // Check if each dimension meets threshold
    Object.entries(industryConfig.dimensions).forEach(([dimension, config]) => {
        if (config.threshold && maturityScore[dimension] < config.threshold) {
            gaps.push({
                category: dimension.charAt(0).toUpperCase() + dimension.slice(1),
                description: `${dimension} score (${maturityScore[dimension]}%) is below industry threshold (${config.threshold}%)`,
                severity: maturityScore[dimension] < config.threshold - 20 ? 'Critical' : 'High',
                score: maturityScore[dimension],
                threshold: config.threshold
            });
        }
    });

    // Specific gap identification
    if (profile.mfa === 'none' || profile.mfa === 'optional') {
        gaps.push({
            category: 'Access Control',
            description: 'Multi-Factor Authentication not enforced for all users',
            severity: 'Critical',
            specificIssue: 'no_mfa'
        });
    }

    if (profile.backupFrequency === 'none') {
        gaps.push({
            category: 'Risk Management',
            description: 'No backup strategy in place - critical data loss risk',
            severity: 'Critical',
            specificIssue: 'no_backup'
        });
    }

    if (profile.dataEncryptionAtRest === 'no' || profile.dataEncryptionInTransit === 'no') {
        gaps.push({
            category: 'Compliance',
            description: 'Data encryption not implemented (required for most regulations)',
            severity: 'Critical',
            specificIssue: 'no_encryption'
        });
    }

    if (profile.incidentResponsePlan === 'no') {
        gaps.push({
            category: 'Risk Management',
            description: 'No documented incident response plan',
            severity: 'High',
            specificIssue: 'no_ir_plan'
        });
    }

    if (profile.vulnerabilityScanning === 'never') {
        gaps.push({
            category: 'Risk Management',
            description: 'No vulnerability scanning program',
            severity: 'High',
            specificIssue: 'no_vuln_scan'
        });
    }

    if (profile.policiesDocumented === 'none') {
        gaps.push({
            category: 'Governance',
            description: 'Security policies not documented',
            severity: 'High',
            specificIssue: 'no_policies'
        });
    }

    if (profile.securityTeamSize === 0 && profile.employees > 50) {
        gaps.push({
            category: 'Governance',
            description: 'No dedicated security personnel for company size',
            severity: 'High',
            specificIssue: 'no_security_team'
        });
    }

    return gaps;
}
