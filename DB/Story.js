const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/interactive_book');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Mongo DB ON");
});
//TODO: 아이패드로 서버 스키마 그리기

let Story = new mongoose.Schema({
    title: String,
    author: String,
    branches: {
        "type": [
          "Mixed"
        ]
      },
    token: String

});

let storyModel = mongoose.model('story', Story);
exports.Story = storyModel;
