"""Embed the supplied rules so the page also works when opened as a local file."""
from pathlib import Path
import html
import re

root = Path(__file__).resolve().parents[1]
lines = (root / 'thele.md').read_text(encoding='utf-8-sig').splitlines()
blocks = []
list_type = None

def inline(text):
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html.escape(text))

for line in lines:
    line = line.strip()
    ordered = re.match(r'^\d+\.\s+(.+)', line)
    kind = 'ul' if line.startswith('- ') else 'ol' if ordered else None
    if kind != list_type and list_type:
        blocks.append(f'</{list_type}>')
        list_type = None
    if not line:
        continue
    if kind:
        if not list_type:
            blocks.append(f'<{kind}>')
            list_type = kind
        blocks.append(f'<li>{inline(line[2:] if kind == "ul" else ordered[1])}</li>')
    elif re.fullmatch(r'\*\*.+\*\*', line):
        text = line[2:-2]
        tag = 'h3' if re.match(r'^[IVX]+\.', text) else 'h4' if re.match(r'^\d+\.', text) else 'p'
        blocks.append(f'<{tag}>{inline(text)}</{tag}>')
    else:
        blocks.append(f'<p>{inline(line)}</p>')
if list_type:
    blocks.append(f'</{list_type}>')
if lines[-1].strip().endswith('BTC có thông'):
    blocks.append('<p class="rules-incomplete">Lưu ý: câu cuối trong tài liệu được cung cấp chưa đầy đủ. Phần ngoại lệ về hiệp phụ chờ BTC bổ sung.</p>')
page = root / 'index.html'
content = page.read_text(encoding='utf-8')
content, count = re.subn(r'<!-- RULES START -->.*?<!-- RULES END -->', lambda _: '<!-- RULES START -->\n' + '\n'.join(blocks) + '\n<!-- RULES END -->', content, flags=re.S)
assert count == 1, 'Expected one rules content placeholder'
page.write_text(content, encoding='utf-8')
