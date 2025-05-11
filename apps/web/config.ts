import ky from 'ky';

export const NODE_PORT = 'http://localhost:3000';

export const api = ky.create({
	prefixUrl: NODE_PORT,
	credentials: 'include',
	mode: 'cors', //  NECESSAIRE pour que les cookies soient envoyés
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	hooks: {
		beforeRequest: [
			(request) => {
				// Récupère le token du localStorage
				const token = localStorage.getItem('token');
				if (token) {
					// Ajoute le token dans le header Authorization
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		afterResponse: [
			async (request, options, response) => {
				// Si la réponse est 401 (non autorisé)
				if (response.status === 401) {
					// Supprime le token du localStorage
					localStorage.removeItem('token');
					// Redirige vers la page de login
					window.location.href = '/login';
				}
			},
		],
	},
});
