import json
import firebase_admin
from firebase_admin import credentials, firestore

# === CONFIG ===
JSON_FILE = "upsc_prelims_mains_syllabus.json"  # Your local JSON file
DOC_REF_PATH = "syllabi/UPSC_fully_structured"
SERVICE_ACCOUNT_FILE = "serviceAccountKey.json"

# === Initialize Firebase ===
cred = credentials.Certificate(SERVICE_ACCOUNT_FILE)
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.document(DOC_REF_PATH)

# === Load JSON and Upload ===
def upload_prelims_mains():
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        syllabus_data = json.load(f)

    prelims = syllabus_data.get("prelims", {})
    mains = syllabus_data.get("mains", {})

    doc_ref.set({
        "prelims": prelims,
        "mains": mains,
        "source": "from_local_json",
        "last_updated": firestore.SERVER_TIMESTAMP
    })

    print(f"✅ Prelims and Mains syllabus uploaded to Firestore at {DOC_REF_PATH}")

if __name__ == "__main__":
    upload_prelims_mains()
