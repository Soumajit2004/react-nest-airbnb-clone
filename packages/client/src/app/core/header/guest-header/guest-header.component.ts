import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HamburgerMenuComponent} from "../components/hamburger-menu/hamburger-menu.component";

@Component({
  selector: 'app-guest-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    HamburgerMenuComponent
  ],
  templateUrl: './guest-header.component.html',
})
export class GuestHeaderComponent {

}
