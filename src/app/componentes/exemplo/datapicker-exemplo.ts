import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter,MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DateUtil } from '../../utils/date-util';

import { Processo } from '../../modelo/Processo';

export const CUSTOM_FORMATS = {
  parse: { dateInput: 'LL' },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'datapicker-exemplo',
  templateUrl: 'datapicker-exemplo.html',
  styleUrls: ['./datapicker-exemplo.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS },
  ],
})
export class DatapickerExemplo implements OnInit {
  public formCadastroProcessoFornecedor: UntypedFormGroup;
  public inputValidadeInicio: Date;
  public processo: Processo;
  events: string[] = [];

  constructor(private fb: UntypedFormBuilder) {
    this.processo = new Processo();
  }

  ngOnInit(): void {
    this.inicializaForm(this.processo);
  }

  inicializaForm(processo: Processo) {
    this.formCadastroProcessoFornecedor = this.fb.group({
      validadeInicio: [processo?.validadeInicio],
    });
  }

  public alteraMesClique(e: any, picker: any) {
    console.log('alteraValidadeInicioPorMesClique', e, picker);
    this.inputValidadeInicio = e.toDate();
    this.formCadastroProcessoFornecedor
      .get('validadeInicio')
      .setValue(e.toDate());
    picker.close();
  }

  limpaValidadeInicio(){
    this.formCadastroProcessoFornecedor
    .get('validadeInicio')
    .setValue(undefined);
  }

  addEvent(type: string, event: any) {
    if(event.value!=undefined){
      const valueMoment = event.value;
      const valorDigitado = valueMoment.date();
      //console.log(DateUtil.parseDate('MM/YYYY'));
     //moment(data, DateUtil.LITTLE_ENDIAN_FORMAT).toDate()
      //const saida =  ("1/1974", CUSTOM_FORMATS.display.dateInput).toDate();
      //console.log(saida);
      this.events.push(`${type} ---- ${event.value} ---- ${valorDigitado}`);
    }else{
      console.log('valor invalido');
      this.limpaValidadeInicio();
    }
  }
}
