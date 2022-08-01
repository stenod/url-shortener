import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import urlService from "@services/url-service";
import {ParamMissingError, UrlNotValidError} from "@shared/errors";
import {getRandomInt, stringIsAValidUrl} from "@shared/functions";
import {nanoid} from "nanoid";


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;


// Paths
export const p = {
    get: '/redirect',
    add: '/add',
} as const;


router.get(p.get, async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    // Check param
    if (!shortUrl) {
        throw new ParamMissingError();
    }
    const url = await urlService.getOne(shortUrl);
    return res.redirect(<string>url?.url);
});

type ReqQuery = { url ?: string, alias ?: string }


router.post(p.add, async (req: Request, res: Response) => {
    const params: ReqQuery = req.query;
    const longUrl = params.url
    const alias = params.alias
    // Check param
    console.log(req.params)
    if (!longUrl) {
        throw new ParamMissingError();
    }
    if (!stringIsAValidUrl(longUrl)) {
        throw new UrlNotValidError();
    }
    const id = getRandomInt();
    const shortUrl = new URL(longUrl).hostname + "/" +  nanoid(6);
    let urlAlias = '';
    if (alias !== undefined) {
        urlAlias = alias;
    }
    const url = await urlService.addOne(id, longUrl, shortUrl, urlAlias, 0);
    return res.status(OK).json({url});
});


// Export default
export default router;


