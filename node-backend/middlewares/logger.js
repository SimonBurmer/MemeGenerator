const resDotSendInterceptor = (res, send) => (content) => {
    res.contentBody = content;
    res.send = send;
    res.send(content);
};


const requestLoggerMiddleware = ({ logger }) => (req, res, next) => {
    logger("RECV <<<", req.method, req.url, req.hostname, req.rawHeaders);
    res.send = resDotSendInterceptor(res, res.send);
    res.on("finish", () => {
        logger("SEND >>>", res.contentBody);
    });
    next();
};

module.exports = { requestLoggerMiddleware };