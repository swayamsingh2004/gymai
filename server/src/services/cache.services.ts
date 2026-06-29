import Redis from "ioredis";
const redis=new Redis(process.env.UPSTASH_REDIS_URL!)
async function setCache(key:string,value:any){
    await redis.setex(key,86400,JSON.stringify(value));

}
async function getCached(key:string){
    const data=await redis.get(key);
    if(!data){
        return null;
    }
    return JSON.parse(data);
}
async function deleteCache(key: string) {
    await redis.del(key)
}
export{getCached,setCache,deleteCache,redis}