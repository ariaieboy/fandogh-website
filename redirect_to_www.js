module.exports = function (req, res, next) {

    const host = req.headers.host;
    const url = req.url;
    const env = process.env.NODE_ENV || 'staging';
    const canonicalDomain = 'www.fandogh.cloud';

    if (env !== 'production' && host !== canonicalDomain) {
        res.writeHead(301, { Location: 'https://' + canonicalDomain + url });
        return res.end()
    }

    return next()
};
