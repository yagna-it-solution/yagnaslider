import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
export interface IPropertyPaneSliderEffectProps {
    label: string;
    options: IDropdownOption[];
    selectedEffect: string;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    disabled: boolean;
}