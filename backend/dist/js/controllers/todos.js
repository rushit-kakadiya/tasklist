"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todos, user_id = req.token._id;
        if (['true', 'false'].includes(req.params.status)) {
            let status = req.params.status === 'true' || false;
            todos = yield todo_1.default.find({ user_id, status });
        }
        else {
            todos = yield todo_1.default.find({ user_id });
        }
        res.status(200).json({ todos });
    }
    catch (err) {
        let error = err;
        res.status(400).json({ message: error.message });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new todo_1.default({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            user_id: req.token._id,
        });
        const newTodo = yield todo.save();
        res.status(201).json({ message: 'Todo added', todo: newTodo });
    }
    catch (error) {
        const err = error;
        res.status(401).json({ message: err.message });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ message: 'Todo updated', todo: updateTodo });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Todo deleted', todo: deletedTodo });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
exports.deleteTodo = deleteTodo;
