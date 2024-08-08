const fs = require('fs');
const https = require('https');

async function download(name, url) {
  return new Promise((resolve, reject) => {
    const extension = url.split('.').pop();
    const file = fs.createWriteStream(`./output/${name}.${extension}`);
    
    https
      .get(url, function (response) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', error => {
        console.warn(`Failed to download ${url}: `, error.message);
        reject(error);
      });
  });
}

async function doWork() {
  const filename = process.argv[2];
  if (!filename) {
    console.log('You forgot the filename!');
    console.log('(╯°□°)╯︵ ┻━┻ ');
    process.exit();
  }
  
  const emojis = require(`./${filename}`).emoji;
  
  console.log(`Downloading ${Object.entries(emojis).length} emoji from Slack`);
  
  for (let [name, url] of Object.entries(emojis)) {
    if (!url.startsWith('alias:')) {
      await download(name, url);
    }
  }
  
  console.log('All done!');
}

doWork().catch(console.error);
