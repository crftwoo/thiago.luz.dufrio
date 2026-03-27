import sys
import PyPDF2

try:
    reader = PyPDF2.PdfReader(r"C:\Users\Usuário\Desktop\CheckList.pdf")
    fields = reader.get_fields()
    
    if fields:
        for name, data in fields.items():
            rect = data.get('/Rect')
            ftype = data.get('/FT')
            print(f"Field: '{name}' | Type: {ftype} | Rect: {rect}")
    else:
        print("No fields found.")
except Exception as e:
    print(f"Error: {e}")
