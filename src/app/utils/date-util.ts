import { isNullOrUndefined } from './function-util';
import * as moment from 'moment';
import { Moment } from 'moment';

export class DateUtil {
  public static readonly ISO8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
  public static readonly WINFORMAT = /^\d{4}-\d\d-\d\d$/;
  public static readonly LITTLE_ENDIAN = /^\d\d\/\d\d\/\d{4}$/;
  public static readonly LITTLE_ENDIAN_FORMAT = 'DD/MM/YYYY';
  public static readonly MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  public static parseDate(data: string): any {
    if (isNullOrUndefined(data)) {
      return undefined;
    }
    if (this.isIso8601(data) || this.isWinFormat(data)) {
      return moment(data).toDate();
    } else if (this.isLittleEndian(data)) {
      return moment(data, DateUtil.LITTLE_ENDIAN_FORMAT).toDate();
    } else {
      throw new Error('Erro ao converter a data. Formato inválido.');
    }
  }

  public static isFormatoDataValido(date: string) {
    return this.isIso8601(date) || this.isWinFormat(date) || this.isLittleEndian(date);
  }

  public static isIso8601(value) {
    if (value === null || value === undefined) {
      return false;
    }

    return DateUtil.ISO8601.test(value);
  }

  public static isWinFormat(value) {
    if (value === null || value === undefined) {
      return false;
    }

    return DateUtil.WINFORMAT.test(value);
  }

  public static isLittleEndian(value) {
    if (value === null || value === undefined) {
      return false;
    }

    return DateUtil.LITTLE_ENDIAN.test(value);
  }

  public static toMoment(data: Date): Moment {
    return moment(data);
  }

  public static toFormat(data: Date, formato = 'YYYY-MM-DD'): string {
    return moment(data).format(formato);
  }

  public static getNomeMes(mes: number): string {
    return !isNullOrUndefined(mes) && mes >= 1 && mes <= 12 ? this.MESES[mes - 1] : '';
  }
}
