import axios, { AxiosRequestConfig } from 'axios';
import { IYupValiation } from '@/types';

// Base api url
const BASE_URL = process.env.VUE_APP_API_BASE_URL;
// Cache expiration time (from minutes to seconds)
const CACHE_EXPIRATION = 1000 * 60 *
    parseInt(process.env.VUE_APP_API_CACHE_EXP_MIN, 10)
    || 0;

export const fetchData = async<T>(
    endpoint: string,
    query: Record<string, string> = {},
    abortSignal?: AbortSignal,
    validatorFunction?: (data: unknown) => Promise<IYupValiation>,
): Promise<T> => {
    if (!BASE_URL)
        throw new Error('Missing environment variable for the API base url!');

    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${BASE_URL}/${endpoint}?${queryString}`;

    // We use a simple format for the cache key
    const cacheKey = `${endpoint}_${queryString}`;
    // Check for the cache data and expiration time
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_time`);

    // On cache hit
    if (cachedData && cachedTime) {
        // Cthe expiration and if still valid - use the cached data
        const isExpired = Date.now() - (parseInt(cachedTime, 10) || 0) > CACHE_EXPIRATION;

        if (!isExpired)
            return JSON.parse(cachedData) as T;
    }

    // On cache miss
    try {
        // Prepare the request config
        const reqConfig: AxiosRequestConfig = {
            url: fullUrl,
            method: 'get',
            signal: abortSignal,
        };

        // Fetch the data
        const response = await axios<T>(reqConfig);

        // Validate API response (if specified)
        const validation: IYupValiation = validatorFunction
            ? await validatorFunction(response)
            : { valid: true, errors: null };

        // Prevent invalid data
        if (!validation.valid)
            throw new Error('Failed to validate API response!');

        // Cache it
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

        return response.data;
    } catch (error) {
        if (axios.isCancel(Error))
            console.log('Request canceled');
        throw error;
    }
}