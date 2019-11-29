export interface IPropertyPaneShowTimerProps{
    label: string;
    selectedKey: boolean;
    onPropertyChange: (propertyPath: string, newValue: boolean) => void;
    disabled: boolean;
}