let CONFIG = {}

CONFIG.jwt_encryption  = process.env.jwt_encryption;
CONFIG.jwt_expiration  = process.env.jwt_expiration;

module.exports = CONFIG;