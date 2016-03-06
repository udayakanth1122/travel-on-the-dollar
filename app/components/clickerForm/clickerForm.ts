'use strict';

import { AbstractControl, ControlGroup, FormBuilder, Validators } from 'angular2/common';
import { Component, View }                                        from 'angular2/core';
import { Button, Icon, Item, Label, TextInput }                   from 'ionic-angular/index';
import { Clickers }                                               from '../../services/clickers';
import { Utils }                                                  from '../../services/utils';

@Component({
  selector: 'clicker-form',
})

@View({
  templateUrl: 'build/components/clickerForm/clickerForm.html',
  directives: [Button, Icon, Item, Label, TextInput],
})

export class ClickerForm {

  private clickerService: Clickers;
  private form: ControlGroup;
  private clickerNameInput: AbstractControl;

  constructor(clickerService: Clickers, fb: FormBuilder) {
    this.clickerService = clickerService;

    this.form = fb.group({
      clickerNameInput: ['', Validators.required],
    });

    this.clickerNameInput = this.form.controls['clickerNameInput'];
  }

  public newClicker(formValue: Object): boolean {

    // need to mark the clickerName control as touched so validation
    // will apply after the user has tried to add a clicker
    this.clickerNameInput.markAsTouched();

    if (!this.clickerNameInput.valid) {
      return false;
    }

    this.clickerService.newClicker(formValue['clickerNameInput']);

    // reset the value of the contorl and all validation / state
    this.clickerNameInput = Utils.resetControl(this.clickerNameInput);

    return true;
  }
}
