import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="text"]'
})
export class TitleCaseDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input') onInput(): void {
    const inputElement = this.el.nativeElement;
    const updatedValue = inputElement.value
      .replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    if (inputElement.value !== updatedValue) {
      inputElement.value = updatedValue;
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
