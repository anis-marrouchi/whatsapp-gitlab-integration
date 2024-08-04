module.exports = {
    apps: [
      {
        name: "whatsapp",
        script: "./index.js",
        watch: true,
        env: {
          NODE_ENV: "development",
          PORT: 3219
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 3219
        }
      }
    ]
  };
  