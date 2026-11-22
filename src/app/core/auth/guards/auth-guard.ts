import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../i18n/language.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router =inject(Router)
    const toastr = inject(ToastrService);
    const languageService = inject(LanguageService);
    let platformId=inject(PLATFORM_ID)
    if(isPlatformBrowser(platformId)){
 if (localStorage.getItem("ecommToken")) {
    
    return true;
    
  }else{
    toastr.warning(languageService.translate('Please login first'));
 return   router.parseUrl("/home")
  }
    }
 else
  return true

};
