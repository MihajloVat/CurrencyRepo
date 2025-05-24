const dns = require('dns');

function checkInternet() {
    return new Promise((resolve) => {
        dns.lookup('google.com', (err) => {
            resolve(!err);
        });
    });
}

module.exports = {checkInternet};

