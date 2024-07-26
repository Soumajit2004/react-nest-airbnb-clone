import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-guest-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './guest-header.component.html',
})
export class GuestHeaderComponent {

}
