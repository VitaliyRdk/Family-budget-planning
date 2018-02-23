const express = require("express");
const router = express.Router();

const users = require("./../services/users");

router.get("/", users.getAll);
router.get("/:id", users.getById);
router.post("/login", users.authorize);
router.post("/registration", users.registration);
module.exports = router;
