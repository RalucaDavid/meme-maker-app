import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const imgflipInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.imgflip.com') && req.method === 'POST') {
    let currentParams: HttpParams;

    if (req.body instanceof HttpParams) {
      currentParams = req.body;
    } else if (typeof req.body === 'string') {
      currentParams = new HttpParams({ fromString: req.body });
    } else {
      currentParams = new HttpParams();
    }

    const updatedParams = currentParams
      .set('username', environment.imgflipUsername)
      .set('password', environment.imgflipPassword);

    const clonedReq = req.clone({
      body: updatedParams,
      headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
    });

    return next(clonedReq);
  }

  return next(req);
};