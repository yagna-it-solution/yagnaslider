import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
export interface IPropertyPaneNavigationProps {
    label: string;
    options: IDropdownOption[];
    selectedNavigation: string;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    disabled: boolean;
}