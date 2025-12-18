const express = require('express');
const { spawn } = require('child_process');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(express.static('public'));

app.get('/download', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('No URL provided');

  res.setHeader('Content-Disposition', 'attachment; filename="instagram.mp4"');
  res.setHeader('Content-Type', 'video/mp4');

  const yt = spawn('yt-dlp', [
    '-f', 'bv*[ext=mp4]+ba[ext=m4a]/mp4',
    '--merge-output-format', 'mp4',
    '-o', '-',
    url
  ]);

  yt.stdout.pipe(res);
  yt.stderr.on('data', d => console.log(d.toString()));
});

app.listen(3000, () => {
  console.log('Fast server running on http://localhost:3000');
});
```js
const express = require('express');
const { YTDlpWrap } = require('yt-dlp-wrap');
const path = require('path');

const app = express();
const ytDlp = new YTDlpWrap();

app.use(express.static('public'));

app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send('No URL provided');

  res.setHeader('Content-Disposition', 'attachment; filename="instagram.mp4"');

  ytDlp.execStream([
    url,
    '-f', 'mp4'
  ]).pipe(res);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
