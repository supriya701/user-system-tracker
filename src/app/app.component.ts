import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityStatusComponent } from './activity-status/activity-status.component';
import { InactivityPopupComponent } from './inactivity-popup/inactivity-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ActivityStatusComponent,InactivityPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-activity-tracker';
}
