export type MaturityLevel = "0" | "25" | "50" | "75" | "100";

export interface Subcategory {
  id: string;
  text: string;
  category_id: string;
}

export interface Category {
  id: string;
  name: string;
  function_id: string;
}

export interface Function {
  id: string;
  name: string;
}

export interface SubcategoryAssessment {
  subcategory_id: string;
  maturity_score: MaturityLevel;
  target_score?: MaturityLevel;
  evidence_notes?: string;
  action_item?: string;
}

export interface CategoryTierAssessment {
  category_id: string;
  tier_level: number;
}

export interface AssessmentSnapshot {
  id?: number;
  org_id: number;
  name: string;
  version_tag?: string;
  overall_tier?: number;
  subcategory_assessments: SubcategoryAssessment[];
  category_tier_assessments: CategoryTierAssessment[];
}

export interface SignatureDetails {
  assessorName: string;
  assessorTitle: string;
  organizationName: string;
  assessmentDate: string;
  signatureText: string;
}

