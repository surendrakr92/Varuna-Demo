import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="text"][appUpperCase], textarea[appUpperCase]'
  
})
export class UpperCaseDirective {

  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event']) onInput(event: any): void {
    const inputElement = this.el.nativeElement;

    // Get the input value
    let value = inputElement.value;

    // Convert the entire input value to uppercase
    value = value.toUpperCase();

    // Check if the value has changed to avoid triggering an infinite loop
    if (inputElement.value !== value) {
      // Set the input value to the uppercase version
      inputElement.value = value;

      // Manually trigger an input event to ensure change detection processes the value
      const inputEvent = new Event('input', { bubbles: true });
      inputElement.dispatchEvent(inputEvent);
    }
  }

}





