import ky from 'ky';

export const NODE_PORT = 'http://localhost:3001';

export const api = ky.create({
	prefixUrl: NODE_PORT,
	retry: 2,
	timeout: 5000,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});