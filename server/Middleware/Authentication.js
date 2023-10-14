const jwt = require("jsonwebtoken");
const keysecret = "jhgtfrdtvbghlksytghvcdfklofbmzxs";
const userdb = require("../Model/userSchema");


const authentication = async (req, res, next) => {
          // console.log("auth");
          try {
                    const token = await req.headers.authorization;
                    // console.log(token);

                    if (!token) {
                              res.status(201).json({
                                        error: "Token not found"
                              })
                    } else {
                              const verifyToken = await jwt.verify(token, keysecret);
                              // console.log(verifyToken);

                              if (!verifyToken) {
                                        res.status(201).json({
                                                  error: "user id not found"
                                        })
                              } else {

                                        const getData = await userdb.findOne({
                                                  _id: verifyToken._id
                                        });
                                        // console.log(getData);

                                        if (!getData) {
                                                  res.status(201).json({
                                                            error: "user not found"
                                                  })
                                        } else {
                                                  req.getData = getData;

                                                  next();
                                        }
                              }
                    }
          } catch (error) {
                    res.status(501).json({
                              error: "Internal Server Error"
                    })
          }
}


module.exports = authentication;