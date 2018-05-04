import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SelectOption} from './select-option.model';


@Component({
  selector: 'mt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

	@Input() options: SelectOption[];
  	value: any;
  	onChange: any;

  	constructor() { }

	ngOnInit() {
	}

	setValue(value: any){
		this.value = value;
		this.onChange(this.value);
	}

	writeValue(obj: any): void{
		this.value = obj;
	}

	registerOnChange(fn: any): void{
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void{
		//verifica se foi tocado pelo usuário
	}

	setDisabledState?(isDisabled: boolean): void{

	}


}
