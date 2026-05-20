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
