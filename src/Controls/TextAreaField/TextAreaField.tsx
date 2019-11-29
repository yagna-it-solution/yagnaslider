import * as React from 'react';
import { ITextAreaFieldProps, ITextAreaFieldState } from './ITextAreaFieldProps';

export class TextAreaField extends React.Component<ITextAreaFieldProps, ITextAreaFieldState> {
    constructor(props: ITextAreaFieldProps, state: ITextAreaFieldState){
        super(props);
        this.state={
            selectedText: props.selectedText
        };
    }

    public render(): JSX.Element{
        return (
            <textarea 
                style={{display:'block',width:'100%',margin:'0',
                    padding:'2px 0 2px 5px',border:'0.5px solid #888888',
                    outline:'none',fontSize:'11px',resize:'vertical',
                    borderRadius:'2px',minHeight:'55px',color:'#888888',boxSizing:'border-box'}}
                    placeholder={this.props.placeHolder} onChange={this.onTextAreaChanged.bind(this)}
                    value={this.state.selectedText}>
            </textarea>
        );
    }

    private onTextAreaChanged(ev: React.ChangeEvent<HTMLTextAreaElement>){
        this.setState({selectedText: ev.target.value});
        if(this.props.onChanged){
            this.props.onChanged(ev.target.value);
        }
    }
}