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
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.loading = true;
        router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    // Shows and hides the loading spinner during RouterEvent changes
    AppComponent.prototype.navigationInterceptor = function (event) {
        var _this = this;
        if (event instanceof router_1.NavigationStart) {
            this.loading = true;
        }
        if (event instanceof router_1.NavigationEnd) {
            setTimeout(function () { _this.loading = false; }, 1000);
            // this.loading = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof router_1.NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof router_1.NavigationError) {
            this.loading = false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "user-app",
        template: "\n                <div>\n                  <nav class='navbar navbar-default'>\n                       <div class='container-fluid'>\n                      <button md-icon-button [mdMenuTriggerFor]=\"menu\">\n                         <md-icon>more_vert</md-icon> Menu\n                       </button>\n                       <md-menu #menu=\"mdMenu\">\n                         <button md-menu-item [routerLink]=\"['home']\">\n                           <md-icon>home</md-icon>\n                           <span>Home</span>\n                         </button>\n                         <button md-menu-item [routerLink]=\"['user']\">\n                           <md-icon>group</md-icon>\n                           <span>Users Management</span>\n                         </button>\n                       </md-menu>\n                    </div>\n                   </nav>\n                   <div class='container'>\n                       <router-outlet><div class=\"loading-overlay\" *ngIf=\"loading\">\n                    <!-- show something fancy here, here with Angular 2 Material's loading bar or circle -->\n                    <md-progress-bar mode=\"indeterminate\"></md-progress-bar>\n                      </div></router-outlet>\n                   </div>\n                </div>\n                "
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map