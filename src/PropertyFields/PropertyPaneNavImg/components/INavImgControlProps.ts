import { IDropdownOption } from 'office-ui-fabric-react';

export interface INavImgControlProps{
    label: string;
    onChanged: (navImg: string) => void;
    selectedKey: string;    
}