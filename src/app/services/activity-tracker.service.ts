import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ActivityTrackerService {
  private lastActivityTime: Date = new Date();
  private inactivityDuration$: BehaviorSubject<number> = new BehaviorSubject(0);
  private activityStatus$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private showPopup$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.startTracking();
    }
  }

  private startTracking() {
    this.resetActivityTimer();

    if (typeof window !== 'undefined') {
      ['click', 'mousemove', 'keydown'].forEach(event => {
        window.addEventListener(event, () => this.handleActivity());
      });

      setInterval(() => this.updateInactivityDuration(), 1000);
    }
  }

  private handleActivity() {
    // Only reset the activity timer if the popup is not visible
    if (!this.showPopup$.getValue()) {
      this.resetActivityTimer();
    }
  }

  private resetActivityTimer() {
    this.lastActivityTime = new Date();
    this.activityStatus$.next(true);
    this.showPopup$.next(false); // Hide popup when activity is detected
  }

  private updateInactivityDuration() {
    const now = new Date();
    const duration = Math.floor((now.getTime() - this.lastActivityTime.getTime()) / 1000);
    this.inactivityDuration$.next(duration);
    
    if (duration >= 10) { // 120 seconds (2 minutes)
      this.showPopup$.next(true);
      this.activityStatus$.next(false); // Show inactive status when popup appears
    }
  }

  getActivityStatus(): Observable<boolean> {
    return this.activityStatus$.asObservable();
  }

  getInactivityDuration(): Observable<number> {
    return this.inactivityDuration$.asObservable();
  }

  getShowPopup(): Observable<boolean> {
    return this.showPopup$.asObservable();
  }

  confirmUserActive() {
    this.resetActivityTimer();
    this.showPopup$.next(false); // Hide the popup when user confirms
  }
}
