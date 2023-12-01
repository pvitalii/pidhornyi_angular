import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowOnScreenWidth]'
})
export class ShowOnScreenWidthDirective implements OnInit {

  @Input({ required: true }) appShowOnScreenWidth: {
    from: number;
    to: number;
  } | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWidth(window.innerWidth);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.checkWidth(window.innerWidth);
  }

  private checkWidth(width: number): void {
    if (width < this.appShowOnScreenWidth!.from || width > this.appShowOnScreenWidth!.to) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', '');
    }
  }

}
