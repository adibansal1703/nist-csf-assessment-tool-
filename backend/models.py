from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
try:
    from .database import Base
except ImportError:
    from database import Base

import datetime
import enum

class MaturityLevel(str, enum.Enum):
    NOT_STARTED = "0"
    INITIAL = "25"
    PARTIALLY = "50"
    LARGELY = "75"
    FULLY_OPTIMIZED = "100"

class Function(Base):
    __tablename__ = "functions"
    id = Column(String(2), primary_key=True)  # GV, ID, PR, etc.
    name = Column(String(50), nullable=False)
    categories = relationship("Category", back_populates="function")

class Category(Base):
    __tablename__ = "categories"
    id = Column(String(10), primary_key=True)  # GV.OC, etc.
    name = Column(String(255), nullable=False)
    function_id = Column(String(2), ForeignKey("functions.id"))
    function = relationship("Function", back_populates="categories")
    subcategories = relationship("Subcategory", back_populates="category")
    tier_assessments = relationship("CategoryTierAssessment", back_populates="category")

class Subcategory(Base):
    __tablename__ = "subcategories"
    id = Column(String(20), primary_key=True)  # GV.OC-01, etc.
    text = Column(Text, nullable=False)
    category_id = Column(String(10), ForeignKey("categories.id"))
    category = relationship("Category", back_populates="subcategories")
    assessments = relationship("SubcategoryAssessment", back_populates="subcategory")

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    tenant_id = Column(String(255), unique=True, index=True) # For RLS/Isolation
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    snapshots = relationship("AssessmentSnapshot", back_populates="organization")

class AssessmentSnapshot(Base):
    __tablename__ = "assessment_snapshots"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    name = Column(String(255), nullable=False)
    version_tag = Column(String(50))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    overall_tier = Column(Integer) # 1-4

    organization = relationship("Organization", back_populates="snapshots")
    subcategory_assessments = relationship("SubcategoryAssessment", back_populates="snapshot")
    category_tier_assessments = relationship("CategoryTierAssessment", back_populates="snapshot")

class SubcategoryAssessment(Base):
    __tablename__ = "subcategory_assessments"
    id = Column(Integer, primary_key=True, index=True)
    snapshot_id = Column(Integer, ForeignKey("assessment_snapshots.id"))
    subcategory_id = Column(String(20), ForeignKey("subcategories.id"))
    maturity_score = Column(String(10)) # Maps to MaturityLevel enum
    evidence_notes = Column(Text)
    action_item = Column(Text)

    snapshot = relationship("AssessmentSnapshot", back_populates="subcategory_assessments")
    subcategory = relationship("Subcategory", back_populates="assessments")

class CategoryTierAssessment(Base):
    __tablename__ = "category_tier_assessments"
    id = Column(Integer, primary_key=True, index=True)
    snapshot_id = Column(Integer, ForeignKey("assessment_snapshots.id"))
    category_id = Column(String(10), ForeignKey("categories.id"))
    tier_level = Column(Integer) # 1-4

    snapshot = relationship("AssessmentSnapshot", back_populates="category_tier_assessments")
    category = relationship("Category", back_populates="tier_assessments")
