#!/usr/bin/env node
/**
 * MIT Skill Builder - Local Development Server
 *
 * Usage: node server.js [PORT]
 * Default port: 8000
 *
 * Examples:
 *   node server.js              # Starts on port 8000
 *   node server.js 3000         # Starts on port 3000
 *
 * Then open: http://localhost:8000/index.html
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.argv[2] || 8000;

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  // Parse URL
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Prevent directory traversal attacks
  const realPath = path.resolve(filePath);
  const baseDir = path.resolve(__dirname);

  if (!realPath.startsWith(baseDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden: Access denied');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try index.html for directories
      if (!err && stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        return fs.stat(filePath, serveFile);
      }

      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`<h1>404 Not Found</h1><p>${req.url}</p>`);
      return;
    }

    serveFile(null, stats);
  });

  function serveFile(err, stats) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         MIT Skill Builder - Local Dev Server              ║
╚════════════════════════════════════════════════════════════╝

✓ Server running on http://localhost:${PORT}

Available routes:
  • http://localhost:${PORT}/              (Landing page)
  • http://localhost:${PORT}/login.html     (Login)
  • http://localhost:${PORT}/mit_skill_builder_practice.html (Practice)

Press Ctrl+C to stop the server
  `);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.error(`   Try: node server.js ${PORT + 1000}`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
