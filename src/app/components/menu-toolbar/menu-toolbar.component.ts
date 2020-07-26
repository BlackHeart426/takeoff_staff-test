import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit, OnDestroy {

  pSub: Subscription
  countProductInCart$: Observable<number>
  cartTemplateDisplaySwitch: boolean = false

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  onShowCart(toogle: boolean) {
    setTimeout(() => {
      this.cartTemplateDisplaySwitch = toogle
    },500)

  }

}
