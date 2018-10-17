import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private isMobile: boolean;
  private mobileSize;

  constructor() {
    this.mobileSize = 900;
  }

  public getMobile(): boolean {
    this.isMobile = (window.innerWidth <= this.mobileSize ? true : false);
    return this.isMobile;
  }

}
