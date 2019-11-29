export interface IPropertyPaneAutoPlayProps{
    label: string;
    selectedKey: boolean;
    onPropertyChange: (propertyPath: string, newValue: boolean) => void;
    disabled: boolean;
}