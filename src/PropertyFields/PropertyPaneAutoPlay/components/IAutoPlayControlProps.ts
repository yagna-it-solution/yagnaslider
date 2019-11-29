export interface IAutoPlayControlProps{
    label: string;
    selectedKey: boolean;
    onChanged: (value: boolean) => void;
    disabled: boolean;
}