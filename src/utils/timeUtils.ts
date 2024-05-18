export const unixTimeToString = (unixTime: number) => {
    if (!Number.isInteger(unixTime) || unixTime < 0)
        return 'Invalid Time';

    // Transform unix time code to js one
    const date = new Date(unixTime * 1000);

    // Extract Date and Time
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    return `${dateString} ${timeString.slice(0, -3)}`;
}