import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return '0';
    }

    if (Math.abs(value) < 1) {
      const decimalPlaces = Math.max(
        0,
        -Math.floor(Math.log10(Math.abs(value)))
      );
      return Number(value).toFixed(decimalPlaces);
    }

    if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + ' T';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + ' B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + ' M';
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + ' K';
    } else {
      return Number(value).toFixed(2).toString();
    }
  }
}

@Pipe({
  name: 'strToNum',
  standalone: true,
})
export class StringToNumberPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value);
  }
}
