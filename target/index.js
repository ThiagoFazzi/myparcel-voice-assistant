"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Koa = require("koa");
const controller_1 = require("./alexa/controller");
const app = new Koa();
const port = process.env.PORT || 4001;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [
        controller_1.default
    ],
});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map