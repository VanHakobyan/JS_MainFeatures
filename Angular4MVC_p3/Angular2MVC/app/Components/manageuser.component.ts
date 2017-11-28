import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'app/Components/manageuser.component.html',
})
export class ManageUser implements OnInit {

    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    user: IUser;

    country = [
        { value: 'USA', viewValue: 'USA' },
        { value: 'Canada', viewValue: 'Canada' }
    ];

    gender = [
        'Male',
        'Female'
    ];

    states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
        'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    stateCtrl: FormControl;
    filteredStates: any;

    constructor(private fb: FormBuilder, private _userService: UserService, public dialogRef: MdDialogRef<ManageUser>) { }

    filterStates(val: string) {
        return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
            : this.states;
    }

    ngOnInit(): void {
        this.userFrm = this.fb.group({
            Id: [''],
            FirstName: ['', [Validators.required, Validators.maxLength(50)]],
            LastName: ['', [Validators.required, Validators.maxLength(50)]],
            Email: ['', [Validators.required, Validators.email]],
            Gender: ['', Validators.required],
            DOB: ['', Validators.required],
            City: ['', Validators.required],
            State: ['', Validators.required],
            Zip: ['', Validators.required],
            Country: ['', Validators.required]
        });
        this.filteredStates = this.userFrm.controls["State"].valueChanges.startWith(null).map(name => this.filterStates(name));
        this.userFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        if (this.dbops == DBOperation.create)
            this.userFrm.reset();
        else
            this.userFrm.setValue(this.user);

        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }

    onValueChanged(data?: any) {

        if (!this.userFrm) { return; }
        const form = this.userFrm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'Gender': '',
        'DOB': '',
        'City': '',
        'State': '',
        'Zip': '',
        'Country': ''
    };

    validationMessages = {
        'FirstName': {
            'maxlength': 'First Name cannot be more than 50 characters long.',
            'required': 'First Name is required.'
        },
        'LastName': {
            'maxlength': 'Last Name cannot be more than 50 characters long.',
            'required': 'Last Name is required.'
        },
        'Email': {
            'email': 'Invalid email format.',
            'required': 'Email is required.'
        },
        'Gender': {
            'required': 'Gender is required.'
        }
        ,
        'DOB': {
            'required': 'DOB is required.'
        }
        ,
        'City': {
            'required': 'City is required.'
        }
        ,
        'State': {
            'required': 'State is required.'
        }
        ,
        'Zip': {
            'required': 'Zip is required.'
        }
        ,
        'Country': {
            'required': 'Country is required.'
        }
    };

    onSubmit(formData: any) {
        switch (this.dbops) {
            case DBOperation.create:
                this._userService.post(Global.BASE_USER_ENDPOINT, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.update:
                this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }
}