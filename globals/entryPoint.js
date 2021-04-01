"use strict";
// Created By Fahad Ansari
// Dated : 3/31/2021
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food_Pawri_Core = void 0;
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var Routes = __importStar(require("./config/routes"));
var Constants = __importStar(require("./config/constants"));
var roleModel_1 = require("../models/roleModel");
var cors = require('cors');
var compression = require('compression');
var FoodPawriEntryPoint = /** @class */ (function () {
    function FoodPawriEntryPoint() {
        this.ConcurrentChatLimit = 20;
        this.application = express_1.default();
        //Set Port
        this.application.set('port', Constants.port);
    }
    FoodPawriEntryPoint.GetInstance = function () {
        if (!FoodPawriEntryPoint.Instance) {
            FoodPawriEntryPoint.Instance = new FoodPawriEntryPoint();
            return FoodPawriEntryPoint.Instance;
        }
        else {
            return FoodPawriEntryPoint.Instance;
        }
    };
    FoodPawriEntryPoint.prototype.InitApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            var databaseToConnect, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log('Environment: ' + process);
                        console.log('DB Address: ' + process.env.DB_ADDRESS);
                        databaseToConnect = undefined;
                        // await ArchivingDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb://reportdb.beelinks.solutions:27017/' : undefined);
                        //Creating Single Database Connection And Pooling Connection to Rest of The Application;
                        // let archiveDbase: Db = await ArchivingDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb://reportdb.beelinks.solutions:27017/' : undefined);
                        // // let agentsDB: Db = await AgentsDB.connect('mongodb://agentsdb.beelinks.solutions:27017/');
                        // let ticketsDB: Db = await TicketsDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb://ticketsdb.beelinks.solutions:27017/' : undefined);
                        // let chatsDB: Db = await ChatsDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
                        // let dbase: Db = await DataBaseConfig.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
                        // let agentsDB: Db = await AgentsDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
                        // let marketingDB: Db = await MarketingDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
                        // let companiesDB: Db = await CompaniesDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined)
                        console.log('Request Handler Connecting Database First Instance');
                        if (!databaseToConnect) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.InitCollections()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error('Error connecting database');
                    case 3:
                        this.RegisterMiddleWare();
                        return [2 /*return*/, this.application];
                    case 4:
                        error_1 = _a.sent();
                        //console.log(error);
                        console.log('Error in Initializing Application');
                        //server.close();
                        throw new Error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FoodPawriEntryPoint.prototype.RegisterMiddleWare = function () {
        this.application.use(function (req, res, next) {
            if (req.get('x-amz-sns-message-type')) {
                req.headers['content-type'] = 'application/json';
            }
            next();
        });
        // Parse url query string as json
        this.application.use(bodyParser.json());
        //application.use(cors());
        // Extended property allows to have embedded object in query string URI.
        // See Following Reference
        //https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
        this.application.use(bodyParser.urlencoded({
            extended: true
        }));
        // Middle Ware Handler To hand Cross Origin Angular Requests;
        //In Both The Cases They Request Files but they Don't need To Generate Session On Fetch
        this.application.use(function (req, res, next) {
            if (req.method === 'OPTIONS') {
                if (req.headers.origin) {
                    res.header("Access-Control-Allow-Origin", req.headers.origin);
                    res.header("Access-Control-Allow-Headers", "content-type,Authorization");
                    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                    res.header('Access-Control-Allow-Credentials', 'true');
                    res.header('Connection', 'keep-alive');
                    res.header('Content-Length', '0');
                    res.header('Date', new Date().toISOString());
                    res.header('Vary', 'Origin, Access-Control-Request-Headers');
                }
                res.status(204);
                res.end();
            }
            else {
                //       console.log('Called Server');
                next();
            }
        });
        this.application.use(compression());
        this.application.use(cors({ credentials: true, origin: "*" }));
        this.application.use('/api/roles', Routes.RolesRoutes);
        this.application.get('*', function (req, res) {
            res.status(401).send('no routes matches');
        });
    };
    FoodPawriEntryPoint.prototype.InitCollections = function (reconnect) {
        if (reconnect === void 0) { reconnect = false; }
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, roleModel_1.Roles.Initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Error in InitCollections');
                        throw new Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(FoodPawriEntryPoint.prototype, "Application", {
        get: function () {
            return this.application;
        },
        enumerable: false,
        configurable: true
    });
    FoodPawriEntryPoint.prototype.destroyCollections = function () {
        try {
            roleModel_1.Roles.Destroy();
        }
        catch (err) {
            console.log(err);
            console.log('Error in destroying collections');
        }
    };
    return FoodPawriEntryPoint;
}());
exports.Food_Pawri_Core = FoodPawriEntryPoint.GetInstance();
Object.seal(FoodPawriEntryPoint);
