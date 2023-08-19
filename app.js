const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const http = require('http');

const { authors, books } = require('./index.html');

const PORT = 4000
const HOST_NAME = 'localhost';

const requestHandler = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    console.log(req.url)
    console.log(req.method)
    
    switch(req.url) {
        case '/books': 
            res.end(JSON.stringify(books));
            break;
        case '/authors':
            res.end(JSON.stringify(authors));
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({
                message: 'Not Found'
            }));
    }

}

const server = http.createServer(requestHandler)

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening on ${HOST_NAME}:${PORT}`)
}) 
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/app.html'));
});
 
router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});
 
router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});
app.get('/update/:id', (req, res) => {    
  var id = req.params.id; 
     res.render('edit.ejs');  
     console.log(req.params.id);
  });
  
app.delete('/', (req, res) => {
  res.send("DELETE Request Called")
});
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
 
console.log('Running at Port 3000');
