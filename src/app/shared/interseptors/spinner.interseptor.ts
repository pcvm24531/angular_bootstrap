import { inject } from "@angular/core"
import { SpinnerService } from "../services/spinner.service"
import { finalize } from "rxjs";
import { HttpInterceptorFn } from "@angular/common/http";

export const spinnerInterseptor : HttpInterceptorFn = (req, next)=>{
  const spinnnerSvc = inject(SpinnerService);
  spinnnerSvc.show();
  return next(req).pipe(
    finalize( ()=>spinnnerSvc.hide() )
  );
}
