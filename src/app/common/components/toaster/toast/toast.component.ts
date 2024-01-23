import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { merge, Subject, timer } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";

import { ToasterService } from "../toaster.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() toast: any;
  @Input() onMouseOver!: Subject<void>;
  @Input() onMouseLeave!: Subject<void>;

  private delay = 15000;
  private pause = false;

  destroy$ = new Subject<void>();

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.toast.onInfoSub$
      .pipe(
        switchMap(() => this.info()),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.toast.onSuccess$
      .pipe(
        switchMap(() => this.suc()),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.toast.onError$
      .pipe(
        switchMap(() => this.err()),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.onMouseOver
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.pause = true));

    this.onMouseLeave
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.pause = false));

    this.toast.setInit();
  }

  info() {
    return this._registerTimer();
  }

  suc() {
    return this._registerTimer();
  }

  err() {
    return this._registerTimer();
  }

  private _startTimer() {
    return timer(this.delay).pipe(
      map(() => {
        this.toasterService.remove(this.toast);
      }),
      takeUntil(merge(this.onMouseOver, this.destroy$))
    );
  }

  private _registerTimer() {
    if (!this.pause) {
      this.onMouseLeave
        .pipe(
          switchMap(() => this._startTimer()),
          takeUntil(this.destroy$)
        )
        .subscribe();
      return this._startTimer();
    }

    return this.onMouseLeave.pipe(
      switchMap(() => this._startTimer()),
      takeUntil(this.destroy$)
    );
  }

  onClose(){
    this.toasterService.remove(this.toast)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
