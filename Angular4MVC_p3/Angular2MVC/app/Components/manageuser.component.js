"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../Service/user.service");
var forms_1 = require("@angular/forms");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var material_1 = require("@angular/material");
var ManageUser = (function () {
    function ManageUser(fb, _userService, dialogRef) {
        this.fb = fb;
        this._userService = _userService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.country = [
            { value: 'USA', viewValue: 'USA' },
            { value: 'Canada', viewValue: 'Canada' }
        ];
        this.gender = [
            'Male',
            'Female'
        ];
        this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
            'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
            'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];
        this.formErrors = {
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
        this.validationMessages = {
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
            },
            'DOB': {
                'required': 'DOB is required.'
            },
            'City': {
                'required': 'City is required.'
            },
            'State': {
                'required': 'State is required.'
            },
            'Zip': {
                'required': 'Zip is required.'
            },
            'Country': {
                'required': 'Country is required.'
            }
        };
    }
    ManageUser.prototype.filterStates = function (val) {
        return val ? this.states.filter(function (s) { return new RegExp("^" + val, 'gi').test(s); })
            : this.states;
    };
    ManageUser.prototype.ngOnInit = function () {
        var _this = this;
        this.userFrm = this.fb.group({
            Id: [''],
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            Email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            Gender: ['', forms_1.Validators.required],
            DOB: ['', forms_1.Validators.required],
            City: ['', forms_1.Validators.required],
            State: ['', forms_1.Validators.required],
            Zip: ['', forms_1.Validators.required],
            Country: ['', forms_1.Validators.required]
        });
        this.filteredStates = this.userFrm.controls["State"].valueChanges.startWith(null).map(function (name) { return _this.filterStates(name); });
        this.userFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        if (this.dbops == enum_1.DBOperation.create)
            this.userFrm.reset();
        else
            this.userFrm.setValue(this.user);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageUser.prototype.onValueChanged = function (data) {
        if (!this.userFrm) {
            return;
        }
        var form = this.userFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ManageUser.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._userService.post(global_1.Global.BASE_USER_ENDPOINT, formData.value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.update:
                this._userService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.delete:
                this._userService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
        }
    };
    ManageUser.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    };
    return ManageUser;
}());
ManageUser = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/manageuser.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, material_1.MdDialogRef])
], ManageUser);
exports.ManageUser = ManageUser;
//# sourceMappingURL=manageuser.component.js.map