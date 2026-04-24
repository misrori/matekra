import { Fragment, useMemo } from 'react';
import katex from 'katex';

/**
 * Inline KaTeX: <Tex>{"\\frac{1}{2}"}</Tex>
 */
export function Tex({ children, block = false }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(String(children ?? ''), {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return `<span style="color:red">${String(children)}</span>`;
    }
  }, [children, block]);
  return (
    <span
      className={block ? 'katex-block' : 'katex-inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Lightweight markdown+math renderer used by every feladat body/statement.
 *
 * Tokenizer (block level):
 *   - blank line → paragraph break
 *   - line starting with "- " or "* " → list item (grouped into <ul>)
 *   - line starting with "1. ", "2. " ... → ordered list item (grouped into <ol>)
 *   - `$$...$$` block math (can span multiple lines)
 *   - otherwise: paragraph (consecutive non-blank lines join with <br/>)
 *
 * Inline (within any block):
 *   - `$...$` → inline KaTeX
 *   - `**text**` → <strong>
 *   - `*text*` or `_text_` → <em>
 *   - single `\$` → literal $
 */
export function MathText({ text }) {
  const blocks = useMemo(() => parseBlocks(String(text ?? '')), [text]);
  return (
    <>
      {blocks.map((b, i) => renderBlock(b, i))}
    </>
  );
}

/** Same as MathText but no block wrapping — safe inside headings / inline contexts. */
export function InlineMath({ text }) {
  return <>{renderInline(String(text ?? ''))}</>;
}

function renderBlock(block, key) {
  if (block.type === 'paragraph') {
    return <p key={key} style={{ margin: '0 0 10px' }}>{renderInline(block.text)}</p>;
  }
  if (block.type === 'ul') {
    return (
      <ul key={key} style={{ margin: '0 0 10px 20px', padding: 0 }}>
        {block.items.map((it, j) => (
          <li key={j} style={{ marginBottom: 4 }}>{renderInline(it)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'ol') {
    return (
      <ol key={key} style={{ margin: '0 0 10px 20px', padding: 0 }}>
        {block.items.map((it, j) => (
          <li key={j} style={{ marginBottom: 4 }}>{renderInline(it)}</li>
        ))}
      </ol>
    );
  }
  if (block.type === 'mathBlock') {
    return (
      <div key={key} style={{ margin: '10px 0', textAlign: 'center' }}>
        <Tex block>{block.tex}</Tex>
      </div>
    );
  }
  if (block.type === 'table') {
    return (
      <table key={key} className="data" style={{ margin: '10px 0' }}>
        {block.header && (
          <thead>
            <tr>{block.header.map((c, j) => <th key={j}>{renderInline(c)}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => <td key={ci}>{renderInline(c)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
}

function splitTableRow(line) {
  // Trim leading/trailing | and split.
  const trimmed = line.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
  return trimmed.split('|').map((c) => c.trim());
}
function isTableSeparator(line) {
  return /^\s*\|?[\s:-]+\|[\s:|-]+$/.test(line) && /-/.test(line);
}

function parseBlocks(src) {
  // 1. First extract $$ ... $$ block math placeholders so the line-based parser
  //    doesn't misread the body.
  const mathBlocks = [];
  const withPlaceholders = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    const idx = mathBlocks.length;
    mathBlocks.push(tex.trim());
    return `\n\x00MB${idx}\x00\n`;
  });

  const lines = withPlaceholders.split('\n');
  const blocks = [];
  let paraBuf = [];
  let listBuf = null; // {type, items, currentLines}

  const flushPara = () => {
    if (paraBuf.length) {
      blocks.push({ type: 'paragraph', text: paraBuf.join('\n') });
      paraBuf = [];
    }
  };
  const flushList = () => {
    if (listBuf) {
      blocks.push({ type: listBuf.type, items: listBuf.items });
      listBuf = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\s+$/, '');

    // Block-math placeholder
    const mbMatch = line.match(/^\x00MB(\d+)\x00$/);
    if (mbMatch) {
      flushPara();
      flushList();
      blocks.push({ type: 'mathBlock', tex: mathBlocks[+mbMatch[1]] });
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      flushPara();
      flushList();
      continue;
    }

    // Markdown table: current line has | and next line is a separator row
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      flushPara();
      flushList();
      const header = splitTableRow(line);
      const rows = [];
      i += 2; // skip header + separator
      while (i < lines.length) {
        const rl = lines[i].replace(/\s+$/, '');
        if (!rl.includes('|') || rl.trim() === '') break;
        rows.push(splitTableRow(rl));
        i++;
      }
      i--; // compensate for loop increment
      blocks.push({ type: 'table', header, rows });
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushPara();
      if (!listBuf || listBuf.type !== 'ol') {
        flushList();
        listBuf = { type: 'ol', items: [] };
      }
      listBuf.items.push(olMatch[3]);
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^(\s*)[-*]\s+(.*)$/);
    if (ulMatch) {
      flushPara();
      if (!listBuf || listBuf.type !== 'ul') {
        flushList();
        listBuf = { type: 'ul', items: [] };
      }
      listBuf.items.push(ulMatch[2]);
      continue;
    }

    // Continuation of a list item (indented line after list item)
    if (listBuf && /^\s{2,}\S/.test(raw)) {
      listBuf.items[listBuf.items.length - 1] += '\n' + raw.trim();
      continue;
    }

    // Paragraph text
    flushList();
    paraBuf.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

/**
 * Inline tokenizer: walks char-by-char, emits text, math, bold, italic tokens.
 */
function renderInline(text) {
  const tokens = tokenizeInline(String(text));
  return tokens.map((t, i) => {
    if (t.type === 'math') return <Tex key={i}>{t.value}</Tex>;
    if (t.type === 'bold') return <strong key={i}>{renderInline(t.value)}</strong>;
    if (t.type === 'italic') return <em key={i}>{renderInline(t.value)}</em>;
    if (t.type === 'linebreak') return <br key={i} />;
    return <Fragment key={i}>{t.value}</Fragment>;
  });
}

function tokenizeInline(s) {
  const out = [];
  let buf = '';
  let i = 0;
  const flush = () => {
    if (buf) {
      // Convert remaining newlines in plain-text into linebreaks so list-item
      // wraps render sensibly.
      const parts = buf.split('\n');
      parts.forEach((p, idx) => {
        if (p) out.push({ type: 'text', value: p });
        if (idx < parts.length - 1) out.push({ type: 'linebreak' });
      });
      buf = '';
    }
  };
  while (i < s.length) {
    const c = s[i];
    // Escaped dollar
    if (c === '\\' && s[i + 1] === '$') {
      buf += '$';
      i += 2;
      continue;
    }
    // Inline math
    if (c === '$') {
      const end = s.indexOf('$', i + 1);
      if (end !== -1) {
        flush();
        out.push({ type: 'math', value: s.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    // Bold
    if (c === '*' && s[i + 1] === '*') {
      const end = s.indexOf('**', i + 2);
      if (end !== -1) {
        flush();
        out.push({ type: 'bold', value: s.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    // Italic (single * or _)
    if ((c === '_' || c === '*') && s[i - 1] !== c && s[i + 1] !== c) {
      const end = s.indexOf(c, i + 1);
      if (end !== -1 && end > i + 1 && !/\s/.test(s[i + 1])) {
        flush();
        out.push({ type: 'italic', value: s.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    buf += c;
    i++;
  }
  flush();
  return out;
}
