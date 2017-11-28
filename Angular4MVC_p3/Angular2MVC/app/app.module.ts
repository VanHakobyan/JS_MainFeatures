import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { UserService } from './Service/user.service'
import { UserFilterPipe } from './filter/user.pipe'
import { SearchComponent } from './Shared/search.component';
import AppErrorHandler from './Shared/errorhandler';
import { ManageUser } from './components/manageuser.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MdNativeDateModule],
    declarations: [AppComponent, UserComponent, HomeComponent, UserFilterPipe, SearchComponent, ManageUser],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }, { provide: APP_BASE_HREF, useValue: '/' }, UserService],
    entryComponents: [ManageUser],
    bootstrap: [AppComponent]

})
export class AppModule { }
