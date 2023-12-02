import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LoadingService } from 'app/core/services/loading.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef, private loadingService: LoadingService, private renderer: Renderer2) { }
  private loadingSubscription?: Subscription;

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'display', '');
      }
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
