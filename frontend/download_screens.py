import urllib.request

screens = {
    "browse.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YmFjMjJkMDZhOTIwNDczNmQwZjE3MWU3NjZmEgsSBxCY8PzfjB8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDMzMDgxNTc5Njg0MDM5NzQ1Nw&filename=&opi=89354086",
    "profile.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YmFjNWJmOGU5OGIwN2M0YzdhMmE2MmE2N2U1EgsSBxCY8PzfjB8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDMzMDgxNTc5Njg0MDM5NzQ1Nw&filename=&opi=89354086",
    "dashboard.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YmFjMjMwYzExMzQwN2M0ZTJjNGRlMjFhODFkEgsSBxCY8PzfjB8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDMzMDgxNTc5Njg0MDM5NzQ1Nw&filename=&opi=89354086",
    "login.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YmFjMjM0Nzk4NDMwN2ZlZTFmZjU1MjRiZTZiEgsSBxCY8PzfjB8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDMzMDgxNTc5Njg0MDM5NzQ1Nw&filename=&opi=89354086"
}

for name, url in screens.items():
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(name, 'wb') as f:
                f.write(response.read())
        print(f"Success {name}")
    except Exception as e:
        print(f"Error {name}: {e}")
