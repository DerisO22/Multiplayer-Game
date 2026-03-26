export class RateLimiter {
    constructor(maxRequests = 5, windowMs = 1000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = {};
    }
    
    isAllowed(socketId) {
        const now = Date.now();
        if (!this.requests[socketId]) {
            this.requests[socketId] = [];
        }
        
        const userRequests = this.requests[socketId].filter(t => now - t < this.windowMs);
        if (userRequests.length >= this.maxRequests) return false;
        
        userRequests.push(now);
        this.requests[socketId] = userRequests;
        return true;
    }
}