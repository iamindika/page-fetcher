const request = require('request');
const fs = require('fs');

let args = process.argv.slice(2);

request(`${args[0]}`, (error, response, body) => {
  // console.log('Whacky Error:', error);
  // console.log('statusCode:', response && response.statusCode);
  // console.log('Whacky Body:', body);
  
  let path = args[1];

  fs.open(path, 'w', function(err, fd) {
    if (err) {
      throw new Error('Failed to Open to file!');
    }

    fs.write(fd, body, 0, body.length, String, function(err) {
      if (err) {
        throw new Error('Failed to Write to file!');
      }

      fs.close(fd, function() {
        console.log();
      });
    });
  });

  fs.stat(path, (err, stats) => {
    console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
  });

  

});

