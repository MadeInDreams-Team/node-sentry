
const http = require('http');

// CONFIGURATION SETTINGS
const hostname = '127.0.0.1';
const port = 60000;  // NODE PORT


let data = []

data['rocket'] = {
    "channel": "madeindreams-node",
    "attachments": [
        {
            "fallback": "Plain-text summary of the attachment.",
            "color": "#2eb886",
            "pretext": "The MadeInDreams Organization",
            "author_name": "Ian Decentralize",
            "author_link": "https://madeindreams.ca",
            "author_icon": "https://madeindreams.ca/coin.png",
            "title": "Slack API Documentation",
            "title_link": "https://madeindreams.org",
            "text": "To the moon!",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "https://madeindreams.ca/logo.png",
            "thumb_url": "https://madeindreams.ca/logo.svg",
            "footer": "Slack API",
            "footer_icon": "https://madeindreams.ca/logo.svg",
            "ts": 123456789
        }
    ]
  }


 const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const path = req.url.split("/")
    console.log(path[1])

    if(path[1] === 'slackBot'){
        if(path[2] === 'api'){
          let command = path[3]
          console.log(command)
          res.end(JSON.stringify(data[command]));
        }
    }else {
        res.end('ERROR 404');
    }
 })

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
