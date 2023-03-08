const liveServer = require('live-server');

const rootDir = './dist';

const options = {
	port: 8079,
	root: rootDir,
	open: true,
};
liveServer.start(options);
