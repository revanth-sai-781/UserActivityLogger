const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// sending sample user data(based on real time scenarios) //
const users = [
  { username: 'user1', password: 'password1', role: 'user' },
  { username: 'admin', password: 'adminpassword', role: 'admin' },
  { username: 'user2', password: 'userpassword2', role: 'user' },
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ role: user.role });
  } else {
    res.sendStatus(401);
  }
});

// Sample route to get the existing logs 
app.get('/logs', (req, res) => {
  const logs = [
    { actionType: 'login', timestamp: new Date().toISOString(), userId: 'user1' },
    { actionType: 'update', timestamp: new Date().toISOString(), userId: 'user2' },
    { actionType: 'delete', timestamp: new Date().toISOString(), userId: 'user3' },
  ];
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/logs`);
});


