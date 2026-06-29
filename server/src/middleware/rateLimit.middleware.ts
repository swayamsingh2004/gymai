import { asyncHandler } from "../utils/asyncHandler";
import { redis } from "../services/cache.services";

const ratelimitMiddleware=asyncHandler(async(req,res,next)=>{
    const userId=req.user._id.toString();
    const key=`rate_limit:${userId}`;
    await redis.zremrangebyscore(key, 0, Date.now() - 15 * 60 * 1000)
    const requestCount = await redis.zcard(key);
    if (requestCount >=5) {
        return res.status(429).json({ message: "Rate limit exceeded" });
    }
    await redis.zadd(key, Date.now(), Date.now().toString());
    await redis.expire(key, 15 * 60);
    next();
})
export { ratelimitMiddleware }