import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivityTrackerService } from '../services/activity-tracker.service';

@Component({
  selector: 'app-inactivity-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inactivity-popup.component.html',
  styleUrl: './inactivity-popup.component.scss'
})
export class InactivityPopupComponent {
  showPopup: boolean = false;
  inactivityDuration: number = 0;
  formattedDuration: string = '';

  constructor(private activityTracker: ActivityTrackerService) {}

  ngOnInit() {
    this.activityTracker.getShowPopup().subscribe(show => {
      this.showPopup = show;
    });

    this.activityTracker.getInactivityDuration().subscribe(duration => {
      this.inactivityDuration = duration;
      this.formattedDuration = this.formatDuration(duration);
    });
  }

  private formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  confirmActive() {
    this.activityTracker.confirmUserActive();
  }
}
