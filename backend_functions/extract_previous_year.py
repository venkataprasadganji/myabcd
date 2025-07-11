import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import requests
import os
import re

# Path to Tesseract if needed
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

PDF_URL = "https://upsc.gov.in/sites/default/files/QP-CSP-25-GENERAL-STUDIES-PAPER-I-26052025.pdf"
PDF_FILE = "upsc_scanned.pdf"

# Step 1: Download the PDF
def download_pdf():
    res = requests.get(PDF_URL)
    with open(PDF_FILE, "wb") as f:
        f.write(res.content)
    print("✅ PDF downloaded.")

# Step 2: Convert PDF to Images
def convert_pdf_to_images(pdf_path):
    print("🖼️ Converting PDF to images...")
    return convert_from_path(pdf_path, dpi=300)

# Step 3: Run OCR on each image
def extract_text_from_images(images):
    print("🔍 Running OCR...")
    all_text = ""
    for i, img in enumerate(images):
        text = pytesseract.image_to_string(img)
        all_text += f"\n--- Page {i + 1} ---\n{text}"
    return all_text

# Step 4: Save output to file
def save_text(text):
    with open("ocr_output.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("📝 Text saved to ocr_output.txt")

if __name__ == "__main__":
    download_pdf()
    images = convert_pdf_to_images(PDF_FILE)
    text = extract_text_from_images(images)
    save_text(text)
