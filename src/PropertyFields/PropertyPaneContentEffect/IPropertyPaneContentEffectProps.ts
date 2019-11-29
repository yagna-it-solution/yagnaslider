import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
export interface IPropertyPaneContentEffectProps {
    label: string;
    options: IDropdownOption[];
    selectedEffect: string;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    disabled: boolean;
}