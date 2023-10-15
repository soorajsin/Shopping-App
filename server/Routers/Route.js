const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authentication = require("../Middleware/Authentication");



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



router.get("/validUser", authentication, async (req, res) => {
          // console.log("done");

          // console.log(req.getData);

          if (req.getData) {
                    res.status(201).json({
                              status: 210,
                              message: "user authenticate done",
                              getData: req.getData
                    })
          }
})


router.post("/addProduct", authentication, async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              data
                    } = req.body;
                    // console.log(data);

                    if (!data) {
                              res.status(201).json({
                                        error: "data not found of product"
                              })
                    } else {
                              const user = req.getData;

                              if (!user) {
                                        res.status(201).json({
                                                  error: "User not found"
                                        })
                              } else {
                                        // console.log(user);

                                        user.Productdata.push(...data);

                                        const saveData = await user.save();
                                        // console.log(saveData);

                                        res.status(201).json({
                                                  status: 210,
                                                  message: "Product Data added successfully done",
                                                  saveData
                                        })
                              }
                    }
          } catch (error) {
                    res.status(501).json({
                              error: "Internal Server Error"
                    })
          }
});


router.delete("/deleteProduct", authentication, async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              productdata
                    } = req.body;

                    if (!productdata) {
                              res.status(201).json({
                                        error: "Not found product id"
                              })
                    } else {
                              const user = req.getData;

                              if (!user) {
                                        res.status(201).json({
                                                  error: "user not found"
                                        })
                              } else {
                                        // console.log(user);

                                        const entryField = user.Productdata.find((Productdata) => Productdata._id.toString() === productdata);

                                        if (!entryField) {
                                                  res.status(201).json({
                                                            error: "entry field not found"
                                                  })
                                        } else {
                                                  // console.log(entryField);

                                                  user.Productdata = user.Productdata.filter((Productdata) => Productdata._id.toString() !== productdata);

                                                  const updatedUser = await user.save();

                                                  res.status(201).json({
                                                            message: "Updated user successfully done",
                                                            status: 210,
                                                            updatedUser
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


router.post("/goProduct", authentication, async (req, res) => {
          try {
                    // console.log(req.body);

                    const {
                              productdata
                    } = req.body;

                    if (!productdata) {
                              res.status(201).json({
                                        error: "Product id not found"
                              })
                    } else {
                              const user = req.getData;

                              if (!user) {
                                        res.status(201).json({
                                                  error: "user not found"
                                        })
                              } else {
                                        const entryField = user.Productdata.find((Productdata) => Productdata._id.toString() === productdata);

                                        if (!entryField) {
                                                  res.status(201).json({
                                                            error: "entry field not found"
                                                  })
                                        } else {
                                                  // console.log(entryField);

                                                  user.ProductShow.push(entryField);

                                                  const updatedUser = await user.save();

                                                  // console.log(updatedUser);

                                                  res.status(201).json({
                                                            message: "Product add successfully done",
                                                            status: 210,
                                                            updatedUser
                                                  })
                                        }
                              }
                    }
          } catch (error) {
                    res.status(501).json({
                              error: "Internal Server Error"
                    })
          }
});


router.delete("/deleteProductShow", authentication, async (req, res) => {
          try {
                    // console.log(req.body);

                    const {
                              productShow
                    } = req.body;

                    if (!productShow) {
                              res.status(201).json({
                                        error: "productShow not found"
                              })
                    } else {
                              const user = req.getData;

                              if (!user) {
                                        res.status(201).json({
                                                  error: "user not found"
                                        })
                              } else {
                                        const entryField = user.ProductShow.find((ProductShow) => ProductShow._id.toString() === productShow);

                                        if (!entryField) {
                                                  res.status(201).json({
                                                            error: "entryField not found"
                                                  })
                                        } else {
                                                  // console.log(entryField);

                                                  user.ProductShow = user.ProductShow.filter((ProductShow) => ProductShow._id.toString() !== productShow);

                                                  const updatedUser = await user.save();

                                                  res.status(201).json({
                                                            message: "data deleted",
                                                            status: 210,
                                                            updatedUser
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