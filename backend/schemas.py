from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class MaturityLevel(str, Enum):
    NOT_STARTED = "0"
    INITIAL = "25"
    PARTIALLY = "50"
    LARGELY = "75"
    FULLY_OPTIMIZED = "100"

class SubcategoryBase(BaseModel):
    id: str
    text: str
    category_id: str

class CategoryBase(BaseModel):
    id: str
    name: str
    function_id: str

class FunctionBase(BaseModel):
    id: str
    name: str

class SubcategoryAssessmentBase(BaseModel):
    subcategory_id: str
    maturity_score: MaturityLevel
    evidence_notes: Optional[str] = None
    action_item: Optional[str] = None

class CategoryTierAssessmentBase(BaseModel):
    category_id: str
    tier_level: int = Field(ge=1, le=4)

class AssessmentSnapshotCreate(BaseModel):
    org_id: int
    name: str
    version_tag: Optional[str] = None
    overall_tier: Optional[int] = Field(None, ge=1, le=4)
    subcategory_assessments: List[SubcategoryAssessmentBase]
    category_tier_assessments: List[CategoryTierAssessmentBase]

class AssessmentSnapshotResponse(BaseModel):
    id: int
    org_id: int
    name: str
    version_tag: Optional[str]
    created_at: datetime
    overall_tier: Optional[int]

    class Config:
        from_attributes = True

class OrganizationBase(BaseModel):
    name: str
    tenant_id: str

class OrganizationResponse(OrganizationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
