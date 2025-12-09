var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");
const schemaUser = require("../schemas/validateUser");
const message = require("../lib/messages");
const errors = require("../lib/errors");

router.get("/", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    const { users, totalUsers } = await controller.getAllUsers(pageSize, page);

    return res.json({ users, totalUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = schemaUser.validateUser(req.body);
    const result = await controller.addUser(newUser);
    if (result.acknowledged) {
      res.send(
        message.SUCCESSFULL_USER_CREATED + " con id: " + result.insertedId
      );
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// POST login user
router.post("/login", async (req, res) => {
  try {
    const user = await controller.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await controller.generateAuthToken(user);
    res.send({ token });
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error);
  }
});

module.exports = router;
