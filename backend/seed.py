import json
import os

try:
    from backend.database import SessionLocal, engine, Base
    from backend.models import Function, Category, Subcategory
except ImportError:
    from database import SessionLocal, engine, Base
    from models import Function, Category, Subcategory

def seed_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Find seed_data.json path dynamically
    json_path = "seed_data.json" if os.path.exists("seed_data.json") else os.path.join("backend", "seed_data.json")

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        functions = {}
        categories = {}

        for item in data:
            f_id = item["function_id"]
            if f_id not in functions:
                f = Function(id=f_id, name=item["function_name"])
                db.merge(f)
                functions[f_id] = f

            c_id = item["category_id"]
            if c_id not in categories:
                c = Category(id=c_id, name=item["category_name"], function_id=f_id)
                db.merge(c)
                categories[c_id] = c

            s = Subcategory(
                id=item["subcategory_id"],
                text=item["subcategory_text"],
                category_id=c_id
            )
            db.merge(s)

        db.commit()
        print("NIST CSF 2.0 data seeded successfully!")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
