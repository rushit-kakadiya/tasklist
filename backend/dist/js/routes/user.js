"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.auth, users_1.getUsers);
router.post('/add', users_1.addUser);
router.post('/login', users_1.loginUser);
router.put('/edit/:id', auth_1.auth, users_1.updateUser);
router.delete('/delete/:id', auth_1.auth, users_1.deleteUser);
router.get('/:id', auth_1.auth, users_1.getUserById);
exports.default = router;
