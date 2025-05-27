import React from 'react';

const Login = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-md mx-auto">
				<h1 className="text-3xl font-bold mb-6">Connexion</h1>
				<form className="space-y-4">
					<div>
						<label htmlFor="email" className="block mb-2">Email</label>
						<input
							type="email"
							id="email"
							className="w-full p-2 border rounded"
							placeholder="votre@email.com"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block mb-2">Mot de passe</label>
						<input
							type="password"
							id="password"
							className="w-full p-2 border rounded"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
					>
						Se connecter
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;