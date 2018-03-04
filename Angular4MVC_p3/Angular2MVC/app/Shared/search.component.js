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
var SearchComponent = (function () {
    function SearchComponent() {
        this.change = new core_1.EventEmitter();
    }
    SearchComponent.prototype.getEachChar = function (value) {
        this.change.emit(value);
    };
    SearchComponent.prototype.clearFilter = function () {
        this.listFilter = null;
        this.change.emit(null);
    };
    SearchComponent.prototype.getPasteData = function (value) {
        var pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    };
    return SearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchComponent.prototype, "title", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SearchComponent.prototype, "change", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search-list',
        template: "<div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label><h3>{{title}}</h3></label>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-lg-12\">\n                        <input class=\"input-lg\" placeholder=\"Enter any text to filter\" (paste)=\"getPasteData($event)\" (keyup)=\"getEachChar($event.target.value)\" type=\"text\" [(ngModel)]=\"listFilter\" /><img src=\"../../images/cross.png\" class=\"cross-btn\" (click)=\"clearFilter()\" *ngIf=\"listFilter\"/>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div *ngIf='listFilter'>\n                        <div class=\"h3 text-muted\">Filter by: {{listFilter}}</div>\n                    </div>\n                </div>\n            </div>"
    })
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map