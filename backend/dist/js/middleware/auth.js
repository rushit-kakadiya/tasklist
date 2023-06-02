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
exports.auth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'jkasdhidyq9ehiug87asgd812yebHGJDGSqw89egs';
const generateToken = (params = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign(params, SECRET_KEY, { expiresIn: '1d' });
    return token;
});
exports.generateToken = generateToken;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token)
            throw new Error();
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Please authenticate' });
    }
});
exports.auth = auth;
