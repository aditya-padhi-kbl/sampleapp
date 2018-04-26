import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {
    private _message = new Subject<string>();
    message$ = this._message.asObservable();
    sendMessage = (message: string) => {
        this._message.next(message);
    }
}
