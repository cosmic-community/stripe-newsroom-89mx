const fs = require('fs');
const path = require('path');

function injectScript(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      injectScript(fullPath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace(
          '</head>',
          '<script src="/dashboard-console-capture.js"></script></head>'
        );
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  });
}

// Next.js App Router already references the console capture script directly
// in app/layout.tsx, so no static HTML injection is required for this build.
console.log(
  'Console capture script is referenced in app/layout.tsx; skipping additional HTML injection.'
);