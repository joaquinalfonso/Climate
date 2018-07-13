import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceStr'
})
export class ReplaceStrPipe implements PipeTransform {

  transform(value: string, oldStr: string, newStr: string): any {
    return value.split(oldStr).join(newStr);
  }

}
