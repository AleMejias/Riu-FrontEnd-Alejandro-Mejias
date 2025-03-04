import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(public inputRef: ElementRef, public control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    
    const inputElement = this.inputRef.nativeElement as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
    this.control.control?.setValue(inputElement.value);
  }
}

