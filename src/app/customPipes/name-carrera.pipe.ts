import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCarrera'
})
export class NameCarreraPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
