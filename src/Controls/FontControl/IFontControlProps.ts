import { IDropdownOption } from 'office-ui-fabric-react';

export interface IFontControlProps{
    label: string;
    selectedFont: string;
    onChanged: (fontName: string) => void;
    disabled: boolean;
}

export interface IFontControlOption extends IDropdownOption{
    key: string;
    text: string;
    family: string;
    baseFont: string;
    fontWeights: Array<string>;
}

export interface IFontControlState{
    selectedFont: string;
    options: any[];
    fontLists: IFontControlOption[];
    fontLoaded: boolean;
}