"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./router/userRouter");
const postRouter_1 = require("./router/postRouter");
const LikeDislikeRouter_1 = require("./router/LikeDislikeRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
app.use("/users", userRouter_1.userRouter);
app.use("/posts", postRouter_1.postRouter);
app.use("/posts", LikeDislikeRouter_1.likeDislikeRouter);
//# sourceMappingURL=index.js.map