'use strict'

const fs = require('fs');
const args = process.argv.slice(2)[0].split(/[\n, ]+/);
console.log(args);


args.forEach( file => {
  const raw_data = fs.readFileSync("./asset/json/comments/" + file);
  let comments = JSON.parse(raw_data);

  comments = cleanup_comments(comments);

  const result_json = JSON.stringify(comments, null, 2);
  fs.writeFileSync("./asset/json/comments/" + file, result_json);  
});


function cleanup_comments(comments) {
  comments.forEach( comment => {
    comment = Object({
      id: comment.id,
      body: comment.body,
      user: Object({login: comment.user.login}),
      created_at: comment.created_at,
    });
  });
  return comments;  
}