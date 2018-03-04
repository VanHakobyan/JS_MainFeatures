"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserFilterPipe = (function () {
    function UserFilterPipe() {
    }
    UserFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.FirstName != null && app.FirstName.toLocaleLowerCase().indexOf(filter) != -1
                || app.LastName != null && app.LastName.toLocaleLowerCase().indexOf(filter) != -1
                || app.Gender != null && app.Gender.toLocaleLowerCase().indexOf(filter) != -1;
        }) : value;
    };
    return UserFilterPipe;
}());
UserFilterPipe = __decorate([
    core_1.Pipe({
        name: 'userFilter'
    })
], UserFilterPipe);
exports.UserFilterPipe = UserFilterPipe;
//# sourceMappingURL=user.pipe.js.map