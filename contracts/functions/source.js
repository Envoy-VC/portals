const chainId = args[0];
const tokenId = args[1];
const uri = args[2];
const url = 'https://portals-teal.vercel.app/api/update-uri';

const req = Functions.makeHttpRequest({
	url: url,
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	data: {
		chainId: chainId,
		tokenId: tokenId,
		uri: uri,
	},
	timeout: '10000',
});
const responseTest = await req;
const response = await req;

let hexString = (responseTest ?? response)['data'];

hexString = hexString.replace(/^0x/, '');

function getPairs(hexString) {
	const pairs = [];
	for (let i = 0; i < hexString.length; i += 2) {
		pairs.push(hexString.substr(i, 2));
	}
	return pairs;
}

const pairs = getPairs(hexString);

const integers = pairs.map(function (s) {
	return parseInt(s, 16);
});

const array = new Uint8Array(integers);

return array.buffer;
