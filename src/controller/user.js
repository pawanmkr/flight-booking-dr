import { user } from "../models/user.js";
import bcrypt from 'bcrypt';

export async function addUser(req, res, next) {
  const { full_name, email, password } = req.body;
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(password, 10);
  const usr = await user.createUser(full_name, email, hashedPassword);
  res.send({
    message: "user added successfully",
    usr: {
      full_name: usr.full_name,
      email: usr.email,

    }
  });
}

