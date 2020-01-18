import { Component } from '@angular/core';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-auth-layout',
  styleUrls: ['./auth.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
            <nb-card-body>
                <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
                    <ng-content select="[auth-layout-content]"></ng-content>
                </div>
            </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AuthLayoutComponent {
}
