const liveServer = require('live-server');

const rootDir = './dist';

const options = {
	port: 1300,
	root: rootDir,
	open: true,
};
liveServer.start(options);
