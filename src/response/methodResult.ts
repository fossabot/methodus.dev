export class MethodResult<T= any> {
    stream: any;
    page: number = 1;
    total: number = 0;
    result: T;
    statusCode: number = 200;
    headers: any = {};
    private _on: { [key: string]: () => {} } = {};
    constructor(result: T, total?: number, page?: number) {
        this.result = result;
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }
    }
    public pipe(streamToPipe: any) {
        this.stream = streamToPipe;
        return this.stream;
    }
    public setHeader(key: any, value: any) {
        this.headers[key] = value;
    }
    public on(key: any, value: any) {
        this._on[key] = value;
    }
}

export class MethodResultStatus<T= any> {
    result: T;
    page: number = 1;
    total: number = 0;
    statusCode: number;
    constructor(result: T, statusCode: number, total?: number, page?: number) {
        this.statusCode = statusCode;

        this.result = result;
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }
    }
}
