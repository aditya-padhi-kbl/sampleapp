import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transactionmodel } from '../models/transactionModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ApiService } from '../services/apiService';
import { environment } from '../../environments/environment';
import { CardService } from './card.service';

@Component({
    selector: 'app-card',
    templateUrl: 'card.component.html'
})

export class AppCardComponent implements OnChanges {
    @Input() transactionObject?: Transactionmodel;
    @Input() index?: number;
    @Input() createMode?: boolean;
    transactionForm: FormGroup;
    /** boolean value toggled when the card is updated */
    updateTransactionSuccess = false;

    /** boolean value toggled when the enable edit button is clicked */
    editMode = false;
    constructor( private apiService: ApiService, private cardService: CardService) {
        this.createForm();
    }

    createForm() {
        this.transactionForm = new FormGroup({
            id: new FormControl(),
            user: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
            currency: new FormControl('', {validators: [Validators.required, Validators.min(1)]}),
            txn_date: new FormControl(),
            amount: new FormControl('', { validators: [Validators.required, Validators.min(0)]})
        });
    }
    enableEdit(): void {
        this.editMode = true;
    }
    editProp(): void {
        const user = this.transactionForm.get('user').value;
        const id = this.transactionForm.get('id').value;
        const obj = JSON.parse(JSON.stringify(this.transactionForm.getRawValue()));
        this.apiService.post<Transactionmodel>(environment.baseApi + user + '/' + id, obj).subscribe( data => {
            this.updateTransactionSuccess = true;
            setTimeout(() => {
            this.updateTransactionSuccess = false;
            this.cardService.sendMessage(true);
            }, 3000);
        }, (error) => {
            throw new Error(error);
        });
    }

    removeProp(): void {
        const user = this.transactionForm.get('user').value;
        const id = this.transactionForm.get('id').value;
        this.apiService.delete(environment.baseApi + '/' + user + '/' + id).subscribe(data => {
            this.cardService.sendMessage(true);
        }, (error) => {
            throw new Error(error);
        });
    }

    cancelChanges(): void {
        this.transactionForm.reset();
        this.transactionForm.setValue(this.transactionObject);
        this.editMode = false;
    }

    createUser(): void {
        const payLoad: Transactionmodel = this.transactionForm.value;
        const user = this.transactionForm.get('user').value;
        const date = new Date();
        let currentMonth: any = date.getMonth() + 1;
        currentMonth = currentMonth > 10 ? currentMonth : ('0' + currentMonth) ;
        delete payLoad.id;
        delete payLoad.user;
        payLoad.txn_date = date.getFullYear() + '-' + currentMonth + '-' + date.getDate();
        this.apiService.post(environment.baseApi + user, payLoad).subscribe(data => {
            this.cardService.sendMessage(true);
        }, (error) => {
            throw new Error(error);
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        const transactionObject = changes['transactionObject'];
        if (!this.createMode && transactionObject.firstChange) {
            this.transactionForm.patchValue(transactionObject.currentValue);
        }
    }
}
