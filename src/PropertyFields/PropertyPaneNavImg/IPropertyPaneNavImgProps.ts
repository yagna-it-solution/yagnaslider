import { IDropdownOption } from 'office-ui-fabric-react';

export interface IPropertyPaneNavImgProps{
    label: string;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    selectedKey: string;    
}