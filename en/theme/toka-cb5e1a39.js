hljs.registerLanguage('toka', function(hljs) {
  return {
    name: 'Toka',
    aliases: ['tk'],
    keywords: {
      keyword:
        'fn auto shape impl import guard cede new unsafe alloc free null none effects return if else while loop for match in break continue as pub async await',
      type:
        'i8 i16 i32 i64 u8 u16 u32 u64 f32 f64 bool char void String Vec Result Option Data Buffer Node Point',
      literal:
        'true false null none'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: 's"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: 'number',
        variants: [
          { begin: '\\b0x[a-fA-F0-9_]+\\b' },
          { begin: '\\b0o[0-7_]+\\b' },
          { begin: '\\b0b[01_]+\\b' },
          { begin: '\\b\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?\\b' }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'fn',
        end: '(\\(|<)',
        excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: 'class',
        beginKeywords: 'shape impl',
        end: /\{/,
        excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: 'symbol',
        begin: /#|\?|\^|~|\*|&|!|<-/
      }
    ]
  };
});

// Manually re-highlight all toka code blocks after registering the language
// This works across all highlight.js versions (v9, v10, v11+)
(function() {
  var blocks = document.querySelectorAll('pre code');
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    var cls = block.className || '';
    if (cls.indexOf('language-toka') !== -1 || cls.indexOf('language-tk') !== -1) {
      if (typeof hljs.highlightElement === 'function') {
        hljs.highlightElement(block);
      } else if (typeof hljs.highlightBlock === 'function') {
        hljs.highlightBlock(block);
      }
    }
  }
})();

