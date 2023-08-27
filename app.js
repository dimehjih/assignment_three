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
 
function getAllUsers() {
  return new Promise((resolve, reject) => {
      fs.readFile(userDbPath, "utf8", (err, users) => {
          if (err) {
              reject(err);
          }
          resolve(JSON.parse(users));
      })
  })
}


function authenticateUser(req, res) {
  return new Promise((resolve, reject) => {
      const body = [];

      req.on('data', (chunk) => {
          body.push(chunk);
      });

      req.on('end', async () => {
          const parsedBody = Buffer.concat(body).toString();
          if (!parsedBody) {
              reject("Please enter your username and password");
          }

          const loginDetails = JSON.parse(parsedBody);

          const users = await getAllUsers();
          const userFound = users.find(user => user.username === loginDetails.username && user.password === loginDetails.password);

          if (!userFound) {
              reject("Username or password incorrect");
          }

          resolve(userFound)

      });
  })
}


module.exports = {
  authenticateUser
}
console.log('Running at Port 3000');
