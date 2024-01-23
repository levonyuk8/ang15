import { Subject } from "rxjs";
import { share } from "rxjs/operators";

import { ToastTypes } from "./toaster.service";

export class Toast {
  type: ToastTypes;
  message: string | null;
  iconUrl?: string;

  private _onInfoSub$: Subject<void> = new Subject<void>();
  private _onSuccessSub$: Subject<void> = new Subject<void>();
  private _onErrorSub$: Subject<void> = new Subject<void>();
  private _init$: Subject<void> = new Subject<void>();
  private _initObs$ = this._init$.asObservable();

  get onInfoSub$() {
    return this._onInfoSub$.asObservable();
  }

  get onSuccess$() {
    return this._onSuccessSub$.asObservable();
  }

  get onError$() {
    return this._onErrorSub$.asObservable();
  }

  constructor(type: ToastTypes, message: string | null, iconUrl?: string) {
    this.type = type;
    this.message = message;
    this.iconUrl = iconUrl;
  }

  setInit() {
    this._init$.next();
  }

  info(message?: string) {
    this.onInit().subscribe(() => {
      if (message) {
        this.message = message;
      }
      this.type = ToastTypes.Info;
      this._onInfoSub$.next();
    });
  }

  success(message?: string) {
    this.onInit().subscribe(() => {
      if (message) {
        this.message = message;
      }
      this.type = ToastTypes.Success;
      this._onSuccessSub$.next();
    });
  }

  error(message?: string) {
    this.onInit().subscribe(() => {
      if (message) {
        this.message = message;
      }
      this.type = ToastTypes.Error;
      this._onErrorSub$.next();
    });
  }

  warning(message?: string) {
    this.onInit().subscribe(() => {
      if (message) {
        this.message = message;
      }
      this.type = ToastTypes.Warning;
      this._onErrorSub$.next();
    });
  }

  destroy() {
    this._onSuccessSub$.complete();
    this._onErrorSub$.complete();
    this._onInfoSub$.complete();
    this._init$.complete();
  }

  private onInit() {
    return this._initObs$.pipe(share());
  }
}
