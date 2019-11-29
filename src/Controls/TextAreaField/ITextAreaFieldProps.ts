export interface ITextAreaFieldProps{
    selectedText: string;
    placeHolder: string;
    onChanged: (value: string) => void;
}

export interface ITextAreaFieldState{
    selectedText: string;
}