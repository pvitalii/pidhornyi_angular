import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input() highlightColor: string | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.deHighlight();
  }

  private highlight() {
    this.el.nativeElement.style.boxShadow = `1px 1px 5px 1px ${this.highlightColor}`;
  }

  private deHighlight() {
    this.el.nativeElement.style.boxShadow = '';
  }

}
