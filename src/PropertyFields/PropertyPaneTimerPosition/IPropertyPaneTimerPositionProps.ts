export interface IPropertyPaneTimerPositionProps{
    label: string;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    selectedKey: string;    
}