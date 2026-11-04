const API_BASE_URL = 'http://localhost:8000';

// Fallback NIST CSF 2.0 framework data when backend API is offline or database is unseeded
const FALLBACK_FUNCTIONS = [
  { id: 'GV', name: 'GOVERN' },
  { id: 'ID', name: 'IDENTIFY' },
  { id: 'PR', name: 'PROTECT' },
  { id: 'DE', name: 'DETECT' },
  { id: 'RS', name: 'RESPOND' },
  { id: 'RC', name: 'RECOVER' },
];

const FALLBACK_CATEGORIES: Record<string, Array<{ id: string; name: string; function_id: string }>> = {
  GV: [
    { id: 'GV.OC', name: 'Organizational Context', function_id: 'GV' },
    { id: 'GV.RM', name: 'Risk Management Strategy', function_id: 'GV' },
    { id: 'GV.RR', name: 'Roles, Responsibilities, and Authorities', function_id: 'GV' },
    { id: 'GV.PO', name: 'Policy', function_id: 'GV' },
    { id: 'GV.OV', name: 'Oversight', function_id: 'GV' },
  ],
  ID: [
    { id: 'ID.AM', name: 'Asset Management', function_id: 'ID' },
    { id: 'ID.RA', name: 'Risk Assessment', function_id: 'ID' },
    { id: 'ID.IM', name: 'Improvement', function_id: 'ID' },
  ],
  PR: [
    { id: 'PR.AA', name: 'Identity Management, Authentication, and Access Control', function_id: 'PR' },
    { id: 'PR.AT', name: 'Awareness and Training', function_id: 'PR' },
    { id: 'PR.DS', name: 'Data Security', function_id: 'PR' },
    { id: 'PR.PS', name: 'Platform Security', function_id: 'PR' },
  ],
  DE: [
    { id: 'DE.CM', name: 'Continuous Monitoring', function_id: 'DE' },
    { id: 'DE.AE', name: 'Adverse Event Analysis', function_id: 'DE' },
  ],
  RS: [
    { id: 'RS.MA', name: 'Incident Management Reporting and Communication', function_id: 'RS' },
    { id: 'RS.AN', name: 'Incident Analysis', function_id: 'RS' },
    { id: 'RS.MI', name: 'Incident Mitigation', function_id: 'RS' },
  ],
  RC: [
    { id: 'RC.RP', name: 'Incident Recovery Plan Execution', function_id: 'RC' },
    { id: 'RC.CO', name: 'Incident Recovery Communication', function_id: 'RC' },
  ]
};

