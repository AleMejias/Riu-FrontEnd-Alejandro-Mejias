import { trigger, state, style, transition, animate } from '@angular/animations';

export const FadeInAnimation = trigger('FadeIn', [
  state('void', style({
    opacity: 0
  })),
  transition('void => *', [
    animate('400ms ease-in')
    ])
]);
