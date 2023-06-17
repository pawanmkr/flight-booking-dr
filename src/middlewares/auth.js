import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'ljkapodfiuaoewrjaksdfnalsjdf98qoiweur9qweoufja');

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.sendStatus(401);
  }
}
