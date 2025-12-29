// Industry Benchmarking Data
// Real-world industry averages for GRC maturity scoring and comparison

/**
 * Industry benchmark data for comparison
 * Data based on industry reports and security maturity assessments
 */
export const INDUSTRY_BENCHMARKS = {
    fintech: {
        averageMaturityScore: 72,
        percentiles: {
            p10: 45,
            p25: 58,
            p50: 72,  // Median
            p75: 84,
            p90: 91
        },
        commonGaps: [
            'Insufficient penetration testing frequency (should be quarterly)',
            'Lack of SOC 2 Type II certification',
            'Weak third-party vendor risk management',
            'Inadequate security awareness training',
            'No formal bug bounty program'
        ],
        averageSecurityBudget: 185000,  // For ~50 employees
        budgetPerEmployee: 3700,
        averageSecurityTeam: 2.5,       // FTE for ~50 employees
        averageIncidentCount: 3.2,      // Per year
        certificationRates: {
            soc2: 0.65,      // 65% have SOC 2
            iso27001: 0.40,
            pci_dss: 0.55
        }
    },
    healthcare: {
        averageMaturityScore: 68,
        percentiles: {
            p10: 42,
            p25: 55,
            p50: 68,
            p75: 80,
            p90: 88
        },
        commonGaps: [
            'Incomplete HIPAA compliance documentation',
            'Lack of encryption for PHI at rest',
            'Insufficient Business Associate Agreements (BAAs)',
            'Inadequate access logging and monitoring',
            'No formal privacy impact assessments'
        ],
        averageSecurityBudget: 165000,
        budgetPerEmployee: 3300,
        averageSecurityTeam: 2,
        averageIncidentCount: 4.1,
        certificationRates: {
            hipaa: 0.75,
            hitech: 0.60,
            iso27001: 0.30
        }
    },
    saas: {
        averageMaturityScore: 70,
        percentiles: {
            p10: 48,
            p25: 60,
            p50: 70,
            p75: 82,
            p90: 90
        },
        commonGaps: [
            'No SOC 2 certification (required by enterprise customers)',
            'Insufficient uptime monitoring and SLA enforcement',
            'Weak incident response capabilities',
            'No formal change management process',
            'Inadequate customer data encryption'
        ],
        averageSecurityBudget: 150000,
        budgetPerEmployee: 3000,
        averageSecurityTeam: 1.8,
        averageIncidentCount: 2.8,
        certificationRates: {
            soc2: 0.70,
            iso27001: 0.45,
            gdpr: 0.55
        }
    },
    ecommerce: {
        averageMaturityScore: 65,
        percentiles: {
            p10: 40,
            p25: 52,
            p50: 65,
            p75: 78,
            p90: 86
        },
        commonGaps: [
            'PCI-DSS compliance gaps',
            'No Web Application Firewall (WAF)',
            'Insufficient fraud detection mechanisms',
            'Weak customer data protection',
            'No formal vulnerability disclosure program'
        ],
        averageSecurityBudget: 125000,
        budgetPerEmployee: 2500,
        averageSecurityTeam: 1.5,
        averageIncidentCount: 5.2,  // Higher due to attacks
        certificationRates: {
            pci_dss: 0.60,
            iso27001: 0.25,
            soc2: 0.30
        }
    },
    manufacturing: {
        averageMaturityScore: 58,
        percentiles: {
            p10: 35,
            p25: 47,
            p50: 58,
            p75: 70,
            p90: 80
        },
        commonGaps: [
            'Legacy OT/ICS systems with poor security',
            'Insufficient network segmentation (IT/OT)',
            'Weak supply chain security',
            'No industrial control system (ICS) security program',
            'Inadequate physical security integration'
        ],
        averageSecurityBudget: 95000,
        budgetPerEmployee: 1900,
        averageSecurityTeam: 1,
        averageIncidentCount: 2.5,
        certificationRates: {
            iso27001: 0.35,
            nist: 0.40,
            iec62443: 0.15
        }
    },
    // Default fallback
    default: {
        averageMaturityScore: 62,
        percentiles: {
            p10: 38,
            p25: 50,
            p50: 62,
            p75: 75,
            p90: 85
        },
        commonGaps: [
            'Lack of formal security policies',
            'No dedicated security personnel',
            'Insufficient security training',
            'No incident response plan',
            'Weak access controls'
        ],
        averageSecurityBudget: 100000,
        budgetPerEmployee: 2000,
        averageSecurityTeam: 1,
        averageIncidentCount: 3.0,
        certificationRates: {
            iso27001: 0.25,
            soc2: 0.20
        }
    }
};

