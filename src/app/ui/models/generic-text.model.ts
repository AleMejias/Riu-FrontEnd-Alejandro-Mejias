import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { FormControl } from '@angular/forms';
export interface InputTextConfigModel {

    label: string;
    fontAwesomeIcon: IconDefinition | null;
    iconStyles?: {[key: string] : string};
    placeHolder: string;
    inputId: string; /* Esta propiedad representa la misma key que tendra en los formularios en donde se utilice */
    control: FormControl;
}
