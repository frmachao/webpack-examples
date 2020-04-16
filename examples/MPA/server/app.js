const express = require('express');
const app = express();
const path = require('path')
const {
  blogRouter,
  gameRouter,
  spa1Router,
  spa2Router,
} = require('./router')

app.use('/fe-static', express.static(path.join(__dirname, '../dist')))
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home')
})
app.use('/blog',blogRouter)
app.use('/game',gameRouter)
app.use('/spa1',spa1Router)
app.use('/spa2',spa2Router)

app.use((req, res, next) => {
  res.status(404)
    .send('Not Found');
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log('process.env["PORT"]===', process.env["PORT"])
  console.log("  Press CTRL-C to stop\n");
})