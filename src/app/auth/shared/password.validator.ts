import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPassword(): ValidatorFn {
  return (rpw: AbstractControl): {[key: string]: any} => {
    const fg = rpw.parent;
    if (fg) {
      const pw = fg.get('password');
      return pw.value !== rpw.value ? {'no-match': {value: rpw.value}} : null;
    }
    return null;
  };
}
