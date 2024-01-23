import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";

import {Toast} from "./toast";

export enum ToastTypes {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Error = "error",
}

@Injectable({
    providedIn: "root",
})
export class ToasterService {
    private readonly maxToastCount = 3;
    private toasts: Toast[] = [];
    private _toastsSub$: Subject<Toast[]> = new BehaviorSubject<Toast[]>([]);

    get toasts$() {
        return this._toastsSub$.asObservable();
    }

    create(message: string | null, type = ToastTypes.Info, iconUrl?: string) {
        const toast = new Toast(type, message, iconUrl);
        const toastHandler = {
            info: (message?: string) => toast.info(message),
            success: (message?: string) => toast.success(message),
            error: (message?: string) => toast.error(message),
            warning: (message?: string) => toast.warning(message),
        };
        if (this.toasts.length >= this.maxToastCount) {
            this.toasts.shift();
        }
        this.toasts.push(toast);
        this._toastsSub$.next(this.toasts);
        switch (type) {
            case ToastTypes.Success:
                toastHandler.success();
                break;
            case ToastTypes.Info:
                toastHandler.info();
                break;
            case ToastTypes.Error:
                toastHandler.error();
                break;
            case  ToastTypes.Warning:
                toastHandler.warning();
                break;
        }

        this._toastsSub$.next(this.toasts);

        return toastHandler;
    }

    remove(toast: Toast) {
        const toastIndex = this.toasts.indexOf(toast);
        this.toasts = [
            ...this.toasts.slice(0, toastIndex),
            ...this.toasts.slice(toastIndex + 1, this.toasts.length),
        ];
        this._toastsSub$.next(this.toasts);
    }
}
