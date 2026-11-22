import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar/navbar.component';
import { register } from 'swiper/element/bundle';
import { FooterComponent } from './features/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('e-commerce');
  ngOnInit(): void {
    // import function to register Swiper custom elements
    // register Swiper custom elements
    register();
  }
}
