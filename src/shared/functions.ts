import logger from 'jet-logger';
import {URL} from "url";

/**
 * Print an error object if it's truthy. Useful for testing.
 *
 * @param err
 */
export function pErr(err?: Error): void {
    if (!!err) {
        logger.err(err);
    }
};


/**
 * Get a random number between 1 and 1,000,000,000,000
 *
 * @returns
 */
export function getRandomInt(): number {
    return Math.floor(Math.random() * 1_000_000_000_000);
};


export const stringIsAValidUrl = (s: string) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

//https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/
export function idToShortURL(n: number)
{

    // Map to store 62 possible characters
    const map = "abcdefghijklmnopqrstuvwxyzABCDEF"
    "GHIJKLMNOPQRSTUVWXYZ0123456789";

    let shortUrl = [];

    // Convert given integer id to a base 62 number
    while (n)
    {
        // use above map to store actual character
        // in short url
        shortUrl.push(map[n % 62]);
        n = Math.floor(n / 62);
    }

    // Reverse shortURL to complete base conversion
    shortUrl.reverse();

    return shortUrl.join("");
}

// Function to get integer ID back from a short url
export function shortURLtoID(shortURL: string | any[]) {
    let id = 0; // initialize result

    // A simple base conversion logic
    for (let i = 0; i < shortURL.length; i++) {
        if ('a' <= shortURL[i] && shortURL[i] <= 'z')
            id = id * 62 + shortURL[i].charCodeAt(0) - 'a'.charCodeAt(0);
        if ('A' <= shortURL[i] && shortURL[i] <= 'Z')
            id = id * 62 + shortURL[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
        if ('0' <= shortURL[i] && shortURL[i] <= '9')
            id = id * 62 + shortURL[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
    }
    return id;
}
