"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmorOrderMutationFields = exports.AmorOrderQueryFields = exports.AmorOrderMutation = exports.AmorOrderQuery = exports.AmorOrderType = exports.AmorOrderModel = void 0;
var graphql_1 = require("graphql");
var mongoose_1 = __importStar(require("mongoose"));
var amor_customers_1 = require("./amor_customers");
var amor_order_details_1 = require("./amor_order_details");
var schema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    customer_id: String,
    date: String,
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AmorCustomer",
    },
    details: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "AmorOrderDetail",
        },
    ],
});
var model = mongoose_1.default.model("AmorOrders", schema);
exports.AmorOrderModel = model;
var typeDef = new graphql_1.GraphQLObjectType({
    name: "AmorOrderType",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        customer_id: { type: graphql_1.GraphQLString },
        customer: {
            type: amor_customers_1.AmorCustomerType,
            resolve: function (parent) {
                return amor_customers_1.AmorCustomerModel.findById(parent.customer_id);
            },
        },
        details: {
            type: graphql_1.GraphQLList(amor_order_details_1.AmorOrderDetailType),
            resolve: function (parent) {
                return amor_order_details_1.AmorOrderDetailModel.find({ order_id: parent._id });
            },
        },
    },
});
exports.AmorOrderType = typeDef;
var queryFields = {};
exports.AmorOrderQueryFields = queryFields;
var mutationFields = {};
exports.AmorOrderMutationFields = mutationFields;
queryFields.getAllOrders = {
    type: graphql_1.GraphQLList(typeDef),
    resolve: function () {
        return model.find();
    },
};
queryFields.getOrderByID = {
    type: typeDef,
    args: {
        id: { type: graphql_1.GraphQLString },
    },
    resolve: function (_, args) { return model.findById(args.id); },
};
queryFields.getOrdersByCustomerID = {
    type: graphql_1.GraphQLList(typeDef),
    args: {
        cid: { type: graphql_1.GraphQLString },
    },
    resolve: function (_, args) {
        return model.find({ customer_id: args.cid });
    },
};
mutationFields.createOrder = {
    type: typeDef,
    description: "Create a new order. Customer's ID or phone number is required. If both of them are provided, customer's ID will be used.",
    args: {
        date: { type: graphql_1.GraphQLString },
        customer_id: { type: graphql_1.GraphQLString },
        customer_phone_number: { type: graphql_1.GraphQLString },
        details: {
            type: graphql_1.GraphQLList(amor_order_details_1.AmorOrderDetailInputType),
        },
    },
    resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
        var customer_id, findCustomers, session, newOrderID, details, newOrder, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customer_id = "";
                    if (!("customer_phone_number" in args)) return [3 /*break*/, 2];
                    return [4 /*yield*/, amor_customers_1.AmorCustomerModel.find({
                            phone_number: args.customer_phone_numberr,
                        }).then(function (result) {
                            console.log("result from find", result);
                        })];
                case 1:
                    findCustomers = _a.sent();
                    console.log(findCustomers);
                    throw new Error("Test");
                case 2:
                    session = mongoose_1.default.startSession();
                    newOrderID = mongoose_1.default.Types.ObjectId();
                    details = Array();
                    args.details.forEach(function (detail) {
                        var newDetail = new amor_order_details_1.AmorOrderDetailModel({
                            _id: mongoose_1.default.Types.ObjectId(),
                            order_id: newOrderID,
                            product_id: detail.product_id,
                            product_price: detail.product_price,
                            quantity: detail.quantity,
                        });
                        details.push(newDetail);
                    });
                    newOrder = new model({
                        _id: newOrderID,
                        date: args.date,
                        customer_id: args.customer_id,
                        details: details,
                    });
                    details.forEach(function (detail) {
                        detail.save();
                    });
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 4, 5, 7]);
                    result = newOrder.save();
                    return [2 /*return*/, result];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            status: "error",
                            message: error_1,
                        }];
                case 5: return [4 /*yield*/, session];
                case 6:
                    (_a.sent()).endSession;
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); },
};
var query = new graphql_1.GraphQLObjectType({
    name: "AmorOrderQuery",
    fields: __assign({}, queryFields),
});
exports.AmorOrderQuery = query;
var mutation = new graphql_1.GraphQLObjectType({
    name: "AmorOrderMutation",
    fields: __assign({}, mutationFields),
});
exports.AmorOrderMutation = mutation;
