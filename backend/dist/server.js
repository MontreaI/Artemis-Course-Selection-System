"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const apiController = __importStar(require("./controller/api"));
const port = process.env.port || 3376;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
cors_1.default({ origin: true });
app.set('port', port);
app.get('/courses', apiController.getApi);
app.get('/', function (req, res, next) {
    global.console.log('got root request');
});
http_1.default.createServer(app).listen(port);
console.log('running on port', port);
//# sourceMappingURL=server.js.map