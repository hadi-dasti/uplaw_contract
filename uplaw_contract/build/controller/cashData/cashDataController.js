"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashDataContractController = void 0;
const redis = __importStar(require("redis"));
const contract_1_1 = require("../../model/contract/contract_1");
const redisData = redis.createClient();
class CashDataContractController {
    constructor() {
        // Set a cache time of 5 hours
        this.cacheTime = 60 * 60 * 60 * 5;
    }
    // Define a setCashContract method that retrieves contract data from MongoDB,
    // stores it in Redis, and sets a timeout to delete the data from Redis after 5 minutes
    setCashContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to redis
                yield redisData.connect();
                // Return a 404 error if no contract data is found
                const contractData = yield contract_1_1.Contract_1.aggregate([
                    {
                        $unwind: "$paragraphs"
                    },
                    {
                        $unwind: "$paragraphs.clauseParagraph"
                    },
                ]);
                if (!contractData) {
                    return res.status(404).json({
                        success: false,
                        msg: "Error Not found for data in document"
                    });
                }
                ;
                // Store the contract data in Redis with a 5-hour expiration time
                const setData = yield redisData.set(JSON.stringify(contractData), this.cacheTime);
                // Retrieve the contract data from Redis
                const readisContract = yield redisData.get(JSON.stringify(contractData));
                // Set a timeout to remove the data from Redis after 5 minutes
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const delData = yield redisData.del(JSON.stringify(contractData));
                    console.log(`Data removed from Redis: ${delData}`);
                }), this.cacheTime);
                // Return a success response with the Redis key and data
                return res.status(200).json({
                    success: true,
                    data: `please set documen on ${setData} and read contract in redis ${readisContract}`,
                    msg: "successfully read contract data"
                });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    msg: "Internal Server Errro"
                });
            }
            ;
        });
    }
    ;
}
exports.CashDataContractController = CashDataContractController;
;
