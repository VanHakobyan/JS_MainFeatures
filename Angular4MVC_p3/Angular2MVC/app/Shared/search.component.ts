import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-list',
    template: `<div class="form-inline">
                <div class="form-group">
                    <label><h3>{{title}}</h3></label>
                </div>
                <div class="form-group">
                    <div class="col-lg-12">
                        <input class="input-lg" placeholder="Enter any text to filter" (paste)="getPasteData($event)" (keyup)="getEachChar($event.target.value)" type="text" [(ngModel)]="listFilter" /><img src="../../images/cross.png" class="cross-btn" (click)="clearFilter()" *ngIf="listFilter"/>
                    </div>
                </div>
                <div class="form-group">
                    <div *ngIf='listFilter'>
                        <div class="h3 text-muted">Filter by: {{listFilter}}</div>
                    </div>
                </div>
            </div>`
})

export class SearchComponent {

    listFilter: string;
    @Input() title: string;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    getEachChar(value: any) {
        this.change.emit(value);
    }

    clearFilter() {
        this.listFilter = null;
        this.change.emit(null);
    }

    getPasteData(value: any) {
        let pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    }
}