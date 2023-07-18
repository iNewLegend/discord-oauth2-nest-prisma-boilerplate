export function discordFetch( accessToken: string, endpoint: string, options?: RequestInit ) {
    return fetch( `https://discord.com/api/${ endpoint }`, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${ accessToken }`,
        }
    } );
}
