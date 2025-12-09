const users = require("../data/users");

async function getAllUsers(pageSize, page) {
	return users.getAllUsers(pageSize, page);
}

async function addUser(user) {
  return users.addUser(user);
}


async function findByCredentials(email, password) {
  return users.findByCredentials(email, password);
}

async function generateAuthToken(user) {
  return users.generateAuthToken(user);
}


module.exports = { addUser, findByCredentials, generateAuthToken, getAllUsers };
