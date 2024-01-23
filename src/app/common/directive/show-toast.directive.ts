import {Directive, HostListener, Input} from '@angular/core';

import {ToasterService, ToastTypes} from "../components/toaster";

@Directive({
  standalone: true,
  selector: '[appShowToast]'
})
export class ShowToastDirective {
  @Input() message!: string | null;
  @Input() type: ToastTypes = ToastTypes.Info;
  @Input() customIconUrl?: string;
  constructor(private ts: ToasterService) { }

  @HostListener('click', ['$event'])
  onClick() {
    this.ts.create(this.message, this.type, this.customIconUrl);
  }

}
