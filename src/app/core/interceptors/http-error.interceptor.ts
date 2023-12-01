import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";

@Injectable()
export class HttpErrorInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      console.log(err);
      switch (err.status) {
        case 404:
          this.router.navigate(['/not-found']);
          break;
        default:
          this.router.navigate(['/server-error']);
      }
      return of()
    }))
  }
}