const FALLBACK_SUBCATEGORIES: Record<string, Array<{ id: string; text: string; category_id: string }>> = {
  'GV.OC': [
    { id: 'GV.OC-01', text: 'The organizational mission is understood and informs cybersecurity risk management decisions.', category_id: 'GV.OC' },
    { id: 'GV.OC-02', text: 'Internal and external stakeholders are understood, and their needs regarding cybersecurity risk are considered.', category_id: 'GV.OC' },
    { id: 'GV.OC-03', text: 'Legal, regulatory, and contractual requirements regarding cybersecurity are understood and managed.', category_id: 'GV.OC' },
    { id: 'GV.OC-04', text: 'Critical objectives, capabilities, and services that external stakeholders depend on are understood.', category_id: 'GV.OC' },
    { id: 'GV.OC-05', text: 'Outcomes, capabilities, and services that the organization depends on are understood and communicated.', category_id: 'GV.OC' }
  ],
  'GV.RM': [
    { id: 'GV.RM-01', text: 'Risk management objectives are established and agreed to by organizational stakeholders.', category_id: 'GV.RM' },
    { id: 'GV.RM-02', text: 'Risk appetite and risk tolerance statements are established and communicated.', category_id: 'GV.RM' },
    { id: 'GV.RM-03', text: 'Cybersecurity risk management activities and outcomes are included in enterprise risk management.', category_id: 'GV.RM' }
  ],
  'GV.RR': [
    { id: 'GV.RR-01', text: 'Organizational leadership is responsible and accountable for cybersecurity risk.', category_id: 'GV.RR' },
    { id: 'GV.RR-02', text: 'Roles, responsibilities, and authorities related to cybersecurity risk management are established and communicated.', category_id: 'GV.RR' }
  ],
  'GV.PO': [
    { id: 'GV.PO-01', text: 'Organizational cybersecurity policy is established, communicated, and updated.', category_id: 'GV.PO' },
    { id: 'GV.PO-02', text: 'Cybersecurity policies are integrated into organizational operational processes.', category_id: 'GV.PO' }
  ],
  'GV.OV': [
    { id: 'GV.OV-01', text: 'Cybersecurity risk management strategy outcomes are reviewed to inform governance decisions.', category_id: 'GV.OV' }
  ],
  'ID.AM': [
    { id: 'ID.AM-01', text: 'Inventories of physical assets, software, external services, and data are maintained.', category_id: 'ID.AM' },
    { id: 'ID.AM-02', text: 'Assets are prioritized based on their classification, criticality, and business value.', category_id: 'ID.AM' }
  ],
  'ID.RA': [
    { id: 'ID.RA-01', text: 'Asset vulnerabilities are identified, validated, and recorded.', category_id: 'ID.RA' },
    { id: 'ID.RA-02', text: 'Cyber threat intelligence is received and processed from information sharing forums.', category_id: 'ID.RA' }
  ],
  'ID.IM': [
    { id: 'ID.IM-01', text: 'Improvements are identified from security evaluations and audits.', category_id: 'ID.IM' }
  ],
  'PR.AA': [
    { id: 'PR.AA-01', text: 'Identities and credentials for authorized users, services, and devices are managed.', category_id: 'PR.AA' },
    { id: 'PR.AA-02', text: 'Identities are authenticated commensurate with the risk of the action.', category_id: 'PR.AA' }
  ],
  'PR.AT': [
    { id: 'PR.AT-01', text: 'Personnel are provided cybersecurity awareness training.', category_id: 'PR.AT' }
  ],
  'PR.DS': [
    { id: 'PR.DS-01', text: 'Data at rest and data in transit are protected.', category_id: 'PR.DS' }
  ],
  'PR.PS': [
    { id: 'PR.PS-01', text: 'Platforms (hardware, software, network) are configured and secured.', category_id: 'PR.PS' }
  ],
  'DE.CM': [
    { id: 'DE.CM-01', text: 'Networks, systems, and physical environments are monitored for potential security incidents.', category_id: 'DE.CM' }
  ],
  'DE.AE': [
    { id: 'DE.AE-01', text: 'Potentially adverse events are analyzed to understand impact and scope.', category_id: 'DE.AE' }
  ],
  'RS.MA': [
    { id: 'RS.MA-01', text: 'Incident response plans are executed once an incident is declared.', category_id: 'RS.MA' }
  ],
  'RS.AN': [
    { id: 'RS.AN-01', text: 'Incident response activities are analyzed to estimate impact.', category_id: 'RS.AN' }
  ],
  'RS.MI': [
    { id: 'RS.MI-01', text: 'Incidents are contained and mitigated.', category_id: 'RS.MI' }
  ],
  'RC.RP': [
    { id: 'RC.RP-01', text: 'Recovery processes and procedures are executed to ensure timely restoration of systems.', category_id: 'RC.RP' }
  ],
  'RC.CO': [
    { id: 'RC.CO-01', text: 'Recovery activities are communicated to internal and external stakeholders.', category_id: 'RC.CO' }
  ]
};

export async function fetchFramework() {
  try {
    const response = await fetch(`${API_BASE_URL}/framework`);
    if (!response.ok) throw new Error('Failed to fetch framework from API');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_FUNCTIONS;
  } catch (error) {
    console.warn('Backend API unreachable or error fetching framework. Using fallback NIST CSF data:', error);
    return FALLBACK_FUNCTIONS;
  }
}

export async function fetchCategories(functionId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/framework/functions/${functionId}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories from API');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_CATEGORIES[functionId] || [];
  } catch (error) {
    console.warn(`Backend API unreachable for categories (${functionId}). Using fallback data:`, error);
    return FALLBACK_CATEGORIES[functionId] || [];
  }
}

export async function fetchSubcategories(categoryId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/framework/categories/${categoryId}/subcategories`);
    if (!response.ok) throw new Error('Failed to fetch subcategories from API');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_SUBCATEGORIES[categoryId] || [];
  } catch (error) {
    console.warn(`Backend API unreachable for subcategories (${categoryId}). Using fallback data:`, error);
    return FALLBACK_SUBCATEGORIES[categoryId] || [];
  }
}

export async function saveAssessment(assessment: any) {
  const response = await fetch(`${API_BASE_URL}/assessments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assessment),
  });
  if (!response.ok) throw new Error('Failed to save assessment');
  return response.json();
}

export async function assessEvidence(subId: string, notes: string) {
  const response = await fetch(`${API_BASE_URL}/assess-evidence/?subcategory_id=${subId}&evidence_notes=${encodeURIComponent(notes)}`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'AI analysis failed');
  }
  return response.json();
}
