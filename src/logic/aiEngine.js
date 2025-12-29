// AI Engine for GRC Report Generation using Ollama (Llama 3.3:70b)
// This module handles all AI-powered report generation

// Use Vite proxy to avoid CORS issues (routes through localhost:5173/api/ollama)
const OLLAMA_API_URL = '/api/ollama/api/generate';
const MODEL_NAME = 'llama3.1:8b'; // Using installed model for testing (switch to llama3.3:70b when available)

/**
 * Core function to call Ollama API with timeout protection
 * @param {string} prompt - The prompt to send to the model
 * @param {object} options - Additional options (temperature, max tokens, etc.)
 * @returns {Promise<string>} - Generated text from the model
 */
async function callOllama(prompt, options = {}) {
    try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || 60000); // 60 second default

        const response = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: options.temperature || 0.7,
                    top_p: options.top_p || 0.9,
                    num_predict: options.max_tokens || 2000,
                    ...options
                }
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.response) {
            throw new Error('Empty response from Ollama');
        }

        return data.response;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Ollama API timeout after', options.timeout || 60000, 'ms');
            throw new Error(`AI generation timed out. The model may be loading or busy. Please try again.`);
        }
        console.error('Ollama API Error:', error);
        throw new Error(`AI generation failed: ${error.message}. Is Ollama running?`);
    }
}

/**
 * Generate executive summary based on company profile
 * @param {object} profile - Complete assessment profile
 * @param {object} maturityScore - Calculated maturity scores
 * @returns {Promise<string>} - AI-generated executive summary
 */
export async function generateExecutiveSummary(profile, maturityScore) {
    const prompt = `You are a virtual CISO consultant. Analyze this company profile and generate an executive summary for their GRC assessment report.

COMPANY PROFILE:
- Name: ${profile.name}
- Industry: ${profile.industry}
- Size: ${profile.employees} employees
- Region: ${profile.region}
- Business Model: ${profile.model}

TECHNOLOGY STACK:
- Hosting: ${profile.hosting} (${profile.cloudProvider || 'N/A'})
- Applications: ${profile.applicationCount} systems, ${profile.webApplications} web apps
- Database: ${profile.primaryDatabase} (${profile.databaseCount} databases)
- Data Types: ${profile.dataTypes.join(', ') || 'None specified'}

SECURITY POSTURE:
- Security Maturity Score: ${maturityScore.overall}%
- MFA: ${profile.mfa}
- EDR/Antivirus: ${profile.antivirusDeployed === 'yes' ? profile.edrSolution : 'Not deployed'}
- Vulnerability Scanning: ${profile.vulnerabilityScanning}
- Patching: ${profile.patchingFrequency}
- Security Team: ${profile.securityTeamSize} FTE, Budget: $${profile.securityBudget}/year
- CISO: ${profile.cisoPresent}
- Security Training: ${profile.securityTrainingFrequency}
- Incidents Last Year: ${profile.securityIncidentsLastYear}
- Data Breach History: ${profile.dataBreachHistory}

COMPLIANCE STATUS:
- Existing Certifications: ${profile.existingCertifications?.join(', ') || 'None'}
- Regulatory Requirements: ${profile.regulatoryRequirements?.join(', ') || 'None'}
- Policies Documented: ${profile.policiesDocumented}
- Risk Tolerance: ${profile.riskTolerance}
- Audit Ready: ${profile.auditReady}

BUSINESS CONTINUITY:
- BCP Documented: ${profile.bcpDocumented}
- RTO: ${profile.rto} hours, RPO: ${profile.rpo} hours
- Redundancy: ${profile.redundancyLevel}

Generate a professional, board-ready executive summary with 3-4 paragraphs covering:
1. Current security posture overview (strengths and critical gaps)
2. Regulatory compliance status and obligations specific to their industry
3. Overall risk assessment and business impact
4. Top 3 priority recommendations with urgency level

Use specific numbers and percentages. Be direct and actionable. Write in a professional consulting tone.`;

    return await callOllama(prompt, { temperature: 0.7, max_tokens: 1500 });
}

/**
 * Generate detailed, actionable recommendations
 * @param {object} profile - Complete assessment profile
 * @param {array} gaps - Identified security gaps
 * @param {object} maturityScore - Calculated maturity scores
 * @returns {Promise<object>} - AI-generated recommendations in JSON format
 */
