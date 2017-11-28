"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = (function () {
    function HomeComponent() {
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        template: "\n               <md-card class=\"example-card\">\n                  <md-card-header>\n                    <div md-card-avatar class=\"example-header-image\"></div>\n                    <md-card-title>Users</md-card-title>\n                    <md-card-subtitle>Sample Image</md-card-subtitle>\n                  </md-card-header>\n                  <img md-card-image src=\"../../images/users.png\">\n                  <md-card-content>\n                    <p>\n                     In this application, you can add new user, edit and delete existing user.\n                    </p>\n                  </md-card-content>\n                  <md-card-actions>\n                    <button md-button>LIKE</button>\n                    <button md-button>SHARE</button>\n                  </md-card-actions>\n                </md-card>\n               "
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
