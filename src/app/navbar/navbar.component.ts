import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  showNav: boolean = false
  
  onResize(event: any) {
    if (event.target.innerWidth <= 991) {
      console.log(event.target.innerWidth)
      this.showNav=true
    }
    else {
      this.showNav = false
    }
    
  }
}
