export interface IPropertyPaneBulletImgProps{
    label: string;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    selectedKey: string;    
}