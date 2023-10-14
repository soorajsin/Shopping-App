const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");



router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              res.status(201).json({
                                        error: "Register details not found"
                              })
                    } else {
                              const checkUser = await userdb.findOne({
                                        email
                              });

                              if (checkUser) {
                                        res.status(201).json({
                                                  status: 202,
                                                  message: "Email already exist"
                                        })
                              } else {
                                        // console.log("yes");

                                        const newForm = new userdb({
                                                  name,
                                                  email,
                                                  password,
                                                  cpassword
                                        });

                                        const saveData = await newForm.save();

                                        // console.log(saveData + "done");

                                        res.status(201).json({
                                                  status: 210,
                                                  message: "register successfully done...",
                                                  saveData
                                        });
                              }
                    }

          } catch (error) {
                    res.status(422).json({
                              error: "Internal Server Error"
                    })
          }
});



router.post("/login", async (req, res) => {
          // console.log(req.body);

          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              res.status(201).json({
                                        error: "Login Detail not found"
                              })
                    } else {
                              // console.log("done");

                              const checkUser = await userdb.findOne({
                                        email
                              });

                              if (!checkUser) {
                                        res.status(201).json({
                                                  status: 202,
                                                  message: "User not found"
                                        })
                              } else {
                                        // console.log("find");

                                        const passwordMatch = await bcrypt.compare(password, checkUser.password);

                                        if (!passwordMatch) {
                                                  res.status(201).json({
                                                            status: 203,
                                                            message: "Password not matched"
                                                  })
                                        } else {
                                                  // console.log(passwordMatch);

                                                  //generate token
                                                  const token = await checkUser.generateAuthToken();
                                                  // console.log(token);

                                                  //generate cookie
                                                  res.cookie("auth_token", token, {
                                                            httpOnly: true, // Ensures the cookie is only accessible on the server
                                                            secure: true, // Ensures the cookie is only sent over HTTPS (in a production environment)
                                                            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds (adjust as needed)
                                                  });

                                                  const result = {
                                                            checkUser,
                                                            token
                                                  };


                                                  res.status(201).json({
                                                            message: "Login Successfully done",
                                                            status: 210,
                                                            result
                                                  })
                                        }
                              }
                    }
          } catch (error) {
                    res.status(501).json({
                              error: "Internal Server Error"
                    })
          }
})

module.exports = router;