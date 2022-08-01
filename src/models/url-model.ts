
export interface IUrl {
    id: number;
    url: string;
    shortUrl: string;
    alias: string;
    clicks: number
}

/**
 * Get a new Url object.
 *
 * @returns
 * @param id
 * @param url
 * @param shortUrl
 * @param alias
 * @param clicks
 */
function getNew(
    id: number,
    url: string ,
    shortUrl:string,
    alias: string,
    clicks: number
): IUrl {
    return {
        id,
        url,
        shortUrl,
        alias,
        clicks
    };
}


// Export default
export default {
    new: getNew
}
