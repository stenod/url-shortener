import {IUrl} from "@models/url-model";
import IUrlType from "@models/url-model";
import orm from "@repos/mock-orm";
import {getRandomInt, idToShortURL} from "@shared/functions";
import {isNumberObject} from "util/types";


/**
 * Get one url.
 *
 * @param shortUrl
 * @returns
 */
async function getOne(shortUrl: string): Promise<IUrl | null> {
    const db = await orm.openDb();
    for (let i = 0; i < db.urls.length; i++) {
        if (db.urls[i].shortUrl === shortUrl || db.urls[i].alias === shortUrl) {
            return db.urls[i];
        }
    }
    return null;
}


/**
 * Add one url.
 *
 * @param id
 * @param longUrl
 * @param shortUrl
 * @param alias
 * @param clicks
 * @returns
 */
async function add(id: number, longUrl: string, shortUrl: string, alias: string, clicks: number): Promise<IUrl> {
    const db = await orm.openDb();
    const url = IUrlType.new(id, longUrl, shortUrl, alias, clicks)
    db.urls.push(url);
    await orm.saveDb(db)
    return url;
}


/**
 * See if a user with the given id exists.
 *
 * @param shortUrl
 */
async function persists(shortUrl: string): Promise<boolean> {
    const db = await orm.openDb();
    for (const url of db.urls) {
        if (url.shortUrl === shortUrl) {
            return true;
        }
    }
    return false;
}


// Export default
export default {
    getOne,
    add,
    persists
} as const;
