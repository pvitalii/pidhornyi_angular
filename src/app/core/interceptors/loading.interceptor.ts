import { Injectable } from "@angular/core";
import { LoadingService } from "../services/loading.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  private requestsCount = 0;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestsCount += 1;
    this.loadingService.isLoading = true;
    return next.handle(req).pipe(
      finalize(() => {
        this.requestsCount -= 1;
        if(this.requestsCount === 0) {
          this.loadingService.isLoading = false;
        }
      })
    )
  }
}