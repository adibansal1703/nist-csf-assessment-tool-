import { SubcategoryAssessment, SignatureDetails } from '../types';

export const DUMMY_SIGNATURE: SignatureDetails = {
  assessorName: 'Dr. Alex Mercer',
  assessorTitle: 'Chief Information Security Officer (CISO)',
  organizationName: 'Apex Global Technologies',
  assessmentDate: new Date().toISOString().split('T')[0],
  signatureText: 'Electronically Verified & Approved by Dr. Alex Mercer',
};

export const DUMMY_TIERS: Record<string, number> = {
  'GV.OC': 3,
  'GV.RM': 2,
  'GV.RR': 3,
  'GV.PO': 3,
  'GV.OV': 2,
  'ID.AM': 2,
  'ID.RA': 3,
  'ID.IM': 2,
  'PR.AA': 3,
  'PR.AT': 2,
  'PR.DS': 3,
  'PR.PS': 2,
  'DE.CM': 2,
  'DE.AE': 2,
  'RS.MA': 3,
  'RS.AN': 2,
  'RS.MI': 3,
  'RC.RP': 2,
  'RC.CO': 2,
};

export const DUMMY_ASSESSMENTS: Record<string, SubcategoryAssessment> = {
  // GOVERN (GV)
  'GV.OC-01': {
    subcategory_id: 'GV.OC-01',
    maturity_score: '75',
    target_score: '100',
    evidence_notes: 'Organizational mission and risk policy reviewed annually by Executive Board. Minor gaps in quarterly communication to external vendors.',
  },
  'GV.OC-02': {
    subcategory_id: 'GV.OC-02',
    maturity_score: '50',
    target_score: '75',
    evidence_notes: 'Stakeholder risk expectations documented in ERM portal, but formal vendor SLA risk reviews are performed ad-hoc.',
  },
  'GV.OC-03': {
    subcategory_id: 'GV.OC-03',
    maturity_score: '100',
    target_score: '100',
    evidence_notes: 'Full ISO 27001 & SOC 2 Type II compliance audit passed. Legal team continuously tracks regulatory changes.',
  },
  'GV.RM-01': {
    subcategory_id: 'GV.RM-01',
    maturity_score: '50',
    target_score: '100',
    evidence_notes: 'Risk management objectives defined for IT operations, but lack enterprise-wide alignment with business units.',
  },
  'GV.PO-01': {
    subcategory_id: 'GV.PO-01',
    maturity_score: '75',
    target_score: '100',
    evidence_notes: 'Cybersecurity policies published in company intranet. 88% of employees completed annual policy acknowledgement.',
  },

  // IDENTIFY (ID)
  'ID.AM-01': {
    subcategory_id: 'ID.AM-01',
    maturity_score: '50',
    target_score: '75',
    evidence_notes: 'Automated agent (MDM) deployed on workstations, but cloud VMs require improved automated tagging.',
  },
  'ID.AM-02': {
    subcategory_id: 'ID.AM-02',
    maturity_score: '75',
    target_score: '100',
    evidence_notes: 'Software inventory tracked via CMDB. License compliance audits conducted semi-annually.',
  },
  'ID.RA-01': {
    subcategory_id: 'ID.RA-01',
    maturity_score: '50',
    target_score: '100',
    evidence_notes: 'Weekly automated vulnerability scans running. High-severity patches applied within 14 days.',
  },

  // PROTECT (PR)
  'PR.AA-01': {
    subcategory_id: 'PR.AA-01',
    maturity_score: '75',
    target_score: '100',
    evidence_notes: 'SSO with mandatory MFA enforced for 100% of employees via Okta. Privileged Access Management (PAM) configured.',
  },
  'PR.AT-01': {
    subcategory_id: 'PR.AT-01',
    maturity_score: '50',
    target_score: '75',
    evidence_notes: 'Quarterly phishing simulation exercises conducted. Click rate reduced from 14% to 4.2%.',
  },
  'PR.DS-01': {
    subcategory_id: 'PR.DS-01',
    maturity_score: '75',
    target_score: '100',
    evidence_notes: 'AES-256 encryption enabled for all database volumes and cloud storage buckets.',
  },

  // DETECT (DE)
  'DE.CM-01': {
    subcategory_id: 'DE.CM-01',
    maturity_score: '50',
    target_score: '100',
    evidence_notes: 'SIEM log ingestion active for primary firewalls and domain controllers. Endpoint EDR telemetry active.',
  },
  'DE.AE-01': {
    subcategory_id: 'DE.AE-01',
    maturity_score: '25',
    target_score: '75',
    evidence_notes: 'Basic alert rules configured in SIEM. Need dedicated SOC analyst coverage for 24/7 triaging.',
  },

  // RESPOND (RS)
  'RS.MA-01': {
    subcategory_id: 'RS.MA-01',
    maturity_score: '75',
    target_score: '100',
    evidence_notes: 'Incident Response (IR) playbook updated. Tabletop exercise completed with executive leadership in Q2.',
  },
  'RS.AN-01': {
    subcategory_id: 'RS.AN-01',
    maturity_score: '50',
    target_score: '75',
    evidence_notes: 'Forensic retainer active with external incident response firm. Post-incident root cause reviews documented.',
  },

  // RECOVER (RC)
  'RC.RP-01': {
    subcategory_id: 'RC.RP-01',
    maturity_score: '50',
    target_score: '100',
    evidence_notes: 'Disaster recovery plan established with automated offsite database replication. Annual failover test scheduled.',
  },
  'RC.CO-01': {
    subcategory_id: 'RC.CO-01',
    maturity_score: '25',
    target_score: '75',
    evidence_notes: 'PR communication template created, but external stakeholder notification procedures need formalization.',
  },
};

