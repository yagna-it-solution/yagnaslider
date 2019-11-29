export interface IVertAlignControlProps{
    label: string;
    sliderId: string;
    sldIndex: number;
    selectedAlign: string;
    onChanged?: (align: string) => void;
}