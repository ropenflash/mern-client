const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("calling this value");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://users-server-123.herokuapp.com",
      changeOrigin: true,
    })
  );
};
