export interface IPropertyPaneSliderSpeedProps{
    label: string;
    selectedSpeed: number;
    onPropertyChange: (propertyPath: string, newValue: number) => void;
    disabled: boolean;
}