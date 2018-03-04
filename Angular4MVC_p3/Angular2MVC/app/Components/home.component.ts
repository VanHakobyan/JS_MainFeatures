import { Component } from "@angular/core";

@Component({
    template: `
               <md-card class="example-card">
                  <md-card-header>
                    <div md-card-avatar class="example-header-image"></div>
                    <md-card-title>Users</md-card-title>
                    <md-card-subtitle>Sample Image</md-card-subtitle>
                  </md-card-header>
                  <img md-card-image src="../../images/users.png">
                  <md-card-content>
                    <p>
                     In this application, you can add new user, edit and delete existing user.
                    </p>
                  </md-card-content>
                  <md-card-actions>
                    <button md-button>LIKE</button>
                    <button md-button>SHARE</button>
                  </md-card-actions>
                </md-card>
               `
})

export class HomeComponent {
}