import fitz

try:
    doc = fitz.open(r"C:\Users\Usuário\Desktop\CheckList.pdf")
    page = doc[0]

    fields = []
    for field in page.widgets():
        fields.append({
            'name': field.field_name,
            'type': field.field_type_string,
            'rect': field.rect,
            'value': field.field_value
        })

    # Group by approximate Y (lines) then sort by X
    fields.sort(key=lambda x: (round(x['rect'].y0 / 8) * 8, x['rect'].x0))

    for f in fields:
        print(f"[{f['type']}] {f['name']} => at Y:{f['rect'].y0:.1f}, X:{f['rect'].x0:.1f}")

except Exception as e:
    print(f"Error: {e}")
