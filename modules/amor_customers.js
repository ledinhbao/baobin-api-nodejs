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
exports.AmorCustomerMutationFields = exports.AmorCustomerMutation = exports.AmorCustomerQueryFields = exports.AmorCustomerQuery = exports.AmorCustomerType = exports.AmorCustomerModel = void 0;
var graphql_1 = require("graphql");
var mongoose_1 = __importDefault(require("mongoose"));
var phoneUniqueValidator = function (v) {
    return mongoose_1.default.models.AmorCustomers.findOne({
        phone_number: v,
    }).then(function (res) {
        if (res) {
            return false;
        }
    });
};
// TODO Add validator, check if phone number is in a correct format.
var schema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    fullname: String,
    address: String,
    phone_number: {
        type: String,
        index: true,
        unique: true,
        required: [true, "Phone number is required"],
        validate: {
            validator: phoneUniqueValidator,
            message: "Phone number already exist",
        },
    },
});
var model = mongoose_1.default.model("AmorCustomers", schema);
exports.AmorCustomerModel = model;
var typeDef = new graphql_1.GraphQLObjectType({
    name: "AmorCustomerType",
    description: "Amor Customer type",
    fields: {
        _id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        fullname: { type: graphql_1.GraphQLString },
        phone_number: { type: graphql_1.GraphQLString },
        address: { type: graphql_1.GraphQLString },
    },
});
exports.AmorCustomerType = typeDef;
var queryFields = {};
exports.AmorCustomerQueryFields = queryFields;
var mutationFields = {};
exports.AmorCustomerMutationFields = mutationFields;
queryFields.getAllCustomers = {
    type: graphql_1.GraphQLList(typeDef),
    resolve: function () {
        return model.find();
    },
};
queryFields.getCustomerByID = {
    type: typeDef,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve: function (_, args) { return model.findById(args.id); },
};
queryFields.customerByPhoneNumber = {
    type: typeDef,
    args: {
        phone_number: { type: graphql_1.GraphQLString },
    },
    resolve: function (_, args) {
        return model.findOne({ phone_number: args.phone_number });
    },
};
mutationFields.createCustomer = {
    type: typeDef,
    args: {
        fullname: { type: graphql_1.GraphQLString },
        phone_number: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        address: { type: graphql_1.GraphQLString },
    },
    resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, model
                    .findOne({
                    phone_number: args.phone_number,
                })
                    .then(function (result) {
                    // Check duplicate customer with phone number
                    if (result) {
                        throw new Error("Customer with this phone number is already exists.");
                    }
                    var newCustomer = new model({
                        _id: mongoose_1.default.Types.ObjectId(),
                        fullname: args.fullname,
                        phone_number: args.phone_number,
                        address: args.address,
                    });
                    var saveResult = newCustomer.save();
                    return saveResult;
                })
                    .catch(function (err) {
                    throw err;
                })];
        });
    }); },
};
var query = new graphql_1.GraphQLObjectType({
    name: "AmorCustomerQuery",
    description: "Queries for Amor Customer objects",
    fields: __assign({}, queryFields),
});
exports.AmorCustomerQuery = query;
var mutation = new graphql_1.GraphQLObjectType({
    name: "AmorCustomerMutation",
    fields: __assign({}, mutationFields),
});
exports.AmorCustomerMutation = mutation;
