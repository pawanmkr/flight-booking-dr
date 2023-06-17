import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user } from '../models/user.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findUserByEmail(email);
    if (!existingUser) {
      return res.sendStatus(401);
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.sendStatus(401);
    }

    const { id, admin: userAdmin } = existingUser;
    const token = jwt.sign({ userId: id, email, admin: userAdmin }, 'ljkapodfiuaoewrjaksdfnalsjdf98qoiweur9qweoufja', { expiresIn: '1h' });

    res.send({
      message: "logged in",
      user: existingUser,
      token: token
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.sendStatus(500);
  }
};
