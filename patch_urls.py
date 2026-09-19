import os
import re

base_path = r'c:\Users\anujr\OneDrive\Desktop\Skill_Swap (1)\frontend\src'
target_url = 'http://127.0.0.1:8000'
var_code = "(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')"

for root, _, files in os.walk(base_path):
    for f in files:
        if f.endswith(('.js', '.jsx')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if target_url in content:
                # 1. Replace inside Template literals: `http://127.0.0.1:8000/
                content = content.replace(f"`{target_url}", f"`${{{var_code}}}")
                
                # 2. Replace inside single quotes: 'http://127.0.0.1:8000/api/' -> var_code + '/api/'
                content = content.replace(f"'{target_url}/", f"{var_code} + '/")
                content = content.replace(f"'{target_url}'", f"{var_code}")
                
                # 3. Replace inside double quotes href="http..." -> href={var_code + "/..."}
                content = re.sub(r'href="http://127\.0\.0\.1:8000(.*?)"', r'href={' + var_code + r' + "\1"}', content)
                
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Patched {f}")
