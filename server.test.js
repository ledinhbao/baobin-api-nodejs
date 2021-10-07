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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var should = require("chai").should();
var expect = require("chai").expect;
var assert = require("chai").assert;
var mongoose = require("mongoose");
var amor_products_1 = require("./modules/amor-products/");
var supertest_1 = __importDefault(require("supertest"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var chai_1 = __importDefault(require("chai"));
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
chai_1.default.use(chai_as_promised_1.default);
var app = express_1.default();
var amorRootQuery = new graphql_1.GraphQLObjectType({
    name: "AmorRootQuery",
    description: "All queries for Amor Bread",
    fields: __assign({}, amor_products_1.AmorProductQueryFields),
});
var amorRootMutattion = new graphql_1.GraphQLObjectType({
    name: "AmorRootMutation",
    description: "All mutations for Amor Bread",
    fields: __assign({}, amor_products_1.AmorProductMutationFields),
});
var amorRootSchema = new graphql_1.GraphQLSchema({
    query: amorRootQuery,
    mutation: amorRootMutattion,
    description: "Root schema for Amor Bread API",
});
app.use("/gql/amor", express_graphql_1.graphqlHTTP({ schema: amorRootSchema }));
describe("Amor Bread Tests", function () {
    var request = supertest_1.default(app);
    before("Database connection", function (done) {
        var mongoConnectionURI = "mongodb+srv://ledinhbao:tsRR1EeW34@baobin-core-clutter.zjpys.mongodb.net/test_database?retryWrites=true&w=majority";
        mongoose.connect(mongoConnectionURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });
        var db = mongoose.connection;
        db.on("error", function (err) {
            done(new Error("Failed to connect to test database, " + err.message));
        });
        db.once("open", done);
    });
    describe("Amor Product", function () {
        var productId = mongoose.Types.ObjectId();
        var product = new amor_products_1.AmorProductModel({
            _id: productId,
            name: "Sample Product Testing",
            price: 27000,
            unit: "Sample Unit",
            image_url: "Image Url",
            external_image: false,
        });
        before("Cleanup", function (done) {
            amor_products_1.AmorProductModel.deleteMany({}, done);
        });
        it("Create a new sample AmorProduct at endpoint /gql/amor", function (done) {
            var query = "mutation {\n\t\t      productCreate(\n\t\t         name: \"" + product.name + "\"\n\t\t         price: " + product.price + "\n\t\t         unit: \"" + product.unit + "\"\n\t\t      ) { name price unit id }\n\t\t   }";
            request
                .post("/gql/amor")
                .send({ query: query })
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                res.body.data.productCreate.should.have.property("id");
                productId = res.body.data.productCreate.id;
                done();
            });
        });
        it("Create a sample AmorProduct by providing object.", function (done) {
            var query = "mutations {\n            productCreateWithObject(\n               fields: {\n                  name: \"" + product.name + "\"\n                  price: " + product.price + "\n                  unit: \"" + product.unit + "\"\n               }\n            ) { id name price unit }\n         }";
            request
                .post("/gql/amor")
                .send({ query: query })
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                res.body.data.productCreate.should.have.property("id");
                done();
            });
        });
        it("Update product name, with only id & name fields are provided.", function (done) {
            var newProductName = "Product name has been changed";
            var query = "mutation {\n            productUpdate(id: \"" + productId + "\", name: \"" + newProductName + "\") \n            { price name id }\n         }\n         ";
            request
                .post("/gql/amor")
                .send({ query: query })
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                assert.equal(res.body.data.productUpdate.name, newProductName);
                done();
            });
        });
    });
    after(function (done) {
        mongoose.connection.close(done);
    });
});
