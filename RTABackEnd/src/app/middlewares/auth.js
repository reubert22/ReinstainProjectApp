const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

/**
 * Middlware create to intercept and check if
 * the user can proceed or not, based on token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // If there's no token provided, then we return an 401 error
  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  // So if there's some authHeader, we can expect that
  // the token is inside and formatted like: Bearer <hash>

  // Here we split the token in two parts
  // separator: " " (space)
  // expecting:
  // first one: Bearer
  // second: <hash>
  const parts = authHeader.split(" ");

  // In case of the parts don't reach 2 of length
  // our token has some error, then we return
  // error message.
  if (!parts.length === 2)
    return res.status(401).send({ error: "Token error" });

  // Setting Bearer string part of scheme const
  // and the token (hash) part of token const
  const [scheme, token] = parts;

  // Here we don't have any precision of what's inside parts
  // so we make sure of compare if the scheme has Bearer string
  // and if it hasn't, then we return the error message
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Tolken malformatted" });

  // Verifying if the received token match with the secret created
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;

    // If all of that validations is okay,
    // then we can go forward.
    return next();
  });
};
