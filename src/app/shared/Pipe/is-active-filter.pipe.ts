import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActiveFilter'
})
export class IsActiveFilterPipe implements PipeTransform {

  transform(items: any[]): any {
    if(!items) return []
    return items.filter(item=>item.isActive !==false)
    return null;
  }

}
