const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors"); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { GetUserByUsername, CreateUser ,GetUsers} = require('./model');
app.use(cors());
app.use(express.json());

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
const generateToken = (user) => {
  console.log("JWT_SECRET is:", process.env.JWT_SECRET);
  return jwt.sign({ id: user.id , username: user.username, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

app.get('/user/health', (req, res) => {
  res.json({ message: 'User Service is alive!' });
});

app.post('/user/login', async (req, res) => {
    try {
    const { username, password } = req.body;
    const user = await GetUserByUsername(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'+ error});
  }
});
app.post('/user/signup', async (req, res) => {
  try {
    const { username, password , role} = req.body;
    const existingUser = await GetUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const user = await CreateUser( username, hashedPassword, role );
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await GetUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' + error});
  }
});

app.listen(port, () => console.log(`User Service running on port ${port}`));
