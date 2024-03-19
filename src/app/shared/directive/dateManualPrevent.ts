// date-picker.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: 'input[type=date]'
})
export class DatePickerDirective {
  constructor(private el: ElementRef) {}
  // @HostListener('keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent): void {
  //   event.preventDefault();
  // }
    @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    debugger
    if (
      !this.isArrowKey(event) && // Allow arrow keys
      !this.isTabKey(event) &&   // Allow Tab key
      !this.isEnterKey(event)    // Allow Enter key
    ) {
      event.preventDefault();
    }
  }

  private isArrowKey(event: KeyboardEvent): boolean {
    // Check if it's an arrow key
    return event.key.includes('Arrow');
  }

  private isTabKey(event: KeyboardEvent): boolean {
    return event.key === 'Tab';
  }

  private isEnterKey(event: KeyboardEvent): boolean {
    return event.key === 'Enter';
  }
}
