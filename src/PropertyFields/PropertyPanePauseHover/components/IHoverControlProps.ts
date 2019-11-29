export interface IHoverControlProps{
    label: string;
    selectedKey: boolean;
    onChanged: (value: boolean) => void;
    disabled: boolean;
}