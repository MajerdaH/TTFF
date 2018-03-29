import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jmspipe',
  pure: false
})
export class JmspipePipe implements PipeTransform {


  transform(items: any[], jmspipe: string): any {

    // tslint:disable-next-line:prefer-const
    let items2: any[];
    items2 = [];
    for (const elt of items) {
      if (elt.projectName.includes(jmspipe)) {
items2.push(elt);
      }
    }
      return items2;
  }

}