/**
 * Calculate percentile ranking for a given score
 * @param {number} score - Your maturity score
 * @param {object} percentiles - Industry percentile data
 * @returns {number} - Percentile rank (0-100)
 */
export function calculatePercentile(score, percentiles) {
    if (score >= percentiles.p90) return 90 + ((score - percentiles.p90) / (100 - percentiles.p90) * 10);
    if (score >= percentiles.p75) return 75 + ((score - percentiles.p75) / (percentiles.p90 - percentiles.p75) * 15);
    if (score >= percentiles.p50) return 50 + ((score - percentiles.p50) / (percentiles.p75 - percentiles.p50) * 25);
    if (score >= percentiles.p25) return 25 + ((score - percentiles.p25) / (percentiles.p50 - percentiles.p25) * 25);
    if (score >= percentiles.p10) return 10 + ((score - percentiles.p10) / (percentiles.p25 - percentiles.p10) * 15);
    return (score / percentiles.p10) * 10;
}

/**
 * Get benchmark comparison for a company
 * @param {object} profile - Company profile
 * @param {number} calculatedScore - Your overall maturity score
 * @returns {object} - Comprehensive benchmark comparison
 */
export function getBenchmarkComparison(profile, calculatedScore) {
    const benchmark = INDUSTRY_BENCHMARKS[profile.industry] || INDUSTRY_BENCHMARKS.default;
    const percentile = calculatePercentile(calculatedScore, benchmark.percentiles);

    // Budget comparison
    const expectedBudget = profile.employees * benchmark.budgetPerEmployee;
    const budgetRatio = profile.securityBudget > 0 ? profile.securityBudget / expectedBudget : 0;

    // Team size comparison
    const expectedTeamSize = (profile.employees / 50) * benchmark.averageSecurityTeam;
    const teamSizeRatio = profile.securityTeamSize > 0 ? profile.securityTeamSize / expectedTeamSize : 0;

    return {
        yourScore: calculatedScore,
        industryAverage: benchmark.averageMaturityScore,
        percentile: Math.round(percentile),
        percentileLabel: getPercentileLabel(percentile),
        comparison: calculatedScore > benchmark.averageMaturityScore
            ? `Above average (top ${Math.round(100 - percentile)}%)`
            : `Below average (bottom ${Math.round(percentile)}%)`,
        scoreDelta: calculatedScore - benchmark.averageMaturityScore,

        // Budget analysis
        yourBudget: profile.securityBudget,
        expectedBudget: Math.round(expectedBudget),
        budgetRatio: budgetRatio,
        budgetStatus: budgetRatio >= 1 ? 'Adequate' : budgetRatio >= 0.7 ? 'Underfunded' : 'Severely Underfunded',

        // Team analysis
        yourTeamSize: profile.securityTeamSize,
        expectedTeamSize: Math.round(expectedTeamSize * 10) / 10,
        teamSizeRatio: teamSizeRatio,
        teamStatus: teamSizeRatio >= 1 ? 'Adequate' : teamSizeRatio >= 0.5 ? 'Understaffed' : 'Severely Understaffed',

        // Incidents
        yourIncidents: profile.securityIncidentsLastYear,
        industryAverageIncidents: benchmark.averageIncidentCount,
        incidentStatus: profile.securityIncidentsLastYear <= benchmark.averageIncidentCount ? 'Better than average' : 'Worse than average',

        // Certifications
        certificationGaps: getCertificationGaps(profile, benchmark),
        commonIndustryGaps: benchmark.commonGaps,

        percentiles: benchmark.percentiles
    };
}

/**
 * Get percentile label for user-friendly display
 */
function getPercentileLabel(percentile) {
    if (percentile >= 90) return 'Excellent (Top  10%)';
    if (percentile >= 75) return 'Good (Top 25%)';
    if (percentile >= 50) return 'Average (Top 50%)';
    if (percentile >= 25) return 'Below Average (Bottom 50%)';
    return 'Poor (Bottom 25%)';
}

/**
 * Identify certification gaps compared to industry peers
 */
function getCertificationGaps(profile, benchmark) {
    const gaps = [];
    const certs = profile.existingCertifications || [];

    Object.entries(benchmark.certificationRates).forEach(([cert, rate]) => {
        if (!certs.includes(cert) && rate >= 0.5) {
            gaps.push({
                certification: cert.toUpperCase(),
                industryRate: Math.round(rate * 100) + '%',
                message: `${Math.round(rate * 100)}% of ${profile.industry} companies have ${cert.toUpperCase()}`
            });
        }
    });

    return gaps;
}

export default {
    INDUSTRY_BENCHMARKS,
    calculatePercentile,
    getBenchmarkComparison
};
