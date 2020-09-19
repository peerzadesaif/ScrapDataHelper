"use strict";
module.exports.port = process.env.PORT || 4001;
module.exports.protocol = 'http'
module.exports.host = "127.0.0.1";
module.exports.hostString = "localhost";
module.exports.clientHostURL = 'http://localhost:3000';

module.exports.mongoDBUrl = "null"

module.exports.environment = process.env.NODE_ENV || "development";
module.exports.SERVICE_NAME = "admin-platform";
module.exports.runClusterServer = false;

module.exports.mongodb = { uri: "mongodb" };

module.exports.options = {
	reconnectTries: 100,
	reconnectInterval: 500,
	autoReconnect: true,
	//useNewUrlParser: true,
	dbName: "platform"
};
// 
// SET 
module.exports.utils = {
	CRON_WORKER: "*/2 * * * * *",
	PASSWORD_SALT: "ThisIsMy_Secret_LoL_AdnjssckjFasDkmsRakld",
	JWT_SECRET: "ThisIsMy_Secret_LoL_GtvhkLRTgtNdGl",
	JWT_TOKEN_EXPIRE: 2 * 86000, // 2 day

	ENCRYPT_SALT: "ThisIsMy_Secret_LoL_GtvhkLRTgtNdGl",
	// ENCRYPT_TOKEN_EXPIRE: 2 * 86000, // 2 day

};

module.exports.secret = {
	NODE_TOKEN_SECRET: "Basic dGVsadszdGluZ0sfdsF1dGg6dGVzdGluZ0BBdXRo",
};
module.exports.amazon = {
	bucketName: "platform-auxy",
	imageUrl: "Null"
};
