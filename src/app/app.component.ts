import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PRIME_NG_PRACTICE';

  items: any[] = [];

  selectedItem: any;

  suggestions: any[] = [];

  search(event: any) {
    this.suggestions = [...Array(10).keys()].map(
      (item) => event.query + '-' + item
    );
  }
}
