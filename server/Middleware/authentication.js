const jwt = require("jsonwebtoken");
const keysecret = "jkiuhgytrfdcsdxfghbklmoiuhgbawqzsdf";
const userdb = require("../Model/userSchema");

const authenticaton = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    } else {
      const verifyToken = await jwt.verify(token, keysecret);
      if (!verifyToken) {
        return res.status(403).json({ message: "Invalid Token" });
      } else {
        // console.log(verifyToken);
        const getData = await userdb.findOne({ _id: verifyToken._id });

        if (!getData) {
          res.status(400).json({
            msg: "Not found user"
          });
        } else {
          // console.log(getData);

          req.getData = getData;

          next();
        }
      }
    }
  } catch (error) {
    res.status(400).json(`${error} not authenticate`);
  }
};

module.exports = authenticaton;
