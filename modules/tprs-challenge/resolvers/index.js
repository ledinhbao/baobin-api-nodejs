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
exports.resolvers = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var models_1 = require("../models");
var challengeExist = function (challengeId) {
    var query = models_1.ChallengeModel.findById(challengeId)
        .then(function (res) {
        if (res === null)
            return false;
        return true;
    })
        .catch(function (err) {
        throw new Error("Unable to check the existance of challenge, " + err.message);
    });
    return query;
};
var runnerExist = function (runnerId) {
    var query = models_1.RunnerModel.findById(runnerId)
        .then(function (res) {
        if (res === null)
            return false;
        return true;
    })
        .catch(function (err) {
        throw new Error("Unable to check the existance of runner, " + err.message);
    });
    return query;
};
var participantExist = function (challengeId, runnerId) {
    var query = models_1.RecordModel.find({
        challengeId: challengeId,
        runnerId: runnerId,
        registerRecord: true,
    })
        .then(function (res) {
        if (res === null || res.length === 0)
            return false;
        return true;
    })
        .catch(function (err) {
        throw new Error("Unable to check the existance of runner, " + err.message);
    });
    return query;
};
var findParticipantsForChallenge = function (parent, _) { return __awaiter(void 0, void 0, void 0, function () {
    var challengeId, listRunners, aggregate, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                challengeId = parent._id;
                return [4 /*yield*/, models_1.RecordModel.find({
                        challengeId: parent._id,
                        registerRecord: true,
                    })];
            case 1:
                listRunners = _a.sent();
                return [4 /*yield*/, models_1.RunnerModel.aggregate([
                        {
                            $match: {
                                _id: {
                                    $in: listRunners.map(function (r) { return r.runnerId; }),
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "tprs_records",
                                let: { id: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$runnerId", "$$id"] },
                                                    { $eq: ["$challengeId", challengeId] },
                                                    { $eq: ["$registerRecord", true] },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "register",
                            },
                        },
                        {
                            $lookup: {
                                from: "tprs_records",
                                let: { id: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$runnerId", "$$id"] },
                                                    { $eq: ["$challengeId", challengeId] },
                                                    { $ne: ["$registerRecord", true] },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "records",
                            },
                        },
                    ])];
            case 2:
                aggregate = _a.sent();
                return [2 /*return*/, aggregate.map(function (item) { return (__assign(__assign({}, item), { id: item._id, register: item.register[0] })); })];
            case 3:
                err_1 = _a.sent();
                throw new Error("Failed to get participants: " + err_1.message);
            case 4: return [2 /*return*/];
        }
    });
}); };
var getRecordsForParticipant = function (_, _a) {
    var runnerId = _a.runnerId, challengeId = _a.challengeId;
    return __awaiter(void 0, void 0, void 0, function () {
        var runner, challenge, records, registerRecord, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.RunnerModel.findById(runnerId)];
                case 1:
                    runner = _b.sent();
                    return [4 /*yield*/, models_1.ChallengeModel.findById(challengeId)];
                case 2:
                    challenge = _b.sent();
                    return [4 /*yield*/, models_1.RecordModel.find({
                            runnerId: runnerId,
                            challengeId: challengeId,
                            registerRecord: { $ne: true },
                        })];
                case 3:
                    records = _b.sent();
                    return [4 /*yield*/, models_1.RecordModel.find({
                            runnerId: runnerId,
                            challengeId: challengeId,
                            registerRecord: true,
                        }).then(function (res) {
                            if (res.length > 0)
                                return res[0];
                            else
                                return null;
                        })];
                case 4:
                    registerRecord = _b.sent();
                    if (registerRecord === null)
                        return [2 /*return*/, null];
                    result = {
                        runner: runner,
                        challenge: challenge,
                        register: registerRecord,
                        data: records.map(function (r) { return ({ date: r.date, value: r.value }); }),
                    };
                    return [2 /*return*/, result];
            }
        });
    });
};
var addRecordForParticipantBulk = function (_, _a) {
    var data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var challengeId, runnerId, session, res, i, item, instance, tmp, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    challengeId = data.challengeId;
                    runnerId = data.runnerId;
                    return [4 /*yield*/, challengeExist(challengeId)];
                case 1:
                    if ((_b.sent()) === false) {
                        throw new Error("Challenge does not exist.");
                    }
                    return [4 /*yield*/, runnerExist(runnerId)];
                case 2:
                    if ((_b.sent()) === false) {
                        throw new Error("Runner does not exist.");
                    }
                    return [4 /*yield*/, participantExist(challengeId, runnerId)];
                case 3:
                    if ((_b.sent()) === false) {
                        throw new Error("Runner does not participate to challenge.");
                    }
                    return [4 /*yield*/, models_1.RecordModel.startSession()];
                case 4:
                    session = _b.sent();
                    res = [];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 10, 11, 12]);
                    session.startTransaction();
                    i = 0;
                    _b.label = 6;
                case 6:
                    if (!(i < data.records.length)) return [3 /*break*/, 9];
                    item = data.records[i];
                    instance = new models_1.RecordModel({
                        _id: mongoose_1.default.Types.ObjectId(),
                        challengeId: challengeId,
                        runnerId: runnerId,
                        date: item.key,
                        value: item.value,
                    });
                    return [4 /*yield*/, instance.save()];
                case 7:
                    tmp = _b.sent();
                    res.push(tmp);
                    _b.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9:
                    session.commitTransaction();
                    return [3 /*break*/, 12];
                case 10:
                    err_2 = _b.sent();
                    session.abortTransaction();
                    throw new Error("Unable to save all records, " + err_2.message);
                case 11:
                    session.endSession();
                    return [2 /*return*/, res];
                case 12: return [2 /*return*/];
            }
        });
    });
};
var registerToChallenge = function (_, _a) {
    var data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var instance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.RecordModel.find({
                        runnerId: data.runnerId,
                        challengeId: data.challengeId,
                        registerRecord: true,
                    }).then(function (res) {
                        if (res.length > 0)
                            throw new Error("Runner with ID: " + data.runnerId + " has already registered for challenge ID: " + data.challengeId);
                    })];
                case 1:
                    _b.sent();
                    data.registerRecord = true;
                    if (data.date === "")
                        data.date = Date();
                    instance = new models_1.RecordModel(__assign({ _id: mongoose_1.default.Types.ObjectId() }, data));
                    return [4 /*yield*/, instance
                            .save()
                            .then(function (res) { return res; })
                            .catch(function (err) {
                            throw new Error("Unable to register, " + err.message);
                        })];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
