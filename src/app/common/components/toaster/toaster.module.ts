import { ModuleWithProviders, NgModule } from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToasterComponent } from "./toaster.component";
import { ToastComponent } from "./toast/toast.component";

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, NgOptimizedImage],
  declarations: [ToasterComponent, ToastComponent],
  exports: [ToasterComponent, ToastComponent],
})
export class AppToasterModule {
  static forRoot(): ModuleWithProviders<AppToasterModule> {
    return {
      ngModule: AppToasterModule,
    };
  }
}
