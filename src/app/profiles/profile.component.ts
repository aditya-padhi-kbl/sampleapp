import { Component, OnInit } from '@angular/core';
import { Transactionmodel } from '../models/transactionModel';
import { HeaderService } from '../header/header.service';
import { ApiService } from '../services/apiService';
import { environment } from '../../environments/environment';
import { CardService } from '../cardComponent/card.service';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    transactionlist: Array<Transactionmodel> = [];
    user = '';
    userId = new FormControl('', {
        validators: [Validators.min(0)]
    });
    createUserMode = false;
    constructor(public headerService: HeaderService, public apiService: ApiService, private cardService: CardService) {}

    ngOnInit(): void {
        this.headerService.message$.subscribe(data => {

            if (data === 'createUser') {
                this.createUserMode = true;
            } else {
                this.user = data;
                this.fetchContent(this.user);
            }
        });

        this.cardService.message$.subscribe(data => {
            if (data) {
                this.createUserMode = false;
                const param = this.userId.value ? (this.user + '/' + this.userId.value) : this.user;
                this.fetchContent(param);
            }
        });

        this.userId.valueChanges
        .debounceTime(500)
        .subscribe(value => {
            this.fetchContent(this.user + '/' + this.userId.value);
        });
    }

    fetchContent = (param: String) => {

        const url = environment.baseApi + param;
        this.apiService.get(url).subscribe((data: Array<Transactionmodel> ) => {
            this.transactionlist.length = 0;
            if (!Array.isArray(data)) {
                this.transactionlist.push(data);
            } else {
                this.transactionlist = data;
            }
        });
    }
}
