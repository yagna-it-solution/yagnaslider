export interface IPropertyPaneSliderHeightProps{
    label: string;
    selectedHeight: number;
    onPropertyChange: (propertyPath: string, newValue: number) => void;
    disabled: boolean;
}