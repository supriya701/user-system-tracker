import { Component, OnInit } from '@angular/core';
import { ActivityTrackerService } from '../services/activity-tracker.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-status.component.html',
  styleUrl: './activity-status.component.scss'
})
export class ActivityStatusComponent implements OnInit {
  isActive: boolean = true;

  constructor(private activityTracker: ActivityTrackerService) {}

  ngOnInit() {
    this.activityTracker.getShowPopup().subscribe(showPopup => {
      if (showPopup) {
        this.activityTracker.getActivityStatus().subscribe(isActive => {
          this.isActive = isActive;
        });
      }
    });
  }
}