var registerToChallengeBulk = function (_, _a) {
    var data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            throw new Error("Not yet support");
        });
    });
};
var unregisterToChallenge = function (_, _a) {
    var data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var session;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.RecordModel.startSession()];
                case 1:
                    session = _b.sent();
                    return [4 /*yield*/, models_1.RecordModel.find({
                            runnerId: data.runnerId,
                            challengeId: data.challengeId,
                        })
                            .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res.length > 0) {
                                    session.startTransaction();
                                    res.forEach(function (record) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, models_1.RecordModel.findByIdAndDelete(record._id)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    }); }); });
                                    session.commitTransaction();
                                    session.endSession();
                                    return [2 /*return*/, true];
                                }
                                return [2 /*return*/];
                            });
                        }); })
                            .catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, session.abortTransaction()];
                                    case 1:
                                        _a.sent();
                                        session.endSession();
                                        throw new Error("Unable to register, " + err.message);
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, true];
            }
        });
    });
};
var updateRegister = function (_, _a) {
    var data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var record;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.RecordModel.find({
                        runnerId: data.runnerId,
                        challengeId: data.challengeId,
                        registerRecord: true,
                    }).then(function (res) {
                        if (res.length > 0)
                            return res[0];
                        else
                            throw new Error("Runner does not register for this challenge");
                    })];
                case 1:
                    record = _b.sent();
                    data.registerRecord = true;
                    if (data.date === "")
                        delete data.date;
                    return [4 /*yield*/, models_1.RecordModel.findByIdAndUpdate(record._id, __assign({}, data), { useFindAndModify: false })
                            .then(function (res) { return res; })
                            .catch(function (err) {
                            throw new Error("Unable to update register record: " + err.message);
                        })];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.resolvers = {
    Challenge: {
        participants: findParticipantsForChallenge,
    },
    Query: {
        getRunnerInfo: function (_, args) {
            return models_1.RunnerModel.findById(args.id);
        },
        getRunners: function () { return models_1.RunnerModel.find(); },
        getChallenges: function () { return models_1.ChallengeModel.find(); },
        getChallengeInfo: function (_, _a) {
            var id = _a.id;
            return models_1.ChallengeModel.findById(id);
        },
        getRecordsForParticipant: getRecordsForParticipant,
        getRecordById: function (_, _a) {
            var id = _a.id;
            return models_1.RecordModel.findById(id);
        },
    },
    Mutation: {
        createRunnerProfile: function (_, _a) {
            var data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            profile = new models_1.RunnerModel(__assign({ _id: mongoose_1.default.Types.ObjectId() }, data));
                            return [4 /*yield*/, profile
                                    .save()
                                    .then(function (res) {
                                    return res;
                                })
                                    .catch(function (err) {
                                    throw new Error("Unable to save," + err.message);
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        createChallenge: function (_, _a) {
            var data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            instance = new models_1.ChallengeModel(__assign({ _id: mongoose_1.default.Types.ObjectId() }, data));
                            return [4 /*yield*/, instance
                                    .save()
                                    .then(function (res) {
                                    return res;
                                })
                                    .catch(function (err) {
                                    throw new Error("Unable to save," + err.message);
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        addRunnerToChallenge: function (_, _a) {
            var data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var registerDate, instance;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // const data = args.data;
                            if (!Object.hasOwnProperty.bind(data)("runnerId")) {
                                throw new Error("Runner ID is required. Please include runnerId field in your data.");
                            }
                            if (!Object.hasOwnProperty.bind(data)("challengeId")) {
                                throw new Error("Challenge ID is required. Please include challengeId field in your data.");
                            }
                            registerDate = "";
                            if (!Object.hasOwnProperty.bind(data)("startDate"))
                                registerDate = Date();
                            else if (data.startDate === "")
                                registerDate = Date();
                            else
                                registerDate = data.startDate;
                            instance = new models_1.RecordModel({
                                _id: mongoose_1.default.Types.ObjectId(),
                                runnerId: mongoose_1.default.Types.ObjectId(data.runnerId),
                                challengeId: mongoose_1.default.Types.ObjectId(data.challengeId),
                                date: registerDate,
                                registerRecord: true,
                            });
                            return [4 /*yield*/, instance
                                    .save()
                                    .then(function (res) { return res; })
                                    .catch(function (err) {
                                    throw new Error("Unable to add runner to challenge, " + err.message);
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        addRecordForParticipant: function (_, _a) {
            var data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (data.date === "")
                                data.date = Date();
                            instance = new models_1.RecordModel(__assign({ _id: mongoose_1.default.Types.ObjectId() }, data));
                            return [4 /*yield*/, instance
                                    .save()
                                    .then(function (res) { return res; })
                                    .catch(function (err) {
                                    throw new Error("Unable to save records, " + err.message);
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        addRecordForParticipantBulk: addRecordForParticipantBulk,
        registerToChallenge: registerToChallenge,
        registerToChallengeBulk: registerToChallengeBulk,
        unregisterToChallenge: unregisterToChallenge,
        updateRegister: updateRegister,
    },
};
