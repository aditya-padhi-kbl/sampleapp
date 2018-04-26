import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class CardService {
    private _message = new Subject<boolean>();
    message$ = this._message.asObservable();
    sendMessage = (message: boolean) => {
        this._message.next(message);
    }
}
