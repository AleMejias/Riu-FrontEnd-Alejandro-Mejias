import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { FormControl } from '@angular/forms';
export interface InputTextConfigModel {

    label: string;
    fontAwesomeIcon: IconDefinition | null;
    iconStyles?: {[key: string] : string};
    placeHolder: string;
    inputId: string;
    control: FormControl;
}
