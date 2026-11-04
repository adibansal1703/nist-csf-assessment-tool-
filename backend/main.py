from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

try:
    from . import models, schemas, database, ai_service
except ImportError:
    import models, schemas, database, ai_service


app = FastAPI(title="NIST CSF 2.0 Self-Assessment Tool")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# NIST Framework Endpoints
@app.get("/framework", response_model=List[schemas.FunctionBase])
def get_framework(db: Session = Depends(database.get_db)):
    return db.query(models.Function).all()

@app.get("/framework/functions/{function_id}/categories")
def get_categories(function_id: str, db: Session = Depends(database.get_db)):
    return db.query(models.Category).filter(models.Category.function_id == function_id).all()

@app.get("/framework/categories/{category_id}/subcategories")
def get_subcategories(category_id: str, db: Session = Depends(database.get_db)):
    return db.query(models.Subcategory).filter(models.Subcategory.category_id == category_id).all()

# Organization Endpoints
@app.post("/organizations/", response_model=schemas.OrganizationResponse)
def create_organization(org: schemas.OrganizationBase, db: Session = Depends(database.get_db)):
    db_org = models.Organization(**org.dict())
    db.add(db_org)
    db.commit()
    db.refresh(db_org)
    return db_org

@app.get("/organizations/", response_model=List[schemas.OrganizationResponse])
def list_organizations(db: Session = Depends(database.get_db)):
    return db.query(models.Organization).all()

# Assessment Endpoints
@app.post("/assessments/", response_model=schemas.AssessmentSnapshotResponse)
def create_assessment(assessment: schemas.AssessmentSnapshotCreate, db: Session = Depends(database.get_db)):
    # Create Snapshot
    db_snapshot = models.AssessmentSnapshot(
        org_id=assessment.org_id,
        name=assessment.name,
        version_tag=assessment.version_tag,
        overall_tier=assessment.overall_tier
    )
    db.add(db_snapshot)
    db.flush() # Get the snapshot ID

    # Create Subcategory Assessments
    for sub_assessment in assessment.subcategory_assessments:
        db_sub = models.SubcategoryAssessment(
            snapshot_id=db_snapshot.id,
            subcategory_id=sub_assessment.subcategory_id,
            maturity_score=sub_assessment.maturity_score,
            evidence_notes=sub_assessment.evidence_notes,
            action_item=sub_assessment.action_item
        )
        db.add(db_sub)

    # Create Category Tier Assessments
    for cat_tier in assessment.category_tier_assessments:
        db_cat = models.CategoryTierAssessment(
            snapshot_id=db_snapshot.id,
            category_id=cat_tier.category_id,
            tier_level=cat_tier.tier_level
        )
        db.add(db_cat)

    db.commit()
    db.refresh(db_snapshot)
    return db_snapshot

@app.get("/organizations/{org_id}/assessments/", response_model=List[schemas.AssessmentSnapshotResponse])
def get_org_assessments(org_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.AssessmentSnapshot).filter(models.AssessmentSnapshot.org_id == org_id).all()

@app.get("/assessments/{snapshot_id}")
def get_assessment_details(snapshot_id: int, db: Session = Depends(database.get_db)):
    snapshot = db.query(models.AssessmentSnapshot).filter(models.AssessmentSnapshot.id == snapshot_id).first()
    if not snapshot:
        raise HTTPException(status_code=404, detail="Assessment not found")

    sub_assessments = db.query(models.SubcategoryAssessment).filter(models.SubcategoryAssessment.snapshot_id == snapshot_id).all()
    tier_assessments = db.query(models.CategoryTierAssessment).filter(models.CategoryTierAssessment.snapshot_id == snapshot_id).all()

    return {
        "snapshot": snapshot,
        "subcategory_assessments": sub_assessments,
        "category_tier_assessments": tier_assessments
    }

@app.get("/")
async def root():
    return {"message": "NIST CSF 2.0 API is running"}

@app.post("/assess-evidence/")
async def analyze_evidence(subcategory_id: str, evidence_notes: str, db: Session = Depends(database.get_db)):
    sub = db.query(models.Subcategory).filter(models.Subcategory.id == subcategory_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subcategory not found")

    result = await ai_service.assess_evidence(sub.text, evidence_notes)

    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])

    return {"result": result}
