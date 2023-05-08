
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const expiration = "2h";

module.exports = {
  // {token, user info}
  authMiddleware: function ({ request: req, contextValue }) {
    const header =
      req.http.headers.get("authorization") ||
      req.http.headers.get("Authorization");
    let token = req.http.body.token || header;

    if (header) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return false;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      if (data) {
        contextValue.user = data;
        contextValue.headers = req.http.headers;
      }

      return data;
      console.log("REQUSER>>>", req.user);

    } catch (err) {
      console.log(err);
      console.log("Invalid token");
    }

    return false;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};