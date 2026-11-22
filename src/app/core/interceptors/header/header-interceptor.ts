import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platformId=inject(PLATFORM_ID)

 if(!req.url.includes("products")&&!req.url.includes("categories")){
   if(isPlatformBrowser(platformId)){
     if(localStorage.getItem('ecommToken') ){
    req=req.clone({
    setHeaders: {
      "token": localStorage.getItem('ecommToken')!,
     
    },
  });
  }

  } 
 }
 
  
  return next(req);
};
