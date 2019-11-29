export interface ITextFieldProps{
    selectedText: string;
    placeHolder: string;
    onChanged: (value: string) => void;
    width?: string;
}

export interface ITextFieldState{
    selectedText: string;
}