import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Cache expiration time
const BASE_URL = process.env.API_BASE_URL;
const CACHE_EXPIRATION = parseInt(process.env.API_CACHE_EXPIRATION, 10) || 1000 * 120;


export const fetchData = async<T>(
    endpoint: string,
    query: Record<string, string> = {},
    abortSignal?: AbortSignal
): Promise<T> => {
    console.log(BASE_URL, CACHE_EXPIRATION);

    if (!BASE_URL)
        throw new Error('Missing environment variable for the API base url!');

    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${BASE_URL}/${endpoint}?${queryString}`;

    console.log(queryString, fullUrl);

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
        console.log(reqConfig);

        // Fetch the data
        const response = await axios<T>(reqConfig);
        console.log(response);

        // Cache it
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

        return response.data;
    } catch (error) {
        if (axios.isCancel(Error))
            console.error('Request canceled!', (error as AxiosError).message);
        else
            console.error(error);
        throw error;
    }
}