import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'  // Selector para usar la directiva en el HTML
})
export class UppercaseDirective {

  constructor(public inputRef: ElementRef, public control: NgControl) {}
  // Escucho el evento input mediante el hostlistener
  // obtengo su valor dentro del template
  // lo transformo a mayusculas
  // tomo ese valor transformado y mediante control ( NgControl ) actualizo su formControl asociado
  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    
    const inputElement = this.inputRef.nativeElement as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();  // Convierte a mayúsculas
    this.control.control?.setValue(inputElement.value);
  }
}

