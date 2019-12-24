module.exports = index;

let { Story, Branch } = require('../DB/Story');
var random_string = require('randomstring');

function index(app) {
  app.get('/', (req, res) => {
    Story.find({},{branches: 0},(err,stories)=> {
      if (err) throw err;
      res.render('index',{title:"Interactive Book",stories: stories})
    })
  })

  app.get('/story/:token',(req,res)=> {
    Story.findOne({token: req.params.token},(err, stories)=> {
      if (err) throw err;
      res.json(stories)
    })
  })

  app.get('/stories/flat', (req,res)=> {
    Story.find({},{branches: 0},(err,stories)=> {
      if (err) throw err;
      res.json(stories)
    })
  })

  app.get('/stories', (req,res)=> {
    Story.find((err,stories)=> {
      if (err) throw err;
      res.send(JSON.stringify(stories, null, 4))
    })
  })
  
  app.get('/create', (req,res) => {
    res.render("create", {})
  })
  
  app.post('/create', (req,res) => {
    console.log(req.body.branches)
    let story = new Story({
      title: req.body.title,
      author: req.body.author,
      branches: JSON.parse(req.body.branches),
      token: random_string.generate()
    })
    story.save((err)=> {
      if (err) throw err;
      res.json(story)
    })
    
  })

}