export async function generateRecommendations(profile, gaps, maturityScore) {
    const gapsSummary = gaps.map(g => `- ${g.category}: ${g.description} (Severity: ${g.severity})`).join('\n');

    const prompt = `You are a GRC consultant creating actionable security recommendations. Generate recommendations in valid JSON format.

COMPANY CONTEXT:
- Industry: ${profile.industry}
- Size: ${profile.employees} employees
- Security Budget: $${profile.securityBudget}/year
- Security Team: ${profile.securityTeamSize} FTE
- Risk Tolerance: ${profile.riskTolerance}
- Current Maturity: ${maturityScore.overall}%

IDENTIFIED GAPS:
${gapsSummary}

ADDITIONAL CONTEXT:
- No MFA: ${profile.mfa === 'none' || profile.mfa === 'optional' ? 'YES - CRITICAL' : 'No'}
- No SIEM: ${profile.siemDeployed === 'no' ? 'YES' : 'No'}
- No Vulnerability Scanning: ${profile.vulnerabilityScanning === 'never' ? 'YES - CRITICAL' : 'No'}
- No Incident Response Plan: ${profile.incidentResponsePlan === 'no' ? 'YES - CRITICAL' : 'No'}
- No Security Training: ${profile.securityTrainingFrequency === 'never' ? 'YES' : 'No'}
- No Backups: ${profile.backupFrequency === 'none' ? 'YES - CRITICAL' : 'No'}

Generate 15 prioritized recommendations. For EACH recommendation, provide:
- id: Sequential number (1-15)
- title: Action-oriented title (max 80 chars)
- category: One of: "Access Control", "Risk Management", "Compliance", "Governance"
- priority: One of: "Critical", "High", "Medium", "Low"
- businessImpact: 1-2 sentences explaining what happens if NOT implemented
- steps: Array of 3-5 specific implementation steps with timelines
- estimatedCost: Object with min and max (numbers, USD)
- timeline: String like "4-6 weeks" or "2-3 months"
- resources: Object with "people" and "tools" strings
- successMetrics: Array of 2-3 measurable success criteria
- quickWins: Array of 1-2 immediate actions (can be empty array)

CRITICAL: Return ONLY valid JSON in this exact format:
{
  "recommendations": [
    {
      "id": 1,
      "title": "string",
      "category": "string",
      "priority": "string",
      "businessImpact": "string",
      "steps": ["string", "string"],
      "estimatedCost": {"min": number, "max": number},
      "timeline": "string",
      "resources": {"people": "string", "tools": "string"},
      "successMetrics": ["string", "string"],
      "quickWins": ["string"]
    }
  ]
}

Prioritize Critical items first, then High, Medium, Low. Focus on highest ROI and quickest risk reduction for a ${profile.industry} company with ${profile.employees} employees.`;

    try {
        const response = await callOllama(prompt, {
            temperature: 0.5,
            max_tokens: 6000
        });

        // Parse JSON response
        const parsed = JSON.parse(response);
        return parsed;
    } catch (error) {
        console.error('Error parsing AI recommendations:', error);
        // Return fallback structure
        return {
            recommendations: []
        };
    }
}

/**
 * Generate industry-specific compliance roadmap
 * @param {object} profile - Complete assessment profile
 * @returns {Promise<string>} - AI-generated compliance roadmap in markdown
 */
export async function generateComplianceRoadmap(profile) {
    const prompt = `You are a compliance consultant. Generate a detailed compliance roadmap for this company.

COMPANY:
- Industry: ${profile.industry}
- Region: ${profile.region}
- Size: ${profile.employees} employees
- Data Types: ${profile.dataTypes.join(', ')}
- Existing Certifications: ${profile.existingCertifications?.join(', ') || 'None'}
- Regulatory Requirements: ${profile.regulatoryRequirements?.join(', ') || 'Not specified'}

Generate a compliance roadmap covering:

1. REQUIRED Regulations (mandatory for their industry/region):
   - List each regulation (GDPR, HIPAA, PCI-DSS, SOC 2, ISO 27001, etc.)
   - Why it applies to them
   - Current gap assessment
   - Timeline to achieve (realistic months)
   - Estimated cost range
   - Business benefits

2. RECOMMENDED Frameworks (industry best practice):
   - Similar format as above
   - Focus on competitive advantage

3. Prioritized Action Plan:
   - Month-by-month roadmap for next 12 months
   - Quick wins (0-3 months)
   - Medium-term goals (3-9 months)
   - Long-term goals (9-12 months)

Be specific to their ${profile.industry} industry and ${profile.region} region. Include actual regulation names and specific requirements.

Format as clear markdown with headers, lists, and tables where appropriate.`;

    return await callOllama(prompt, { temperature: 0.6, max_tokens: 3000 });
}

/**
 * Generate risk quantification with financial impact
 * @param {object} profile - Complete assessment profile
 * @param {array} risks - Identified risk scenarios
 * @returns {Promise<array>} - Risks with financial quantification
 */
export async function quantifyRisks(profile, risks) {
    const risksDescription = risks.map(r => `- ${r.risk}: ${r.impact} impact, ${r.likelihood} likelihood`).join('\n');

    const prompt = `You are a risk quantification analyst. Calculate Annual Loss Expectancy (ALE) for each risk.

COMPANY DATA:
- Industry: ${profile.industry}
- Revenue Estimate: ~$${profile.employees * 150000} (based on ${profile.employees} employees)
- Employee Count: ${profile.employees}
- Data Volume: ${profile.dataVolume}
- Industry: ${profile.industry}

RISK SCENARIOS:
${risksDescription}

For EACH risk, calculate:
1. Single Loss Expectancy (SLE) - estimated cost if it happens once (in USD)
2. Annual Rate of Occurrence (ARO) - probability as decimal (0.01 to 1.0)
3. Annual Loss Expectancy (ALE = SLE × ARO)
4. Mitigation Cost - estimated cost to implement controls
5. ROI - return on investment percentage

Use industry benchmarks:
- Data breach cost: $4.45M average (healthcare), $3.9M (financial), $2.5M (other)
- Ransomware: $1.85M average recovery cost
- Downtime: $5,600/minute for critical systems

Return as JSON array:
[
  {
    "risk": "Risk name",
    "sle": number,
    "aro": number,
    "ale": number,
    "mitigationCost": number,
    "roi": number
  }
]

Be realistic for a ${profile.employees}-employee ${profile.industry} company.`;

    try {
        const response = await callOllama(prompt, {
            temperature: 0.4,
            max_tokens: 2000
        });
        return JSON.parse(response);
    } catch (error) {
        console.error('Error quantifying risks:', error);
        return [];
    }
}

/**
 * Check if Ollama is running and model is available
 * @returns {Promise<boolean>} - True if Ollama is ready
 */
export async function checkOllamaStatus() {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) return false;

        const data = await response.json();
        const hasModel = data.models?.some(m => m.name.includes('llama3.3'));
        return hasModel;
    } catch (error) {
        return false;
    }
}

export default {
    generateExecutiveSummary,
    generateRecommendations,
    generateComplianceRoadmap,
    quantifyRisks,
    checkOllamaStatus
};
