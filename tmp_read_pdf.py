import sys

try:
    import PyPDF2
except ImportError:
    print("PyPDF2 is not installed.")
    sys.exit(1)

pdf_path = r"C:\Users\Usuário\Desktop\CheckList.pdf"

try:
    reader = PyPDF2.PdfReader(pdf_path)
    fields = reader.get_fields()
    if fields:
        for field_name, field_info in fields.items():
            field_type = field_info.get('/FT', 'Unknown')
            # Extract actual type string, it's usually a NameObject like /Tx for Text, /Btn for Button (checkbox/radio)
            print(f"Field: {field_name} | Type: {field_type}")
    else:
        print("No fields found.")
except Exception as e:
    print(f"Error: {e}")
