const fs = require('fs');

const apiKey = process.env.GROQ_API_KEY || '';

// Read the source HTML
let html = fs.readFileSync('Outound/index.html', 'utf8');

// Inject a script that pre-seeds the API key into localStorage
// so users never have to enter it manually
const injection = `<script>
  (function() {
    var key = '${apiKey}';
    if (key) localStorage.setItem('outound_groq_key', key);
  })();
</script>`;

html = html.replace('</head>', injection + '</head>');

// Write to dist/
if (!fs.existsSync('dist')) fs.mkdirSync('dist');
fs.writeFileSync('dist/index.html', html);
console.log('Build complete — API key injected.');
