import * as React from 'react';
import { ITextFieldProps, ITextFieldState } from './ITextFieldProps';

export class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
    constructor(props: ITextFieldProps, state: ITextFieldState){
        super(props);
        this.state={
            selectedText: props.selectedText
        };
    }

    public render(): JSX.Element{
        return (
            <input type='text' value={this.state.selectedText} style={{display:'block',
                fontSize:'11px',color:'#888888',border:'0.5px solid #888888',outline:'none',
                margin:'0',padding:'3px 0 3px 3px',borderRadius:'2px',
                width:this.props.width}}
                placeholder={this.props.placeHolder} onChange={this._onTextChanged.bind(this)}/>
        );
    }

    private _onTextChanged(ev: React.ChangeEvent<HTMLInputElement>){
        this.setState({selectedText: ev.target.value});
        if(this.props.onChanged){
            this.props.onChanged(ev.target.value);
        }
    }
}