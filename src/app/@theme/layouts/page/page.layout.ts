import { Component, OnDestroy } from '@angular/core';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import { Router, NavigationEnd, PRIMARY_OUTLET, UrlTree, UrlSegment } from '@angular/router';
import { CompanyService, UserService } from '../../../service';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-page-layout',
  styleUrls: ['./page.layout.scss'],
  templateUrl: './page.layout.html'
})

export class SampleLayoutComponent implements OnDestroy {

  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
      group: true,
    },
    {
      title: 'Buttons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/buttons',
    },
    {
      title: 'Grid',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/grid',
    },
    {
      title: 'Icons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/icons',
    },
    {
      title: 'Modals',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/modals',
    },
    {
      title: 'Typography',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/typography',
    },
    {
      title: 'Animated Searches',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/search-fields',
    },
    {
      title: 'Tabs',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/tabs',
    },
  ];
  layout: any = {
    name: 'Center Column',
    icon: 'nb-layout-centre',
    id: 'center-column',
  };

  sidebar: any = {
    name: 'Left Sidebar',
    icon: 'nb-layout-sidebar-left',
    id: 'left',
    selected: true,
  };

  protected pageName: String = 'company-list';
  protected pageTitle: String = '';
  protected menuClick$: Subscription;

  constructor(protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    protected companyService: CompanyService,
    protected userService: UserService,
    protected _router: Router) {
    const isBp = this.bpService.getByName('is');
    this.menuClick$ = this.menuService.onItemSelect()
      .withLatestFrom(this.themeService.onMediaQueryChange())
      .delay(20)
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree: UrlTree = this._router.parseUrl(event.urlAfterRedirects);
        const segment: UrlSegment = tree.root.children[PRIMARY_OUTLET].segments[1];
        if (segment) {
          this.pageName = segment.path;
          this.resetMainCardHeader();
        }
      }

      this.resetMainCardHeader();
    });
  }

  ngOnDestroy() {
    this.menuClick$.unsubscribe();
  }

  resetMainCardHeader() {
    switch (this.pageName) {
      case 'company-add':
        this.pageTitle = "New Company";
        break;
      case 'company-edit':
        this.pageTitle = "Edit Company";
        break;
      case 'user-add':
        this.pageTitle = "New User";
        break;
      case 'department-add':
        this.pageTitle = "New Department";
        break;
    }
  }

  goToAddPage(pageType) {
    switch (pageType) {
      case 'user':
        this._router.navigateByUrl('/pages/user-add');
        break;
      case 'department':
        this._router.navigateByUrl('/pages/department-add');
        break;
      case 'company':
        this._router.navigateByUrl('/pages/company-add');
        break;
    }
  }

  searchCompany($e) {
    this.companyService.setSearchKey($e.target.value);
  }

  searchUser($e) {
    this.userService.setSearchKey($e.target.value);
  }
}
