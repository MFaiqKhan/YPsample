import re

with open(r"C:\Users\SHAH\.gemini\antigravity\brain\fc610a54-03a6-4d59-8e2d-7cee7be7748a\.system_generated\steps\31\content.md", 'r', encoding='utf-8') as f:
    content = f.read()

# The content contains the HTML encoded with unicode escapes or something similar?
# Wait, looking at the output of the file, it's inside `self.__next_f.push([1,"\u003c!DOCTYPE html\u003e\n..."])`
# I can parse out the literal string from line 19.
import ast

match = re.search(r'self\.__next_f\.push\(\[1,"\\u003c!DOCTYPE html\\u003e(.*?)\]\)', content, re.DOTALL)
# Actually, let's just find the first line starting with \u003c!DOCTYPE html\u003e
html_str = ""
for line in content.split('\n'):
    if line.startswith('19:I[8080'):
        continue
    if '\\u003c!DOCTYPE html\\u003e' in line:
        # Extract the string part
        start = line.find('"\\u003c!DOCTYPE html\\u003e')
        if start != -1:
            try:
                # The line might span multiple lines or be cut. Wait, looking at the view_file, it's just raw unicode escape strings on each line?
                pass
            except Exception as e:
                pass

# A simpler way: The view_file output showed the literal unicode characters \u003c instead of <. Let's unescape the entire content.
decoded_content = content.encode().decode('unicode_escape')

# Now find the HTML part
html_start = decoded_content.find("<!DOCTYPE html>")
if html_start != -1:
    html_end = decoded_content.rfind("</html>") + 7
    html_code = decoded_content[html_start:html_end]
    with open('extracted.html', 'w', encoding='utf-8') as out:
        out.write(html_code)
    print("Extracted HTML successfully")
else:
    print("Could not find <!DOCTYPE html>")
