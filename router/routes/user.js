const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../modal/token");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
// Load input validation
const crypto = require("crypto");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../modal/userschema");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  //Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
      });

      // Hash password before storing in database
      const rounds = 10;
      bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()

            .catch((err) => console.log(err));
        });
      });

      newUser.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        var tokens = new Token({
          _userId: newUser._id,
          token: crypto.randomBytes(16).toString("hex"),
        });

        tokens.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }

          // Send email (use verified sender's email address & generated API_KEY on SendGrid)
          const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "rohanbindal1149@gmail.com",
              pass: "9876904594",
            },
          });
          var mailOptions = {
            from: "rohanbindal1149@gmail.com",
            to: newUser.email,
            subject: "Account Verification Link",
            text:
              "Hello " +
              req.body.firstName +
              ",\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              "localhost:5000" +
              "/api" +
              "/confirmation/" +
              newUser.email +
              "/" +
              tokens.token +
              "\n\nThank You!\n",
          };
          transport.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).send({
                msg:
                  "Technical Issue!, Please click on resend for verify your Email." +
                  err,
              });
            }
            return res
              .status(200)
              .send(
                "A verification email has been sent to " +
                  newUser.email +
                  ". It will be expire after one day. If you not get verification Email click on resend token."
              );
          });
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  //Form Valdiation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by Email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          "secrets",
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              user: user._id,
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else if (!user.isVerified) {
        return res.status(401).send({
          msg: "Your Email has not been verified. Please click on resend",
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect", is: password });
      }
    });
  });
});

router.get("/confirmation/:email/:token", (req, res) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired
    if (!token) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    }
    // if token is found then check valid user
    else {
      User.findOne(
        { _id: token._userId, email: req.params.email },
        function (err, user) {
          // not valid user
          if (!user) {
            return res.status(401).send({
              msg: "We were unable to find a user for this verification. Please SignUp!",
            });
          }
          // user is already verified
          else if (user.isVerified) {
            return res
              .status(200)
              .send("User has been already verified. Please Login");
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // account successfully verified
              else {
                return res
                  .status(200)
                  .send("Your account has been successfully verified");
              }
            });
          }
        }
      );
    }
  });
});

module.exports = router;
