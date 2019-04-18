export class ServerContainer {
    server: any;
    constructor(serverInformation: any, parentServer: any) {
        this.server = require(serverInformation.options.path);
        this.server.register(serverInformation, parentServer);
    }
}
