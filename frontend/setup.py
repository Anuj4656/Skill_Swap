import re, json

with open('browse.html', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'tailwind\.config\s*=\s*(\{.*?\});', text, re.DOTALL)
if match:
    try:
        # We need to strictly parse JS object as JSON, which might contain extra quotes and keys.
        # But actually in the HTML it looks perfectly JSON compatible except for keys without quotes?
        # Looking at lines 3-105: The keys all have quotes in the raw HTML!
        # Wait, the HTML has single quotes or unquoted keys?
        # Actually it's safer to just do string manipulation:
        js_obj = match.group(1)
        out = f"""/** @type {{import('tailwindcss').Config}} */
export default {{
  content: ['./index.html', './src/**/*.{{js,ts,jsx,tsx}}'],
  darkMode: "class",
  {js_obj[2:-2]}
}};
"""
        with open('tailwind.config.js', 'w', encoding='utf-8') as out_f:
            out_f.write(out)
        print("Success! Created tailwind.config.js")
    except Exception as e:
        print("Parsing error:", e)
else:
    print("Did not find tailwind config!")
