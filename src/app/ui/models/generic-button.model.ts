import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface GenericButtonConfigModel<T> {

    butttonId: string;
    label: string;
    title: string;
    fontAwesomeIcon: IconDefinition | null;
    labelPosition: 'before' | 'after';
    content: T | null;
    iconsStyles?: {[key: string] : number | string};
    width?: string;
    buttonPadding?:string; // Con esta propiedad seteamos su ancho y largo
    buttonCursor?: string;
    buttonBackground?: string;
    labelFontSize?: string;
    labelColor?: string;
    labelFontWeight?: string;
    iconFontSize?: string;
    iconColor?: string;
    iconFontWeight?: string;  
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
}