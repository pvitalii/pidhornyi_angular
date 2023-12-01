import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LoadingService } from 'app/core/services/loading.service';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit {

  constructor(private el: ElementRef, private loadingService: LoadingService, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'display', '');
      }
    })
  }
}
