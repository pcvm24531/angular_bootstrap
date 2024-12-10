import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = signal<boolean>(false);

  constructor() { }

  /**
   * hide
   */
  public hide() {
    this.isLoading.set(false);
  }
  /**
   * show
   */
  public show() {
    this.isLoading.set(true);
  }
}


