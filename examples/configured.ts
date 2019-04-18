process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, PluginConfiguration,
} from '../';
import { ScreensDataController } from './controllers/screen.data.controller';

const expressModule = path.join(process.cwd(), '/src/servers/express');

@ServerConfiguration(ServerType.Express, { path: expressModule, port: process.env.PORT || 6695 })
@PluginConfiguration('@methodus/describe')
@ClientConfiguration(ScreensDataController, MethodType.Local, ServerType.Express)
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

new Xserver();
