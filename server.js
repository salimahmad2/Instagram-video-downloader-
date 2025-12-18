const express = require('express');
const { spawn } = require('child_process');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(express.static('public'));

// Safe download route
app.get('/download', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('No URL provided');

  res.setHeader('Content-Disposition', 'attachment; filename="instagram.mp4"');
  res.setHeader('Content-Type', 'video/mp4');

  // small buffer to prevent crash on Render free plan
  const yt = spawn('yt-dlp', [
    '-f', 'bv*[ext=mp4]+ba[ext=m4a]/mp4',
    '--merge-output-format', 'mp4',
    '--quiet',
    '-o', '-',
    url
  ]);

  yt.stdout.pipe(res);

  yt.stderr.on('data', (data) => console.log(data.toString()));

  yt.on('close', () => res.end());
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
