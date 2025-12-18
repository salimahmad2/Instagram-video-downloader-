const express = require('express');
const { YTDlpWrap } = require('yt-dlp-wrap');

const app = express();
const ytDlp = new YTDlpWrap();

app.use(express.static('public'));

app.get('/download', (req, res) => {
  const url = req.query.url;
  if (!url) return res.send('No URL');

  res.setHeader(
    'Content-Disposition',
    'attachment; filename="instagram.mp4"'
  );

  ytDlp.execStream([url, '-f', 'mp4']).pipe(res);
});

app.listen(3000, () => {
  console.log('Server running');
});
