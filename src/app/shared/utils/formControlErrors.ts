import { FormControl } from '@angular/forms';
import { ControlErrorMessages } from '../types/controlErrorMessages.interface';


export function getErrorsFromControl(controlObj: FormControl, controlErrorMessages: ControlErrorMessages): string[] {
    return Object.keys(controlErrorMessages).map(keyError => {
        return controlObj.hasError(keyError) ? controlErrorMessages[keyError](controlObj.errors[keyError]) : controlErrorMessages['default']();
    })
}

// getErrorMessage(){
  //  return Object.keys(this.controlErrorMessages).map(keyError => {
  //     return this.controlObj.hasError(keyError) ? this.controlErrorMessages[keyError](this.controlObj.errors[keyError]) : this.controlErrorMessages['default']();
  //   }) 