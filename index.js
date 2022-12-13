const express = require('express')
const app = express()
const fs = require('node:fs/promises');
// console.log("welcome Node");



// let count = 0;

// const func = ()=> {
//   console.log(`counter ${++count}`);
//   if (count > 10) clearInterval(intervalId);
// }

// const intervalId = setInterval(func, 1000);

require('dotenv').config()

app.get('/', (req, res) => {
  const { name } = req.query;
  res.send(`
    Welcome ${name} to users application!
    ${JSON.stringify(db.users)}
    <form action="/users" method="post" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required>
  </div>
  <div class="form-example">
    <input type="submit" value="Submit!">
  </div>
</form>
  `);
});

let db;
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.get('/users', (req, res) => {
  res.status(200).json(db.users);
});
app.post('/users', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  db.users.push({ id: db.users.length , ...userData });
  await fs.writeFile('./db.json', JSON.stringify(db));
  res.status(200).json(db.users);
});
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log('> userId', userId);
  const user = db.users.find((user) => user.id === userId);
  if (user) res.status(200).json(user);
  else res.status(500).json({ message: `User with id(${userId}) not found` });
});



app.listen(process.env.PORT || 3000, async () => {
  db = JSON.parse(await fs.readFile('./db.json', 'utf8'));
  console.log(`Example app listening on port ${process.env.PORT}`, db)
});


// process.on("exit", () =>{
//   console.log("Пока node");
// })
