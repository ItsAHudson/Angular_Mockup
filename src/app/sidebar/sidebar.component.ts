import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  //an Observable that represents whether the current viewport matches the "handset" breakpoint
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  //Boolean to determine whether the sidebar is open or not
  isSidebarOpen = false;
  //These variables are used to change what links appear on the navbar
  //When values are set to true, difference navigation links will be present at the top of the navbar
  isCFMPage = false;
  isTransaction = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    //This routing sets the links that correspond to the page booleans that change page specific navigation links
    //This one in particular is for CFM
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCFMPage = event.url.includes('/cfm');
      }
    });
        
    //This routing sets the links that correspond to the page booleans that change page specific navigation links
    //This one in particular is for Transaction Monitoring
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isTransaction = event.url.includes('/transaction-monitoring');
      }
    });
  }

  //Sidenav toggler that utilizes the boolean set on line 21
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  //This makes sure the sidenav closes whenever a click event occurs anywhere outside of the sidenav
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isToggleButton = target.closest('.toggle-button');
    const isSidebar = target.closest('.sidenav');

    if (!isToggleButton && !isSidebar) {
      this.isSidebarOpen = false;
    }
  }
}
