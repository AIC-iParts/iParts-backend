import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getCache<T>(key : string, functionRequest: () => Promise<T>) {
        const allData: T = await this.cacheManager.get(key);

        if (allData) {
            return allData
        }

        const response: T = await functionRequest();

        await this.cacheManager.set(key, response);
        
        return response;
    }
}
