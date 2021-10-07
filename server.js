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
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var products_1 = require("./products");
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var graphql_1 = require("graphql");
var express_graphql_1 = require("express-graphql");
var product_1 = require("./models/product");
var amor_products_1 = require("./modules/amor-products");
var amor_customers_1 = require("./modules/amor_customers");
var amor_orders_1 = require("./modules/amor_orders");
var amor_combo_1 = require("./modules/amor_combo");
var types_1 = require("./modules/forex/types");
var tprs_challenge_1 = require("./modules/tprs-challenge");
var app = express_1.default();
exports.app = app;
var jsonParser = body_parser_1.default.json();
var urlParser = body_parser_1.default.urlencoded();
// app.use(bodyParser);
var cors = require("cors");
app.use(cors());
// mongoose.connect(
// 	"mongodb+srv://ledinhbao:" +
// 		process.env.MONGO_ATLAS_PW +
// 		process.env.MONGO_ATLAS_STRING,
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	}
// );
var mongoConnectionURI = "mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME + ":" + process.env.MONGO_ATLAS_PASSWORD + "@baobin-core-clutter.zjpys.mongodb.net/" + process.env.MONGO_ATLAS_DATABASE + "?retryWrites=true&w=majority";
mongoose_1.default.connect(mongoConnectionURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
var demoCartList = [
    {
        id: 1,
        qty: 10,
        productId: "6102406a7459834f345b6784",
    },
];
var ProductType = new graphql_1.GraphQLObjectType({
    name: "ProductType",
    fields: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: graphql_1.GraphQLString },
        unit: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
    },
});
var CartType = new graphql_1.GraphQLObjectType({
    name: "CartType",
    fields: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        qty: { type: graphql_1.GraphQLInt },
        productId: { type: graphql_1.GraphQLString },
        product: {
            type: ProductType,
            resolve: function (parent) { return product_1.ProductModel.findById(parent.productId); },
        },
    },
});
var ProductQuery = new graphql_1.GraphQLObjectType({
    name: "AmorProductQuery",
    description: "All query about product",
    fields: {
        products: {
            type: graphql_1.GraphQLList(ProductType),
            resolve: function () {
                return product_1.ProductModel.find();
            },
        },
        product: {
            type: ProductType,
            args: {
                id: { type: graphql_1.GraphQLString },
            },
            resolve: function (_, args) { return product_1.ProductModel.findById(args.id); },
        },
    },
});
var addProductMutation = {
    type: ProductType,
    description: "Add new product to database",
    args: {
        name: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        price: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        unit: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
        var newProduct, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newProduct = new product_1.ProductModel({
                        _id: mongoose_1.default.Types.ObjectId(),
                        name: args.name,
                        price: args.price,
                        unit: args.unit,
                    });
                    return [4 /*yield*/, newProduct.save()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            error: {
                                message: error_1,
                            },
                        }];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
var ProductMutation = new graphql_1.GraphQLObjectType({
    name: "AmorProductMutations",
    description: "All mutations of products",
    fields: {
        addProduct: addProductMutation,
        editProduct: {
            type: ProductType,
            description: "Edit a product, must provides an id",
            args: {
                id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                name: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
                unit: { type: graphql_1.GraphQLString },
            },
            resolve: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
                var updateFields, product;
                return __generator(this, function (_a) {
                    try {
                        updateFields = {
                            name: args.name,
                            price: args.price,
                            unit: args.unit,
                        };
                        product = product_1.ProductModel.findByIdAndUpdate(args.id, updateFields, {
                            new: true,
                            useFindAndModify: false,
                        });
                    }
                    catch (err) {
                        return [2 /*return*/, {
                                error: {
                                    message: err,
                                },
                            }];
                    }
                    return [2 /*return*/];
                });
            }); },
        },
    },
});
var CartQuery = new graphql_1.GraphQLObjectType({
    name: "CartQuery",
    fields: {
        list: {
            type: graphql_1.GraphQLList(CartType),
            resolve: function () { return demoCartList; },
        },
    },
});
var cartSchema = new graphql_1.GraphQLSchema({
    // query: ProductQuery,
    query: CartQuery,
});
// Change to /product to use this for specific endpoints
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: cartSchema,
    graphiql: true,
}));
var productSchema = new graphql_1.GraphQLSchema({
    query: ProductQuery,
    mutation: ProductMutation,
});
var amorProductSchema = new graphql_1.GraphQLSchema({
    query: amor_products_1.AmorProductQuery,
    mutation: ProductMutation,
});
app.use("/gql/amor/product", express_graphql_1.graphqlHTTP({ schema: amorProductSchema, graphiql: true }));
var amorCustomerSchema = new graphql_1.GraphQLSchema({
    query: amor_customers_1.AmorCustomerQuery,
    mutation: amor_customers_1.AmorCustomerMutation,
});
app.use("/gql/amor/customers", express_graphql_1.graphqlHTTP({ schema: amorCustomerSchema, graphiql: true }));
var amorOrderSchema = new graphql_1.GraphQLSchema({
    query: amor_orders_1.AmorOrderQuery,
    mutation: amor_orders_1.AmorOrderMutation,
});
app.use("/gql/amor/orders", express_graphql_1.graphqlHTTP({ schema: amorOrderSchema, graphiql: true }));
var amorRootQuery = new graphql_1.GraphQLObjectType({
    name: "AmorRootQuery",
    description: "All queries for Amor Bread",
    fields: __assign(__assign(__assign(__assign({}, amor_products_1.AmorProductQueryFields), amor_orders_1.AmorOrderQueryFields), amor_customers_1.AmorCustomerQueryFields), amor_combo_1.AmorComboQueryFields),
});
var amorRootMutattion = new graphql_1.GraphQLObjectType({
    name: "AmorRootMutation",
    description: "All mutations for Amor Bread",
    fields: __assign(__assign(__assign(__assign({}, amor_products_1.AmorProductMutationFields), amor_orders_1.AmorOrderMutationFields), amor_customers_1.AmorCustomerMutationFields), amor_combo_1.AmorComboMutationFields),
});
var amorRootSchema = new graphql_1.GraphQLSchema({
    query: amorRootQuery,
    mutation: amorRootMutattion,
    description: "Root schema for Amor Bread API",
});
app.use("/gql/amor", express_graphql_1.graphqlHTTP({ schema: amorRootSchema, graphiql: true }));
app.use("/ledinhbao/forex", express_graphql_1.graphqlHTTP({
    schema: types_1.ForexSchema,
    rootValue: types_1.ForexResolvers,
    graphiql: true,
}));
app.use("/tprs/challenge", express_graphql_1.graphqlHTTP({
    schema: tprs_challenge_1.TPRsSchema,
    // rootValue: TPRsResolvers,
    graphiql: true,
}));
app.get("/", function (req, res) {
    res.send("BaoBin API SERVER.\nVersion 1.3.1");
});
app.get("/product", products_1.productListHandler);
app.get("/product/:pid", products_1.productFindHandler);
app.patch("/product/:pid", jsonParser, products_1.productUpdateHander);
app.post("/product/new", jsonParser, products_1.productCreateHandler);
app.delete("/product/:pid", products_1.productDeleteHander);
var port = 3000;
app.listen(port, function () {
    console.log("Express Server is running at port " + port);
});
