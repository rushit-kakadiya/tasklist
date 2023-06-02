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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.getUserById = exports.addUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("./../middleware/auth");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({ role: 'user' });
        res.status(200).json({ users });
    }
    catch (err) {
        let error = err;
        res.status(400).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = new user_1.default({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.role) !== null && _b !== void 0 ? _b : 'user',
        });
        const newUser = yield user.save();
        res.status(201).json({ message: 'User added', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Error to create user!' });
    }
});
exports.addUser = addUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ _id: req.params.id });
        if (!user)
            throw new Error('No user found');
        res.status(200).json({ user });
    }
    catch (err) {
        let error = err;
        res.status(400).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user)
            throw new Error('No user found');
        const isMatch = bcrypt_1.default.compareSync(req.body.password, user.password);
        if (!isMatch)
            throw new Error('Password is not correct');
        const token = yield (0, auth_1.generateToken)({ _id: (_c = user._id) === null || _c === void 0 ? void 0 : _c.toString(), name: user.name });
        res.status(200).json({ user, token });
    }
    catch (err) {
        let error = err;
        res.status(400).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateUser = yield user_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ message: 'User updated', user: updateUser });
    }
    catch (error) {
        res.status(400).json({ message: 'Error to update user!' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'User deleted', user: deletedUser });
    }
    catch (error) {
        res.status(400).json({ message: 'Error to delete user!' });
    }
});
exports.deleteUser = deleteUser;
