import urlRepo from '@repos/url-repo';
import { IUrl } from '@models/url-model';
import { UrlNotFoundError } from '@shared/errors';



/**
 * Get one url.
 *
 * @returns
 */
async function getOne(shortUrl: string): Promise<IUrl | null> {
    const persists = await urlRepo.persists(shortUrl);
    if (!persists) {
        throw new UrlNotFoundError();
    }
    return urlRepo.getOne(shortUrl);
}


/**
 * Add one url.
 *
 * @param id
 * @param url
 * @param shortUrl
 * @param alias
 * @returns
 */
function addOne(id: number, url: string, shortUrl: string, alias: string, clicks: number): Promise<IUrl> {
    return urlRepo.add(id, url, shortUrl, alias, clicks);
}



// Export default
export default {
    addOne,
    getOne
} as const;
