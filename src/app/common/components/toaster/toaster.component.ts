import {Component, HostListener, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

import {ToasterService} from "./toaster.service";
import {APP_TOAST_DISPLAY_ANIMATIONS} from "./toast-animations";

@Component({
  selector: "app-toaster",
  templateUrl: "./toaster.component.html",
  styleUrls: ["./toaster.component.scss"],
  animations: [APP_TOAST_DISPLAY_ANIMATIONS]
})
export class ToasterComponent implements OnDestroy {
  currentToasts$ = this.toastService.toasts$;
  onMouseOver$ = new Subject<void>();
  onMouseLeave$ = new Subject<void>();

  @HostListener("mouseenter", ["$event"])
  mouseover() {
    this.onMouseOver$.next();
  }

  @HostListener("mouseleave", ["$event"])
  mouseleave() {
    this.onMouseLeave$.next();
  }

  constructor(private toastService: ToasterService) {}

  ngOnDestroy() {
    this.onMouseOver$.next();
    this.onMouseOver$.complete();
  }
}
