export function renderEditorJS(blocks) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'header':
          return renderHeader(block.data, block.id);
        case 'paragraph':
          return renderParagraph(block.data, block.id);
        case 'image':
          return renderImage(block.data, block.id);
        case 'quote':
          return renderQuote(block.data, block.id);
        case 'list':
          return renderList(block.data);
        case "code":
          return renderCode(block.data, block.id);
        case "table":
          return renderTable(block.data, block.id);
        case "embed":
          return renderEmbed(block.data, block.id);
        default:
          // For unhandled block types, return an empty string or handle as needed
          return '<p>Unsupported block type</p>';
      }
    })
    .join('');
}

/** Render a embed iframe block
 * @param {Object} data - { caption: string, embed: string, height: string, service: string, source: string, width: string }
 */
export function renderEmbed(data, id) {
  const caption = data.caption || '';
  const embed = data.embed || '';
  const height = '100%';
  const service = data.service || 'other';
  const width = '100%';
  if (service !== 'youtube') {
    return `<p>Unsupported embed service: ${service}</p>`;
  }

  return `
    <div id="${id}" class="embed-block visual-content">
      <iframe src="${embed}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </div>
  `;
}

/**
 * Render a table block.
 * @param {Object} data - { withHeadings: boolean, stretched: boolean, content: array of arrays }
 */
function renderTable(data, id) {
  // data: { withHeadings: boolean, stretched: boolean, content: array of arrays }
  let html = `<table id="${id}" class="visual-content">`;
  const rows = data.content;

  if (data.withHeadings && rows.length > 0) {
    // Render header row
    html += '<thead><tr>';
    rows[0].forEach(cell => {
      html += `<th>${cell}</th>`;
    });
    html += '</tr></thead>';

    // Render the rest as tbody rows
    html += '<tbody>';
    for (let i = 1; i < rows.length; i++) {
      html += '<tr>';
      rows[i].forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    }
    html += '</tbody>';
  } else {
    // If no headings, render all rows as body rows
    html += '<tbody>';
    rows.forEach(row => {
      html += '<tr>';
      row.forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody>';
  }

  html += '</table>';
  return html;
}

/**
 * Render a code block.
 * @param {Object} data - { code: string}
 */
function renderCode(data, id) {
  const code = data.code || '';
  return `<pre id="${id}" class="code-block text-content"><code>${code}</code></pre>`;
}

/**
 * Render a header block.
 * @param {Object} data - { text: string, level: number }
 */
function renderHeader(data, id) {
  const level = data.level || 1;
  const text = data.text || '';
  return `<h${level} id="${id}" class="text-content ${level === 1 ? "main-title" : "article-title"}">${text}</h${level}>`;
}

/**
 * Render a paragraph block.
 * @param {Object} data - { text: string }
 */
function renderParagraph(data, id) {
  // Ensure data.text is sanitized if it comes from user input.
  return `<p id="${id}" class="text-content article-paragraph">${data.text}</p>`;
}

/**
 * Render an image block.
 * @param {Object} data - { url: string, caption?: string, stretched?: boolean, withBorder?: boolean, withBackground?: boolean }
 */
function renderImage(data, id) {
  const url = data.file.url || '';
  const caption = data.caption || '';
  const stretched = data.stretched || false;
  const withBorder = data.withBorder || false;
  const withBackground = data.withBackground || false;
  return `
    <figure id="${id}" class="article-image visual-content ${stretched ? 'stretched' : ''} ${withBorder ? 'bordered' : ''} ${withBackground ? 'backgrounded' : ''}">
      <img src="${url}" alt="${caption}">
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>
  `;
}

/**
 * Render a quote block.
 * @param {Object} data - { text: string, caption?: string, alignment?: string }
 */
function renderQuote(data, id) {
  const text = data.text || '';
  const caption = data.caption || '';
  const alignment = data.alignment || 'left';
  return `
    <blockquote id="${id}" class="text-content article-quote" style="text-align: ${alignment};">
      <p>${text}</p>
      ${caption ? `<cite>${caption}</cite>` : ''}
    </blockquote>
  `;
}

/**
 * Render a list block (ordered, unordered, or checklist).
 * @param {Object} data - {
 *   style: 'ordered' | 'unordered' | 'checklist',
 *   meta?: { start?: number, counterType?: string, ... },
 *   items: Array of { content: string, meta?: { checked?: boolean }, items?: Array }
 * }
 */
function renderList(data) {
  const { style, meta = {}, items = [] } = data;
  return renderListItems(items, style, meta);
}

/**
 * Recursively render list items.
 * @param {Array} items - array of list items, each may contain nested items.
 * @param {string} style - 'ordered' | 'unordered' | 'checklist'
 * @param {Object} meta - extra metadata (e.g., start, counterType)
 */
function renderListItems(items, style, meta = {}) {
  let tag = 'ul';
  let classList = "text-content article-list";
  let parentType = '';

  // Handle ordered lists
  if (style === 'ordered') {
    tag = 'ol';

    switch (meta.counterType) {
      case 'lower-alpha':
        classList += " lower-alpha-list";
        parentType = 'lower-alpha';
        break;
      case 'upper-alpha':
        classList += " upper-alpha-list";
        parentType = 'upper-alpha';
        break;
      case 'lower-roman':
        classList += " lower-roman-list";
        parentType = 'lower-roman';
        break;
      case 'upper-roman':
        classList += " upper-roman-list";
        parentType = 'upper-roman';
        break;
      default:
        classList += " decimal-list";
        parentType = 'decimal';
        break;
    }

    // Add start attribute if present
  }

  // Handle checklist: still use <ul>
  else if (style === 'checklist') {
    tag = 'ul';

    // Add class for styling
    classList = "text-content check-list";
  }

  const renderedItems = items
    .map((item) => {
      const nestedItems = item.items && item.items.length
        ? renderListItems(item.items, style, { counterType: parentType })
        : '';

      if (style === 'checklist') {
        const checked = item.meta && item.meta.checked ? 'checked' : '';
        return `
          <li>
            <label>
              <input type="checkbox" ${checked} />
              ${item.content}
            </label>
            ${nestedItems}
          </li>
        `;
      } else {
        return `
          <li>
            ${item.content}
            ${nestedItems}
          </li>
        `;
      }
    })
    .join('');

  return `<${tag} class="${classList}">${renderedItems}</${tag}>`;
}

