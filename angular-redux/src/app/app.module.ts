import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { rootReducer, IAppState } from './store/index';
import { AppComponent } from './app.component';
import { BooksActions } from './actions/books.actions';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoggingInterceptor } from './interceptors/http-response-time-logger';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  imports: [NgReduxModule, BrowserModule, FormsModule, HttpClientModule, NgxPaginationModule, BrowserAnimationsModule,
    NgxSpinnerModule, ToastrModule.forRoot()],
  declarations: [AppComponent],
  providers: [BooksActions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
