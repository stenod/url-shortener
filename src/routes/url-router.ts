import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import urlService from "@services/url-service";
import {ParamMissingError, UrlNotValidError} from "@shared/errors";
import {getRandomInt, stringIsAValidUrl} from "@shared/functions";
import nanoid from "nanoid";


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;


// Paths
export const p = {
    get: '/redirect',
    add: '/add',
} as const;

type RedirectReqQuery = { url ?: string}

router.get(p.get, async (req: Request, res: Response) => {
    const params: RedirectReqQuery = req.query;
    const shortUrl = params.url;
    // Check param
    if (!shortUrl) {
        throw new ParamMissingError();
    }
    const url = await urlService.getOne(shortUrl);
    console.log(url)
    return res.redirect(<string>url?.url);
});

type AddUrlReqQuery = { url ?: string, alias ?: string }


router.post(p.add, async (req: Request, res: Response) => {
    const params: AddUrlReqQuery = req.query;
    const longUrl = params.url
    const alias = params.alias
    // Check param
    if (!longUrl) {
        throw new ParamMissingError();
    }
    if (!stringIsAValidUrl(longUrl)) {
        throw new UrlNotValidError();
    }
    const id = getRandomInt();
    const shortUrl = new URL(longUrl).protocol + "//" + new URL(longUrl).host + "/" +  nanoid.nanoid(6);
    let urlAlias = '';
    if (alias !== undefined) {
        urlAlias = new URL(longUrl).protocol + "//" + new URL(longUrl).host + "/" + alias;
    }
    const url = await urlService.addOne(id, longUrl, shortUrl, urlAlias, 0);
    return res.status(OK).json({url});
});


// Export default
export default router;