export const DUMMY_AI_SUGGESTIONS: Record<string, any> = {
  'GV.OC-01': {
    suggested_score: '75',
    justification: 'The organization has strong board-level risk reviews, but external vendor communication needs routine scheduling.',
    recommendation: 'Implement a quarterly executive briefing cycle and formalize third-party risk communication guidelines.',
  },
  'GV.OC-02': {
    suggested_score: '50',
    justification: 'Internal stakeholders are engaged via ERM, but third-party vendor risk SLA reviews remain ad-hoc.',
    recommendation: 'Establish mandatory quarterly vendor risk reviews and integrate SLA compliance metrics into third-party audits.',
  },
  'GV.RM-01': {
    suggested_score: '50',
    justification: 'IT operational risk goals are well-established, but lack formal cascading into non-IT business units.',
    recommendation: 'Conduct alignment workshops with department heads to map enterprise business objectives to cybersecurity risk tolerance.',
  },
  'ID.AM-01': {
    suggested_score: '50',
    justification: 'Workstation asset discovery is automated, but cloud infrastructure relies on manual tag enforcement.',
    recommendation: 'Enforce Infrastructure-as-Code (IaC) automated tagging policies and implement continuous cloud asset discovery tools.',
  },
  'ID.RA-01': {
    suggested_score: '50',
    justification: 'Automated vulnerability scanning is active, but remediation workflows lack automated ticketing integration.',
    recommendation: 'Integrate vulnerability scanner alerts directly into Jira/ServiceNow to automate patch assignment SLAs.',
  },
  'DE.AE-01': {
    suggested_score: '25',
    justification: 'Basic SIEM alert rules exist, but off-hours alerts lack real-time human triage.',
    recommendation: 'Partner with a Managed Detection & Response (MDR) provider for 24/7 SOC coverage and automated playbook containment.',
  },
  'RC.RP-01': {
    suggested_score: '50',
    justification: 'Disaster recovery backups are replicated, but full environment failover has not been validated under load.',
    recommendation: 'Conduct a simulated full-scale DR failover exercise bi-annually to validate RTO/RPO targets.',
  },
  'RC.CO-01': {
    suggested_score: '25',
    justification: 'Basic PR communication templates exist, but lack pre-approved legal and regulatory disclosure workflows.',
    recommendation: 'Draft and pre-authorize incident response communication playbooks with legal and compliance departments.',
  },
};
