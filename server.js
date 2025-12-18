const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.static('public'));

app.get('/download', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.send('No URL provided');
  }

  res.setHeader(
    'Content-Disposition',
    'attachment; filename="instagram.mp4"'
  );

  const yt = spawn('yt-dlp', [
    '-f', 'mp4',
    '-o', '-',
    url
  ]);

  yt.stdout.pipe(res);
  yt.stderr.on('data', d => console.log(d.toString()));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
