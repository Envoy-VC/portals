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
	timeout: '5000',
});
const response = await req;
console.log(response);

let hexString = response['data'];
hexString = hexString.substring(2);

const arrayBuffer = new Uint8Array(hexString.length / 2 - 1);

for (var i = 4; i < hexString.length; i += 2) {
	var byteValue = parseInt(hexString.substr(i, 2), 16);
	arrayBuffer[i / 2] = byteValue;
}

return arrayBuffer;
