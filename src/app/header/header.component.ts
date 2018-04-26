import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from './header.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {

    constructor(public headerService: HeaderService) {}
    user = new FormControl('', {
            validators: [Validators.email]
    });

    fetchUserInfo = () => {
        this.headerService.sendMessage(this.user.value);
    }

    createUser = () => {
        this.headerService.sendMessage('createUser');
    }
}
