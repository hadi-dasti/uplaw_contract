import { Request,Response } from 'express';
import * as redis from 'redis';
import { Contract_1} from '../../model/contract/contract_1';
const redisData = redis.createClient();


export class CashDataContractController{
    // Set a cache time of 5 hours
    private readonly cacheTime = 60 * 60 * 60 * 5;
    
      // Define a setCashContract method that retrieves contract data from MongoDB,
    // stores it in Redis, and sets a timeout to delete the data from Redis after 5 minutes
    public async setCashContract(req:Request,res:Response) {
        try {
            // connect to redis
            await redisData.connect();

           // Return a 404 error if no contract data is found
            const contractData = await Contract_1.aggregate([
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
            };

            // Store the contract data in Redis with a 5-hour expiration time
            const setData = await redisData.set(JSON.stringify(contractData),this.cacheTime);
           
            // Retrieve the contract data from Redis
            const readisContract = await redisData.get(JSON.stringify(contractData));

            // Set a timeout to remove the data from Redis after 5 minutes
            setTimeout(async () => {
                const delData = await redisData.del(JSON.stringify(contractData));
                console.log(`Data removed from Redis: ${delData}`)
            }, this.cacheTime);

             // Return a success response with the Redis key and data
            return res.status(200).json({
                success: true,
                data:`please set documen on ${setData} and read contract in redis ${readisContract}`,
                msg: "successfully read contract data"
            });


        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Errro"
            });
        };
    };

};