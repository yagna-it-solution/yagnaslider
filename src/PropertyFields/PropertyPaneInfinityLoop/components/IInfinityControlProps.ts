export interface IInfinityControlProps{
    label: string;
    selectedKey: boolean;
    onChanged: (value: boolean) => void;
    disabled: boolean;    
}