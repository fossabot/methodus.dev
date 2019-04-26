import { MethodResult, Verbs, Method, Param, MethodMock, MethodConfig } from '../src/index';

@MethodConfig('Player')

export class TestController {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')

    public static async list() {

        return new MethodResult({});
    }

    @Method(Verbs.Post, '/api/player')

    public static async create() {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public static async read(@Param('player_id') playerId: number) {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/api/player/:field/:value')

    public static async getByField(@Param('field') field, @Param('value') value: number) {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')

    public static async update() {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player')
    public static delete() {
        return new MethodResult({});
    }

}
