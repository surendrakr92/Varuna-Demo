import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCreatedAtPipe'
})
export class SortByCreatedAtPipePipe implements PipeTransform {
  transform(value: any[], args?: any): any[] {
    debugger
    return value.sort((b, a) => a.createdOn - b.createdOn);
  }
}
