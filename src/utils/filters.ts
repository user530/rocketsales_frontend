// Generate a list of unique values given array of entities and the key
const getUniqueValues = (data: unknown[], key: string) => {
    // Get all values of specified key from the array
    const allValues = data.map(
        val => val && (typeof val === 'object')
            ? `${getNestedValue(val, key)}`
            : undefined
    ).filter(val => val !== undefined) as string[];

    return Array.from(new Set(allValues));
};

// Try to drill the object to get nested value
const getNestedValue = (obj: Record<string, any>, path: string) => {
    const keys = path.split('.');
    let result: any = obj;

    // Drill into an object and extract the value 
    keys.forEach((key) => {
        if (typeof result === 'object' && key in result)
            result = result[key];
    }, obj);

    return typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean'
        ? result
        : '';
};

// Generate ant-table style filters based on the data 
export const generateFilters = (data: unknown[], key: string) => {
    // Get unique values from the data and generate ant-table style filter array
    const uniqueValues = getUniqueValues(data, key);

    return uniqueValues.map(val => ({ text: val, value: val }));
};