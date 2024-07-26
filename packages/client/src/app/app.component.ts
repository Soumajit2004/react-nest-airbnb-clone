import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GuestHeaderComponent} from "./core/header/components/guest-header/guest-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuestHeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client';
}
