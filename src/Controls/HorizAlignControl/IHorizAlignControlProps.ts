export interface IHorizAlignControlProps{
    label: string;
    sliderId: string;
    sldIndex: number;
    selectedAlign: string;
    onChanged?: (align: string) => void;
}