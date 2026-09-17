import os
import re

html_files = {
    'browse.html': 'Home.jsx',
    'profile.html': 'Profile.jsx',
    'dashboard.html': 'Dashboard.jsx',
    'login.html': 'Auth.jsx'
}

def html_to_jsx(content):
    # Rip out scripts
    content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL)
    # Convert standard attributes
    content = content.replace('class="', 'className="')
    content = content.replace('for="', 'htmlFor="')
    
    # Self-closing tags
    for tag in ['input', 'img', 'br', 'hr']:
        # Match <tag ... > but not already strictly closed
        # Very naive but works well enough for static generated code
        content = re.sub(fr'<{tag}([^>]*?)(?<!/)>', fr'<{tag}\1 />', content)
        
    # Comments
    content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content)
    
    # SVG fixes (Stitch primarily uses font Material Symbols so SVGs might be rare, but just in case)
    content = content.replace('stroke-width', 'strokeWidth')
    content = content.replace('fill-rule', 'fillRule')
    content = content.replace('clip-rule', 'clipRule')
    content = content.replace('stroke-linecap', 'strokeLinecap')
    content = content.replace('stroke-linejoin', 'strokeLinejoin')
    
    return content

for html_file, jsx_file in html_files.items():
    if os.path.exists(html_file):
        with open(html_file, 'r', encoding='utf-8') as f:
            html = f.read()
        
        # Extract body contents implicitly
        match = re.search(r'<body.*?>(.*?)</body>', html, re.DOTALL)
        if match:
            inner_body = match.group(1)
            jsx = html_to_jsx(inner_body)
            # Wrap as a raw React component export for manual merging
            out = f"import React from 'react';\n\nexport default function {jsx_file.replace('.jsx','')}Raw() {{\n  return (\n    <>\n{jsx}\n    </>\n  );\n}}\n"
            with open(f"raw_{jsx_file}", 'w', encoding='utf-8') as f:
                f.write(out)
            print(f"Generated raw_{jsx_file}")
    else:
        print(f"Skipping {html_file}")
