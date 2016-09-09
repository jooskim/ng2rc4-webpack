/**
 * Created by jooskim on 8/6/16.
 */
export class MyCustomEvent {
    type: string;
    payload: any;

    constructor(type: string, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}
