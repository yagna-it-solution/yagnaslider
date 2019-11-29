import * as React from 'react';
import { ILinkFieldProps, ILinkFieldState  } from './ILinkFieldProps';

export class LinkField extends React.Component<ILinkFieldProps, ILinkFieldState> {
    constructor(props: ILinkFieldProps, state: ILinkFieldState){
        super(props);
        this.state={
            selectedLink: props.selectedLink,
            openNewWindow: props.openNewWindow,
            addNoFollow: props.addNoFollow,
            isDropDownOpen: false
        };
    }

    public render(): JSX.Element{
        return (
            <div style={{display:'block',width:'100%',margin:'0',padding:'0',marginBottom:'10px'}}>
                <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%'}}>
                    <input type='url' placeholder={this.props.placeHolder} value={this.state.selectedLink}
                            style={{display:'block',flexGrow:1,border:'0.5px solid #888888',outline:'none',
                            fontSize:'11px',color:'#888888',margin:'0',padding:'3px 0 3px 3px'}}
                            onChange={this._onTextChanged.bind(this)}/>
                    <i className='fa fa-gear' style={{fontSize:'11px',padding:'2px 6px',border:'none',outline:'none',
                            borderTop:'0.5px solid #888888',borderRight:'0.5px solid #888888',
                            borderBottom:'0.5px solid #888888',lineHeight:'19px',cursor:'pointer'}}
                            onClick={this.onDropDownOpenClicked.bind(this)}></i>
                </div>
                <div style={{display:this.state.isDropDownOpen ? 'block' : 'none',width:'100%',margin:'5px 0 0 5px',padding:'0',boxSizing:'border-box'}}>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%'}}>
                        <input type='checkbox' checked={this.state.openNewWindow} style={{display:'block',margin:'3px 0',padding:'2px 0',
                                fontSize:'10px',color:'#888888'}} onChange={this._onNewWindowChecked.bind(this)}/>
                        <p style={{fontSize:'11px',color:'#888888',padding:'0',margin:'0',lineHeight:'16px'}}>{'Open in new window'}</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%'}}>
                        <input type='checkbox' checked={this.state.openNewWindow} style={{display:'block',margin:'3px 0',padding:'2px 0',
                                fontSize:'10px',color:'#888888'}} onChange={this._onNoFollowChecked.bind(this)}/>
                        <p style={{fontSize:'11px',color:'#888888',padding:'0',margin:'0',lineHeight:'16px'}}>{'Add nofollow'}</p>
                    </div>
                </div>
            </div>
        );
    }

    private _onTextChanged(ev: React.ChangeEvent<HTMLInputElement>){
        this.setState({selectedLink: ev.target.value});
        if(this.props.onChanged){
            this.props.onChanged(ev.target.value, this.state.openNewWindow, this.state.addNoFollow);
        }
    }

    private onDropDownOpenClicked(ev: React.MouseEvent<HTMLElement, MouseEvent>){
        var isDropDownOpen: boolean=this.state.isDropDownOpen;
        isDropDownOpen=!isDropDownOpen;
        this.setState({isDropDownOpen: isDropDownOpen});
    }

    private _onNewWindowChecked(ev: React.ChangeEvent<HTMLInputElement>){
        this.setState({openNewWindow: ev.target.checked});
        console.log(ev.target.checked);
        if(this.props.onChanged){
            this.props.onChanged(this.state.selectedLink, ev.target.checked, this.state.addNoFollow);
        }
    }

    private _onNoFollowChecked(ev: React.ChangeEvent<HTMLInputElement>){
        this.setState({addNoFollow: ev.target.checked});
        if(this.props.onChanged){
            this.props.onChanged(this.state.selectedLink, this.state.addNoFollow, ev.target.checked);
        }
    }
}