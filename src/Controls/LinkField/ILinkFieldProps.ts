export interface ILinkFieldProps{
    selectedLink: string;
    openNewWindow: boolean;
    addNoFollow: boolean;
    placeHolder: string;
    onChanged: (link: string, openNewWindow: boolean, addNoFollow: boolean) => void;
}

export interface ILinkFieldState{
    selectedLink: string;
    openNewWindow: boolean;
    addNoFollow: boolean;
    isDropDownOpen: boolean;
}