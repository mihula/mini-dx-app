import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface DemoTile {
  routerLink: string;
  emoticon: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AppComponent {
  demoTiles: DemoTile[] = [
    { routerLink: '/', emoticon: '🏠', name: 'Home' },
    { routerLink: '/pro-text-box-demo', emoticon: '📝', name: 'ProTextBox Demo' },
    // Přidejte další dema zde
  ];
}
