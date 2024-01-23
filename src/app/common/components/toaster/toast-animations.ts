import { animate, style, transition, trigger } from "@angular/animations";

export const APP_TOAST_DISPLAY_ANIMATIONS = trigger("appToastAnimation", [
  transition("void => *", [
    style({ transform: "translateY(140px)", opacity: 0 }),
    animate(2000, style({ transform: "translateY(0)", opacity: 1 })),
  ]),
  transition("* => void", [animate(2000, style({ opacity: 0 }))]),
]);
