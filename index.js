import express from "express";
import bodyParser from "body-parser";
import * as fs from 'fs';

const app = express();
const port = 3000;



app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readFile("data/URL.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      var json = JSON.parse(data);
      res.render("index.ejs", {input: json});
    }
    else {
      res.render("index.ejs");
    }
  });

});

app.post("/submit", (req, res) => {
  if (fs.existsSync("data/URL.json")) {
    fs.readFile("data/URL.json", (err, data) => {
      if (err) {
        console.log(err);
      }
      
      var json = JSON.parse(data);

      json.push({
        text: req.body.thought,
        name: req.body.name,
        date: new Date()
      });
      fs.writeFile('data/URL.json', JSON.stringify(json), err => {
        if (err) {
            console.error(err);
          } else {
            console.log('Donesies');
          }
      res.render("index.ejs", {input: json});
      });
    }); 
   } else {
    var json = [{
      text: req.body.thought,
      name: req.body.name,
      date: new Date()
    }];
    fs.writeFile('data/URL.json', JSON.stringify(json), err => {
      if (err) {
          console.error(err);
        } else {
          console.log('Donesies');
        }
    res.render("index.ejs", {input: json});
    });

  }
  
});

app.post("/delete", (req, res) => {
  fs.unlink('data/URL.json', err => {
    if (err) {
        console.error(err);
      } else {
        console.log('Donesies');
      }
    res.render("index.ejs");
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});







