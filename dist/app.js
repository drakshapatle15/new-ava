"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use("/users", user_route_1.default);
app.use("/chat", chat_route_1.default);
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect("mongodb://localhost:27017/node-ts-mongodb", mongoOptions)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error(error));
