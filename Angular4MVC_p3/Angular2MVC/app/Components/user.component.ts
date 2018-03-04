import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { IUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ManageUser } from './manageuser.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    templateUrl: 'app/Components/user.component.html'
})

export class UserComponent implements OnInit {

    users: IUser[];
    user: IUser;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: string = "Search: ";
    selectedOption: string;

    constructor(private _userService: UserService, private dialog: MdDialog) { }

    openDialog() {
        let dialogRef = this.dialog.open(ManageUser);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.user = this.user;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadUsers();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Data successfully added.";
                        break;
                    case DBOperation.update:
                        this.msg = "Data successfully updated.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "There is some issue in saving records, please contact to system administrator!"
            else
                this.msg = result;
        });
    }
    ngOnInit(): void {
        this.LoadUsers();
    }
    LoadUsers(): void {
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; }
            //,error => this.msg = <any>error
            );
    }
    addUser() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editUser(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.openDialog();
    }
    deleteUser(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.openDialog();
    }
    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;

    }
}