import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user } from '../models/user.js';

export async function signup(req, res, next) {
  try {

    const { full_name, email, password } = req.body;
    const admin = req.body.admin || false;
    if (!full_name || !email || !password) {
      res.sendStatus(500);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await user.createUser(full_name, email, hashedPassword, admin);

    const { id, admin: userAdmin } = savedUser;
    const token = jwt.sign({ userId: id, email, admin: userAdmin }, 'ljkapodfiuaoewrjaksdfnalsjdf98qoiweur9qweoufja', { expiresIn: '1h' });

    res.send({
      message: "user registered",
      user: savedUser,
      token: token
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.sendStatus(500);
  }
};