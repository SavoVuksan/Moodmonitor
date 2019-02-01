import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SharedVarsService} from '../services/shared-vars.service';
import {Entry} from '../classes/entry';

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {

  constructor(private shared:SharedVarsService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // If selected entry is empty go to dashboard
    if(this.isEmpty(this.shared.selectedEntry)) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }else{
      return true;
    }
  }

  /**
   * Checks if provided Entry is empty
   * @param {Entry} entry
   * @returns {boolean}
   */
  isEmpty(entry: Entry): boolean{
    let tit, tex, tag, pos, neg  = true;

      tit = entry.title.length === 0;
      tex = entry.text.length === 0;
      tag = entry.tags.length === 0;
      pos = entry.positiveEmotions.length === 0;
      neg = entry.negativeEmotions.length ===0;

      return tit && tex && tag && pos && neg;

  }
}
