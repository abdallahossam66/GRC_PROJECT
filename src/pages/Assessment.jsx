import React, { useState } from 'react';
import {
    INDUSTRIES, REGIONS, BUSINESS_MODELS, COMPANY_SIZES,
    HOSTING_TYPES, OS_TYPES, DATA_TYPES, DATA_VOLUMES,
    SECURITY_PREFS, RISK_TOLERANCE,
    DATABASE_TYPES, API_AUTH_TYPES, BACKUP_FREQUENCIES, FIREWALL_TYPES,
    EDR_SOLUTIONS, VULNERABILITY_SCAN_FREQ, PATCHING_FREQUENCIES, TRAINING_FREQUENCIES,
    COMPLIANCE_FRAMEWORKS, POLICY_COMPLETENESS, REVIEW_FREQUENCIES,
    VENDOR_REVIEW_FREQ, CODE_REVIEW_PROCESSES,
    BCP_TEST_FREQ, REDUNDANCY_LEVELS,
    SDLC_SECURITY_LEVELS, SECRETS_MANAGEMENT, PROD_ACCESS_CONTROL,
    YES_NO_OPTIONS
} from '../logic/constants';

const Assessment = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 12; // Expanded from 6 to 12 steps

    const [formData, setFormData] = useState({
        // A. Profile
        name: '', region: 'us', model: 'b2b', industry: 'saas', size: '11-50',
        // B. Org
        employees: 25, departments: 4, remote: 'yes', vendors: 'yes', outsourcedIT: 'no',
        // C. Tech
        hosting: 'cloud', cloudProvider: 'aws', os: 'mac', saas: 'yes', network: 'yes',
        // D. Data
        dataTypes: [], dataVolume: 'medium',
        // E. Security
        mfa: 'mandatory', password: 'strong', logging: 'advanced', adminCount: 2,
        // F. Compliance
        riskTolerance: 'medium', auditReady: 'no',

        // G. Technical Infrastructure (NEW)
        applicationCount: 5, publicAPIs: 'no', apiAuthentication: 'oauth',
        mobileApps: 'no', webApplications: 3,
        primaryDatabase: 'postgresql', databaseCount: 2,
        dataEncryptionAtRest: 'yes', dataEncryptionInTransit: 'yes',
        backupFrequency: 'daily', backupTesting: 'quarterly',
        networkSegmentation: 'no', firewallType: 'basic', intrusionDetection: 'no', vpnRequired: 'yes',

        // H. Security Posture (NEW)
        antivirusDeployed: 'yes', edrSolution: 'defender',
        siemDeployed: 'no', vulnerabilityScanning: 'never', patchingFrequency: 'monthly',
        ssoImplemented: 'no', privilegedAccessManagement: 'no',
        sessionTimeouts: 30, accountReviewFrequency: 'never',
        securityTeamSize: 0, securityBudget: 0, cisoPresent: 'no',
        securityTrainingFrequency: 'never', phishingSimulations: 'no',
        incidentResponsePlan: 'no', incidentResponseTested: 'no',
        securityIncidentsLastYear: 0, dataBreachHistory: 'no',
        cyberInsurance: 'no', insuranceCoverage: 0,

        // I. Compliance & Audit (NEW)
        existingCertifications: [], // Multi-select from COMPLIANCE_FRAMEWORKS
        regulatoryRequirements: [], // Multi-select
        dataResidency: [], // Multi-select regions
        contractualSecurity: 'no',
        lastAuditDate: '', auditFindings: 0,
        policiesDocumented: 'none', policyReviewFrequency: 'never',
        privacyOfficerAppointed: 'no', privacyImpactAssessments: 'no', dataMappingCompleted: 'no',

        // J. Third-Party & Supply Chain (NEW)
        criticalVendorCount: 5, vendorRiskAssessments: 'no',
        vendorSecurityReviews: 'never',
        saasApplicationCount: 10, cloudDataClassification: 'no', cloudAccessReviews: 'never',
        developmentOutsourced: 'no', outsourcedDevelopers: 0,
        codeReviewProcess: 'none', sourceCodeEscrow: 'no',

        // K. Business Continuity (NEW)
        bcpDocumented: 'no', bcpTested: 'never',
        rto: 24, rpo: 4,
        uptimeRequirement: 99.9, redundancyLevel: 'none', loadBalancing: 'no',
        crisisCommunicationPlan: 'no', emergencyContactList: 'no', customerBreachNotification: 72,

        // L. Development & DevOps (NEW)
        sdlcDocumented: 'no', securityInSDLC: 'none',
        threatModeling: 'no', secureCodeTraining: 'no',
        staticCodeAnalysis: 'no', dependencyScanning: 'no', secretsManagement: 'env_vars',
        cicdPipeline: 'no', securityTestingInPipeline: 'no', productionAccessControl: 'open'
    });

    const update = (field, value) => setFormData(p => ({ ...p, [field]: value }));
    const toggle = (field, value) => {
        setFormData(p => {
            const arr = p[field];
            return { ...p, [field]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value] };
        });
    };

    const next = () => step < totalSteps ? setStep(step + 1) : onComplete(formData);
    const back = () => setStep(Math.max(1, step - 1));

    return (
        <div className="container" style={{ maxWidth: '800px', paddingTop: '2rem' }}>
            <div className="glass-card">
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>Consultant Assessment</h2>
                    <span className="badge badge-warning">Section {step} / {totalSteps}</span>
                </div>

                {/* STEP 1: BUSINESS PROFILE */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h3>A. Business Profile</h3>
                        <div className="input-group">
                            <label>Company Name</label>
                            <input type="text" className="form-control" value={formData.name} onChange={e => update('name', e.target.value)} />
                        </div>
                        <div className="grid-2">
                            <Select label="Region" value={formData.region} onChange={e => update('region', e.target.value)} options={REGIONS} />
                            <Select label="Industry" value={formData.industry} onChange={e => update('industry', e.target.value)} options={INDUSTRIES} />
                            <Select label="Business Model" value={formData.model} onChange={e => update('model', e.target.value)} options={BUSINESS_MODELS} />
                            <Select label="Company Size" value={formData.size} onChange={e => update('size', e.target.value)} options={COMPANY_SIZES} />
                        </div>
                    </div>
                )}

                {/* STEP 2: ORGANIZATION */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <h3>B. Organization & Workforce</h3>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Number of Employees</label>
                                <input type="number" className="form-control" value={formData.employees} onChange={e => update('employees', parseInt(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label>Internal Departments</label>
                                <input type="number" className="form-control" value={formData.departments} onChange={e => update('departments', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid-2">
                            <RadioGroup label="Remote Employees?" value={formData.remote} onChange={v => update('remote', v)} options={['yes', 'no']} />
                            <RadioGroup label="Third-Party Vendors?" value={formData.vendors} onChange={v => update('vendors', v)} options={['yes', 'no']} />
                            <RadioGroup label="Outsourced IT?" value={formData.outsourcedIT} onChange={v => update('outsourcedIT', v)} options={['yes', 'no']} />
                        </div>
                    </div>
                )}

                {/* STEP 3: TECHNOLOGY */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <h3>C. Technology Environment</h3>
                        <div className="grid-2">
                            <Select label="Hosting Type" value={formData.hosting} onChange={e => update('hosting', e.target.value)} options={HOSTING_TYPES} />
                            {formData.hosting !== 'onprem' && (
                                <div className="input-group">
                                    <label>Cloud Provider</label>
                                    <select className="form-control" value={formData.cloudProvider} onChange={e => update('cloudProvider', e.target.value)}>
                                        <option value="aws">AWS</option><option value="azure">Azure</option><option value="gcp">GCP</option>
                                    </select>
                                </div>
                            )}
                            <Select label="Operating System" value={formData.os} onChange={e => update('os', e.target.value)} options={OS_TYPES} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Uses SaaS Apps?" value={formData.saas} onChange={v => update('saas', v)} options={['yes', 'no']} />
                            <RadioGroup label="Internal Network/VPN?" value={formData.network} onChange={v => update('network', v)} options={['yes', 'no']} />
                        </div>
                    </div>
                )}

                {/* STEP 4: DATA */}
                {step === 4 && (
                    <div className="animate-fade-in">
                        <h3>D. Data Sensitivity & Assets</h3>
                        <div className="input-group">
                            <label>Data Volume</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {DATA_VOLUMES.map(d => (
                                    <button key={d.id} className={`btn ${formData.dataVolume === d.id ? '' : 'btn-outline'}`} onClick={() => update('dataVolume', d.id)} style={{ flex: 1 }}>{d.label}</button>
                                ))}
                            </div>
                        </div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Types of Data Stored</label>
                        <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr' }}>
                            {DATA_TYPES.map(d => (
                                <label key={d.id} style={checkStyle(formData.dataTypes.includes(d.id))}>
                                    <input type="checkbox" checked={formData.dataTypes.includes(d.id)} onChange={() => toggle('dataTypes', d.id)} style={{ marginRight: '0.5rem' }} />
                                    {d.label}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 5: SECURITY PREFS */}
                {step === 5 && (
                    <div className="animate-fade-in">
                        <h3>E. Access & Security Preferences</h3>
                        <div className="grid-2">
                            <Select label="MFA Policy" value={formData.mfa} onChange={e => update('mfa', e.target.value)} options={SECURITY_PREFS.mfa} />
                            <Select label="Password Policy" value={formData.password} onChange={e => update('password', e.target.value)} options={SECURITY_PREFS.password} />
                            <Select label="Logging Level" value={formData.logging} onChange={e => update('logging', e.target.value)} options={SECURITY_PREFS.logging} />
                            <div className="input-group">
                                <label>Admin Users</label>
                                <input type="number" className="form-control" value={formData.adminCount} onChange={e => update('adminCount', parseInt(e.target.value))} />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 6: COMPLIANCE */}
                {step === 6 && (
                    <div className="animate-fade-in">
                        <h3>F. Compliance & Risk Awareness</h3>
                        <Select label="Risk Tolerance" value={formData.riskTolerance} onChange={e => update('riskTolerance', e.target.value)} options={RISK_TOLERANCE} />
                        <div style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Audit Readiness (Do you expect an audit soon?)" value={formData.auditReady} onChange={v => update('auditReady', v)} options={['yes', 'no']} />
                        </div>
                    </div>
                )}

                {/* STEP 7: TECHNICAL INFRASTRUCTURE (NEW) */}
                {step === 7 && (
                    <div className="animate-fade-in">
                        <h3>G. Technical Infrastructure</h3>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Number of Applications/Systems</label>
                                <input type="number" className="form-control" value={formData.applicationCount} onChange={e => update('applicationCount', parseInt(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label>Number of Web Applications</label>
                                <input type="number" className="form-control" value={formData.webApplications} onChange={e => update('webApplications', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Public-facing APIs?" value={formData.publicAPIs} onChange={v => update('publicAPIs', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Mobile Apps?" value={formData.mobileApps} onChange={v => update('mobileApps', v)} options={YES_NO_OPTIONS} />
                        </div>
                        {formData.publicAPIs === 'yes' && (
                            <Select label="API Authentication Method" value={formData.apiAuthentication} onChange={e => update('apiAuthentication', e.target.value)} options={API_AUTH_TYPES} />
                        )}
                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Data Infrastructure</h4>
                        <div className="grid-2">
                            <Select label="Primary Database Type" value={formData.primaryDatabase} onChange={e => update('primaryDatabase', e.target.value)} options={DATABASE_TYPES} />
                            <div className="input-group">
                                <label>Number of Databases</label>
                                <input type="number" className="form-control" value={formData.databaseCount} onChange={e => update('databaseCount', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Data Encrypted at Rest?" value={formData.dataEncryptionAtRest} onChange={v => update('dataEncryptionAtRest', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Data Encrypted in Transit?" value={formData.dataEncryptionInTransit} onChange={v => update('dataEncryptionInTransit', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <Select label="Backup Frequency" value={formData.backupFrequency} onChange={e => update('backupFrequency', e.target.value)} options={BACKUP_FREQUENCIES} />
                            <Select label="Backup Testing" value={formData.backupTesting} onChange={e => update('backupTesting', e.target.value)} options={REVIEW_FREQUENCIES} />
                        </div>
                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Network Security</h4>
                        <div className="grid-2">
                            <RadioGroup label="Network Segmentation?" value={formData.networkSegmentation} onChange={v => update('networkSegmentation', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Intrusion Detection (IDS/IPS)?" value={formData.intrusionDetection} onChange={v => update('intrusionDetection', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <Select label="Firewall Type" value={formData.firewallType} onChange={e => update('firewallType', e.target.value)} options={FIREWALL_TYPES} />
                            <RadioGroup label="VPN Required for Remote Access?" value={formData.vpnRequired} onChange={v => update('vpnRequired', v)} options={YES_NO_OPTIONS} />
                        </div>
                    </div>
                )}

                {/* STEP 8: SECURITY POSTURE (NEW) */}
                {step === 8 && (
                    <div className="animate-fade-in">
                        <h3>H. Security Posture</h3>
                        <h4 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Security Tools & Controls</h4>
                        <div className="grid-2">
                            <RadioGroup label="Antivirus/EDR Deployed?" value={formData.antivirusDeployed} onChange={v => update('antivirusDeployed', v)} options={YES_NO_OPTIONS} />
                            {formData.antivirusDeployed === 'yes' && (
                                <Select label="EDR Solution" value={formData.edrSolution} onChange={e => update('edrSolution', e.target.value)} options={EDR_SOLUTIONS} />
                            )}
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="SIEM Deployed?" value={formData.siemDeployed} onChange={v => update('siemDeployed', v)} options={YES_NO_OPTIONS} />
                            <Select label="Vulnerability Scanning Frequency" value={formData.vulnerabilityScanning} onChange={e => update('vulnerabilityScanning', e.target.value)} options={VULNERABILITY_SCAN_FREQ} />
                        </div>
                        <Select label="Patching Frequency" value={formData.patchingFrequency} onChange={e => update('patchingFrequency', e.target.value)} options={PATCHING_FREQUENCIES} />

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Access Controls</h4>
                        <div className="grid-2">
                            <RadioGroup label="Single Sign-On (SSO) Implemented?" value={formData.ssoImplemented} onChange={v => update('ssoImplemented', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Privileged Access Management (PAM)?" value={formData.privilegedAccessManagement} onChange={v => update('privilegedAccessManagement', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <div className="input-group">
                                <label>Session Timeout (minutes)</label>
                                <input type="number" className="form-control" value={formData.sessionTimeouts} onChange={e => update('sessionTimeouts', parseInt(e.target.value))} />
                            </div>
                            <Select label="Account Review Frequency" value={formData.accountReviewFrequency} onChange={e => update('accountReviewFrequency', e.target.value)} options={REVIEW_FREQUENCIES} />
                        </div>

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Security Program</h4>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Security Team Size (FTE)</label>
                                <input type="number" className="form-control" value={formData.securityTeamSize} onChange={e => update('securityTeamSize', parseInt(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label>Annual Security Budget ($)</label>
                                <input type="number" className="form-control" value={formData.securityBudget} onChange={e => update('securityBudget', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Dedicated CISO Present?" value={formData.cisoPresent} onChange={v => update('cisoPresent', v)} options={YES_NO_OPTIONS} />
                            <Select label="Security Training Frequency" value={formData.securityTrainingFrequency} onChange={e => update('securityTrainingFrequency', e.target.value)} options={TRAINING_FREQUENCIES} />
                        </div>
                        <RadioGroup label="Run Phishing Simulations?" value={formData.phishingSimulations} onChange={v => update('phishingSimulations', v)} options={YES_NO_OPTIONS} />

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Incident Management</h4>
                        <div className="grid-2">
                            <RadioGroup label="Written Incident Response Plan?" value={formData.incidentResponsePlan} onChange={v => update('incidentResponsePlan', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="IR Plan Tested (Last Year)?" value={formData.incidentResponseTested} onChange={v => update('incidentResponseTested', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <div className="input-group">
                                <label>Security Incidents (Last Year)</label>
                                <input type="number" className="form-control" value={formData.securityIncidentsLastYear} onChange={e => update('securityIncidentsLastYear', parseInt(e.target.value))} />
                            </div>
                            <RadioGroup label="Data Breach History?" value={formData.dataBreachHistory} onChange={v => update('dataBreachHistory', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Cyber Insurance Policy?" value={formData.cyberInsurance} onChange={v => update('cyberInsurance', v)} options={YES_NO_OPTIONS} />
                            {formData.cyberInsurance === 'yes' && (
                                <div className="input-group">
                                    <label>Coverage Amount ($)</label>
                                    <input type="number" className="form-control" value={formData.insuranceCoverage} onChange={e => update('insuranceCoverage', parseInt(e.target.value))} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 9: COMPLIANCE & AUDIT (NEW) */}
                {step === 9 && (
                    <div className="animate-fade-in">
                        <h3>I. Compliance & Audit</h3>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Existing Certifications (Select all that apply)</label>
                        <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr' }}>
                            {COMPLIANCE_FRAMEWORKS.map(f => (
                                <label key={f.id} style={checkStyle(formData.existingCertifications.includes(f.id))}>
                                    <input type="checkbox" checked={formData.existingCertifications.includes(f.id)} onChange={() => toggle('existingCertifications', f.id)} style={{ marginRight: '0.5rem' }} />
                                    {f.label}
                                </label>
                            ))}
                        </div>

                        <label style={{ display: 'block', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Regulatory Requirements (Select all that apply)</label>
                        <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr' }}>
                            {COMPLIANCE_FRAMEWORKS.map(f => (
                                <label key={f.id} style={checkStyle(formData.regulatoryRequirements.includes(f.id))}>
                                    <input type="checkbox" checked={formData.regulatoryRequirements.includes(f.id)} onChange={() => toggle('regulatoryRequirements', f.id)} style={{ marginRight: '0.5rem' }} />
                                    {f.label}
                                </label>
                            ))}
                        </div>

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Audit & Documentation</h4>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Last Audit Date</label>
                                <input type="date" className="form-control" value={formData.lastAuditDate} onChange={e => update('lastAuditDate', e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label>Audit Findings Count</label>
                                <input type="number" className="form-control" value={formData.auditFindings} onChange={e => update('auditFindings', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <Select label="Policies Documented?" value={formData.policiesDocumented} onChange={e => update('policiesDocumented', e.target.value)} options={POLICY_COMPLETENESS} />
                            <Select label="Policy Review Frequency" value={formData.policyReviewFrequency} onChange={e => update('policyReviewFrequency', e.target.value)} options={REVIEW_FREQUENCIES} />
                        </div>

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Privacy</h4>
                        <div className="grid-2">
                            <RadioGroup label="Privacy Officer Appointed (DPO)?" value={formData.privacyOfficerAppointed} onChange={v => update('privacyOfficerAppointed', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Conduct Privacy Impact Assessments?" value={formData.privacyImpactAssessments} onChange={v => update('privacyImpactAssessments', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <RadioGroup label="Data Flow Mapping Completed?" value={formData.dataMappingCompleted} onChange={v => update('dataMappingCompleted', v)} options={YES_NO_OPTIONS} />
                        <RadioGroup label="Contractual Security Requirements?" value={formData.contractualSecurity} onChange={v => update('contractualSecurity', v)} options={YES_NO_OPTIONS} />
                    </div>
                )}

                {/* STEP 10: THIRD-PARTY & SUPPLY CHAIN (NEW) */}
                {step === 10 && (
                    <div className="animate-fade-in">
                        <h3>J. Third-Party & Supply Chain Risk</h3>
                        <h4 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Vendor Management</h4>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Number of Critical Vendors</label>
                                <input type="number" className="form-control" value={formData.criticalVendorCount} onChange={e => update('criticalVendorCount', parseInt(e.target.value))} />
                            </div>
                            <RadioGroup label="Conduct Vendor Risk Assessments?" value={formData.vendorRiskAssessments} onChange={v => update('vendorRiskAssessments', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <Select label="Vendor Security Review Frequency" value={formData.vendorSecurityReviews} onChange={e => update('vendorSecurityReviews', e.target.value)} options={VENDOR_REVIEW_FREQ} />

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Cloud & SaaS</h4>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Number of SaaS Applications</label>
                                <input type="number" className="form-control" value={formData.saasApplicationCount} onChange={e => update('saasApplicationCount', parseInt(e.target.value))} />
                            </div>
                            <RadioGroup label="Classify Data in Cloud?" value={formData.cloudDataClassification} onChange={v => update('cloudDataClassification', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <Select label="Cloud Access Review Frequency" value={formData.cloudAccessReviews} onChange={e => update('cloudAccessReviews', e.target.value)} options={REVIEW_FREQUENCIES} />

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Outsourced Development</h4>
                        <div className="grid-2">
                            <RadioGroup label="Development Outsourced?" value={formData.developmentOutsourced} onChange={v => update('developmentOutsourced', v)} options={YES_NO_OPTIONS} />
                            {formData.developmentOutsourced === 'yes' && (
                                <div className="input-group">
                                    <label>Number of External Developers</label>
                                    <input type="number" className="form-control" value={formData.outsourcedDevelopers} onChange={e => update('outsourcedDevelopers', parseInt(e.target.value))} />
                                </div>
                            )}
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <Select label="Code Review Process" value={formData.codeReviewProcess} onChange={e => update('codeReviewProcess', e.target.value)} options={CODE_REVIEW_PROCESSES} />
                            <RadioGroup label="Source Code Escrow Agreement?" value={formData.sourceCodeEscrow} onChange={v => update('sourceCodeEscrow', v)} options={YES_NO_OPTIONS} />
                        </div>
                    </div>
                )}

                {/* STEP 11: BUSINESS CONTINUITY (NEW) */}
                {step === 11 && (
                    <div className="animate-fade-in">
                        <h3>K. Business Continuity & Disaster Recovery</h3>
                        <h4 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Disaster Recovery</h4>
                        <div className="grid-2">
                            <RadioGroup label="BCP/DR Plan Documented?" value={formData.bcpDocumented} onChange={v => update('bcpDocumented', v)} options={YES_NO_OPTIONS} />
                            <Select label="BCP Testing Frequency" value={formData.bcpTested} onChange={e => update('bcpTested', e.target.value)} options={BCP_TEST_FREQ} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <div className="input-group">
                                <label>Recovery Time Objective - RTO (hours)</label>
                                <input type="number" className="form-control" value={formData.rto} onChange={e => update('rto', parseInt(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label>Recovery Point Objective - RPO (hours)</label>
                                <input type="number" className="form-control" value={formData.rpo} onChange={e => update('rpo', parseInt(e.target.value))} />
                            </div>
                        </div>

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Availability</h4>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>Uptime SLA Requirement (%)</label>
                                <input type="number" step="0.1" className="form-control" value={formData.uptimeRequirement} onChange={e => update('uptimeRequirement', parseFloat(e.target.value))} />
                            </div>
                            <Select label="Redundancy Level" value={formData.redundancyLevel} onChange={e => update('redundancyLevel', e.target.value)} options={REDUNDANCY_LEVELS} />
                        </div>
                        <RadioGroup label="Load Balancing Implemented?" value={formData.loadBalancing} onChange={v => update('loadBalancing', v)} options={YES_NO_OPTIONS} />

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Crisis Communication</h4>
                        <div className="grid-2">
                            <RadioGroup label="Crisis Communication Plan?" value={formData.crisisCommunicationPlan} onChange={v => update('crisisCommunicationPlan', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Emergency Contact List Maintained?" value={formData.emergencyContactList} onChange={v => update('emergencyContactList', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <div className="input-group" style={{ marginTop: '1rem' }}>
                            <label>Customer Breach Notification Timeline (hours)</label>
                            <input type="number" className="form-control" value={formData.customerBreachNotification} onChange={e => update('customerBreachNotification', parseInt(e.target.value))} />
                        </div>
                    </div>
                )}

                {/* STEP 12: DEVELOPMENT & DEVOPS (NEW) */}
                {step === 12 && (
                    <div className="animate-fade-in">
                        <h3>L. Development & DevOps Security</h3>
                        <h4 style={{ marginTop: '1rem', marginBottom: '1rem' }}>SDLC Security</h4>
                        <div className="grid-2">
                            <RadioGroup label="SDLC Process Documented?" value={formData.sdlcDocumented} onChange={v => update('sdlcDocumented', v)} options={YES_NO_OPTIONS} />
                            <Select label="Security in SDLC" value={formData.securityInSDLC} onChange={e => update('securityInSDLC', e.target.value)} options={SDLC_SECURITY_LEVELS} />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <RadioGroup label="Threat Modeling Performed?" value={formData.threatModeling} onChange={v => update('threatModeling', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Secure Code Training for Devs?" value={formData.secureCodeTraining} onChange={v => update('secureCodeTraining', v)} options={YES_NO_OPTIONS} />
                        </div>

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Code Security</h4>
                        <div className="grid-2">
                            <RadioGroup label="Static Code Analysis (SAST)?" value={formData.staticCodeAnalysis} onChange={v => update('staticCodeAnalysis', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Dependency Scanning (SCA)?" value={formData.dependencyScanning} onChange={v => update('dependencyScanning', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <Select label="Secrets Management" value={formData.secretsManagement} onChange={e => update('secretsManagement', e.target.value)} options={SECRETS_MANAGEMENT} />

                        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>CI/CD & Deployment</h4>
                        <div className="grid-2">
                            <RadioGroup label="CI/CD Pipeline Implemented?" value={formData.cicdPipeline} onChange={v => update('cicdPipeline', v)} options={YES_NO_OPTIONS} />
                            <RadioGroup label="Security Testing in Pipeline?" value={formData.securityTestingInPipeline} onChange={v => update('securityTestingInPipeline', v)} options={YES_NO_OPTIONS} />
                        </div>
                        <Select label="Production Access Control" value={formData.productionAccessControl} onChange={e => update('productionAccessControl', e.target.value)} options={PROD_ACCESS_CONTROL} />

                        <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                            <h4 style={{ marginTop: 0 }}>Ready to Generate AI-Powered Report!</h4>
                            <p>We will analyze all 110+ inputs using Llama 3.3:70b to generate a comprehensive, industry-specific GRC report with actionable recommendations.</p>
                        </div>
                    </div>
                )}



                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-outline" onClick={back} disabled={step === 1}>Back</button>
                    <button className="btn" onClick={next}>{step === totalSteps ? 'Generate Ultimate Report' : 'Next Section'}</button>
                </div>
            </div>
        </div>
    );
};

// Components
const Select = ({ label, value, onChange, options }) => (
    <div className="input-group">
        <label>{label}</label>
        <select className="form-control" value={value} onChange={onChange}>
            {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
    </div>
);

const RadioGroup = ({ label, value, onChange, options }) => (
    <div className="input-group">
        <label>{label}</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            {options.map(o => (
                <button key={o} className={`btn ${value === o ? '' : 'btn-outline'}`} onClick={() => onChange(o)} style={{ textTransform: 'capitalize', padding: '0.5rem 1rem' }}>{o}</button>
            ))}
        </div>
    </div>
);

const checkStyle = (active) => ({
    display: 'flex', alignItems: 'center', padding: '0.8rem', borderRadius: '4px',
    background: active ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)',
    cursor: 'pointer', border: active ? '1px solid var(--accent-primary)' : '1px solid transparent'
});

export default Assessment;
