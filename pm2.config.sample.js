module.exports = {
	apps: [
		{
			name: "BaoBin API Server",
			script: "./server.js",
			env: {
				MONGO_ATLAS_USERNAME: "",
				MONGO_ATLAS_PASSWORD: "",
				MONGO_ATLAS_DATABASE: "",
				MONGO_ATLAS_STRING: "",
			},
		},
	],
};
