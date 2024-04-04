import express from "express";
import bodyParser from "body-parser";
import * as fs from 'fs';

const app = express();
const port = 3000;

var data = [{
  text: 'test',
  name: 'testt',
  date: 'testttt',
}];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(data[0]);
  res.render("index.ejs", data[0], data[1]);
});

app.post("/submit", (req, res) => {
  data.push({
    text: req.body.thought,
    name: req.body.name,
    date: new Date(),
  }) ;

  fs.writeFile('data/URL.json', JSON.stringify(data), err => {
    if (err) {
        console.error(err);
      } else {
        console.log('Donesies');
      }
  res.render("index.ejs", data[0, 1]);

  fs.readFile("data/URL.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    var json = JSON.parse(data);
    console.log(json);
    console.log(json[1].text);
  })
  });



});

app.post("/delete", (req, res) => {
  fs.unlink('data/URL.json', err => {
    if (err) {
        console.error(err);
      } else {
        console.log('Donesies');
      }
});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