// Bilingual language switcher
(function() {
  var path = window.location.pathname;
  var isEn = path.indexOf('/en/') !== -1;
  var isZh = path.indexOf('/zh/') !== -1;
  if (!isEn && !isZh) return; // not inside the book subdirectories

  function injectButton() {
    var rightButtons = document.querySelector('.right-buttons');
    if (!rightButtons || document.getElementById('mdbook-lang-toggle')) return;

    var toggleBtn = document.createElement('a');
    toggleBtn.id = 'mdbook-lang-toggle';
    toggleBtn.className = 'icon-button';
    toggleBtn.title = isEn ? '阅读中文版 (Switch to Chinese)' : 'Read in English (切换至英文版)';
    toggleBtn.ariaLabel = toggleBtn.title;
    
    var targetUrl;
    var langText;
    if (isEn) {
      targetUrl = path.replace('/en/', '/zh/');
      langText = '中';
    } else {
      targetUrl = path.replace('/zh/', '/en/');
      langText = 'EN';
    }

    toggleBtn.href = targetUrl;
    toggleBtn.innerHTML = '<span class="fa-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: currentColor; vertical-align: middle;"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.4c2.2 20.4 3.3 41.8 3.3 64zm28.8-64h123.1c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.8-29.8-117.4-55.3-151.6 78.3 24.3 140.7 86.8 165 165.2zM272 48c26.7 35.8 46.9 92.5 56.7 160H183.3c9.9-67.5 30-124.2 56.7-160h32zM114.7 81.6C140.2 115.8 160 169.4 170 233.2H48.4c24.3-78.4 86.7-140.9 165-165.2zM48.4 278.4h121.6c-10 63.8-29.8 117.4-55.3 151.6-78.3-24.3-140.7-86.8-165-165.2zm218.4 185.6c-26.7-35.8-46.9-92.5-56.7-160h113.4c-9.9 67.5-30 124.2-56.7 160h-32zm114.7-34c25.5-34.2 45.3-87.8 55.3-151.6h121.6c-24.3 78.4-86.7 140.9-165 165.2z"/></svg></span><span style="font-size: 0.85rem; font-weight: bold; margin-left: 5px; vertical-align: middle; font-family: sans-serif;">' + langText + '</span>';

    // Insert as the first element of .right-buttons
    rightButtons.insertBefore(toggleBtn, rightButtons.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();

// Dynamic Return to Homepage Sidebar Link Injection
(function() {
  var path = window.location.pathname;
  var isEn = path.indexOf('/en/') !== -1;
  var isZh = path.indexOf('/zh/') !== -1;
  if (!isEn && !isZh) return; // not inside the book subdirectories

  function injectReturnLink() {
    var sidebarScrollbox = document.querySelector('.sidebar-scrollbox');
    if (!sidebarScrollbox) return;

    var chapterList = sidebarScrollbox.querySelector('ol.chapter');
    if (!chapterList) return;

    // Check if already injected
    if (document.getElementById('mdbook-return-link')) return;

    var li = document.createElement('li');
    li.className = 'chapter-item expanded';
    li.id = 'mdbook-return-link';

    var span = document.createElement('span');
    span.className = 'chapter-link-wrapper';

    var a = document.createElement('a');
    a.href = 'https://tokalang.dev';
    a.target = '_parent';
    a.textContent = isZh ? '🏠 返回 tokalang.dev' : '🏠 Return to tokalang.dev';

    span.appendChild(a);
    li.appendChild(span);

    // Insert at the very top of the sidebar list
    chapterList.insertBefore(li, chapterList.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectReturnLink);
  } else {
    injectReturnLink();
  }
})();

// GitHub-style Alerts Parser and CSS styling
(function() {
  function renderAlerts() {
    var blockquotes = document.querySelectorAll('blockquote');
    if (blockquotes.length === 0) return;

    // Define color palettes and SVG icons for each alert type
    var alertTypes = {
      'NOTE': {
        color: '#2f80ed',
        bg: 'rgba(47, 128, 237, 0.08)',
        titleEn: 'Note',
        titleZh: '提示',
        svg: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;vertical-align:text-bottom;"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.5 6.5a.5.5 0 0 0 0-1H9V8a.5.5 0 0 0-1 0v3h-.5a.5.5 0 0 0 0 1h2Z"></path></svg>'
      },
      'TIP': {
        color: '#27ae60',
        bg: 'rgba(39, 174, 96, 0.08)',
        titleEn: 'Tip',
        titleZh: '建议',
        svg: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;vertical-align:text-bottom;"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 11h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm1.5-6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1.5 3a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5Z"></path></svg>'
      },
      'IMPORTANT': {
        color: '#8e44ad',
        bg: 'rgba(142, 68, 173, 0.08)',
        titleEn: 'Important',
        titleZh: '重要',
        svg: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;vertical-align:text-bottom;"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8.5-4.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5Zm0 7a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>'
      },
      'WARNING': {
        color: '#d35400',
        bg: 'rgba(211, 84, 0, 0.08)',
        titleEn: 'Warning',
        titleZh: '警告',
        svg: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;vertical-align:text-bottom;"><path d="M6.457 1.047a2 2 0 0 1 3.086 0L15.35 8.16a2 2 0 0 1 0 2.68L9.543 14.95a2 2 0 0 1-3.086 0L.65 10.84a2 2 0 0 1 0-2.68L6.457 1.047ZM8 4a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 4Zm0 7a.998 9.998 0 1 0 0-1.996A.998 9.998 0 0 0 8 11Z"></path></svg>'
      },
      'CAUTION': {
        color: '#c0392b',
        bg: 'rgba(192, 57, 43, 0.08)',
        titleEn: 'Caution',
        titleZh: '注意',
        svg: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;vertical-align:text-bottom;"><path d="M8.22 1.754a1 1 0 0 0-1.76 0l-6.23 10.6a1 1 0 0 0 .88 1.486h12.46a1 1 0 0 0 .88-1.486l-6.23-10.6ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 7a.998 9.998 0 1 1 0-1.996A.998 9.998 0 0 1 8 11Z"></path></svg>'
      }
    };

    var isZh = window.location.pathname.indexOf('/zh/') !== -1;

    // Inject alert styles into head if they don't exist
    if (!document.getElementById('mdbook-alerts-style')) {
      var style = document.createElement('style');
      style.id = 'mdbook-alerts-style';
      style.textContent = `
        blockquote.markdown-alert {
          border-left: 0.25em solid transparent !important;
          padding: 1em 1.25em !important;
          margin: 1.5em 0 !important;
          border-radius: 6px !important;
          font-size: 0.95rem !important;
          line-height: 1.6 !important;
        }
        blockquote.markdown-alert p:first-child {
          margin-top: 0 !important;
        }
        blockquote.markdown-alert p:last-child {
          margin-bottom: 0 !important;
        }
        .markdown-alert-title {
          display: flex;
          align-items: center;
          font-weight: 700;
          margin-bottom: 0.5em;
          font-size: 0.95rem;
          text-transform: uppercase;
        }
        .markdown-alert-title svg {
          margin-right: 8px;
          flex-shrink: 0;
        }
        
        /* NOTE Alert */
        blockquote.markdown-alert-note {
          border-left-color: ${alertTypes.NOTE.color} !important;
          background-color: ${alertTypes.NOTE.bg} !important;
        }
        blockquote.markdown-alert-note .markdown-alert-title {
          color: ${alertTypes.NOTE.color};
        }
        
        /* TIP Alert */
        blockquote.markdown-alert-tip {
          border-left-color: ${alertTypes.TIP.color} !important;
          background-color: ${alertTypes.TIP.bg} !important;
        }
        blockquote.markdown-alert-tip .markdown-alert-title {
          color: ${alertTypes.TIP.color};
        }
        
        /* IMPORTANT Alert */
        blockquote.markdown-alert-important {
          border-left-color: ${alertTypes.IMPORTANT.color} !important;
          background-color: ${alertTypes.IMPORTANT.bg} !important;
        }
        blockquote.markdown-alert-important .markdown-alert-title {
          color: ${alertTypes.IMPORTANT.color};
        }
        
        /* WARNING Alert */
        blockquote.markdown-alert-warning {
          border-left-color: ${alertTypes.WARNING.color} !important;
          background-color: ${alertTypes.WARNING.bg} !important;
        }
        blockquote.markdown-alert-warning .markdown-alert-title {
          color: ${alertTypes.WARNING.color};
        }
        
        /* CAUTION Alert */
        blockquote.markdown-alert-caution {
          border-left-color: ${alertTypes.CAUTION.color} !important;
          background-color: ${alertTypes.CAUTION.bg} !important;
        }
        blockquote.markdown-alert-caution .markdown-alert-title {
          color: ${alertTypes.CAUTION.color};
        }
      `;
      document.head.appendChild(style);
    }

    blockquotes.forEach(function(bq) {
      // Find the first paragraph
      var p = bq.querySelector('p:first-child');
      if (!p) return;

      var rawHtml = p.innerHTML;
      // Match pattern "[!NOTE]" or "[!TIP]" etc. at the start of the blockquote
      var match = rawHtml.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s|<br>|\n)?/i);
      if (!match) return;

      var type = match[1].toUpperCase();
      var config = alertTypes[type];
      if (!config) return;

      // Clean the "[!NOTE]" prefix from the HTML
      p.innerHTML = rawHtml.replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s|<br>|\n)?/i, '');

      // Add appropriate CSS classes to the blockquote
      bq.classList.add('markdown-alert');
      bq.classList.add('markdown-alert-' + type.toLowerCase());

      // Create and prepend the Alert Title element
      var titleDiv = document.createElement('div');
      titleDiv.className = 'markdown-alert-title';
      titleDiv.innerHTML = config.svg + (isZh ? config.titleZh : config.titleEn);
      bq.insertBefore(titleDiv, bq.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAlerts);
  } else {
    renderAlerts();
  }
})();

// Lightweight front-end Mermaid.js loader and renderer
(function() {
  function renderMermaid() {
    var mermaidCodes = document.querySelectorAll('pre code.language-mermaid');
    if (mermaidCodes.length === 0) return;

    // Load mermaid.js dynamically from CDN
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = function() {
      // Check mdBook theme to adapt Mermaid's style
      var isDark = document.documentElement.classList.contains('coal') ||
                   document.documentElement.classList.contains('navy') ||
                   document.documentElement.classList.contains('ayu') ||
                   document.documentElement.classList.contains('tomorrow-night');
      
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        themeVariables: {
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }
      });

      mermaidCodes.forEach(function(code) {
        var pre = code.parentElement;
        var div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code.textContent;
        
        // Apply some basic layout polishing for premium look
        div.style.margin = '2em 0';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        
        pre.parentElement.replaceChild(div, pre);
      });

      mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    };
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMermaid);
  } else {
    renderMermaid();
  }
})();
