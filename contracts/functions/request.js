const fs = require('fs');
const path = require('path');
const {
	SubscriptionManager,
	simulateScript,
	ResponseListener,
	ReturnType,
	decodeResult,
	FulfillmentCode,
} = require('@chainlink/functions-toolkit');
require('@chainlink/env-enc').config();

const stimulateRequest = async () => {
	const source = fs
		.readFileSync(path.resolve(__dirname, 'source.js'))
		.toString();

	const args = ['80001', '5'];
	const gasLimit = 300000;

	///////// START SIMULATION ////////////

	console.log('Start simulation...');

	const response = await simulateScript({
		source: source,
		args: args,
		bytesArgs: [],
		secrets: {},
	});

	console.log('Simulation result', response);
};

stimulateRequest();
