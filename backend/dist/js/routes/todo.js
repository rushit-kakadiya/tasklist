"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/add', auth_1.auth, todos_1.addTodo);
router.put('/edit/:id', auth_1.auth, todos_1.updateTodo);
router.delete('/delete/:id', auth_1.auth, todos_1.deleteTodo);
router.get('/:status', auth_1.auth, todos_1.getTodos);
exports.default = router;
