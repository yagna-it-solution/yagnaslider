import * as React from 'react';
import { ITimerPosControlProps } from './ITimerPosControlProps';

export interface ITimerPosControlState{
    selectedKey: string;
    options: any[];
}

export default class TimerPosControl extends React.Component<ITimerPosControlProps, ITimerPosControlState> {
    constructor(props: ITimerPosControlProps, state: ITimerPosControlState) {
        super(props);
    
        this.state = {
            selectedKey: props.selectedKey,
            options: []
        };
    }
    
    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',margin:'0',padding:'0',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,padding:'0 10px 0 0',margin:'0',lineHeight:'18px',fontSize:'11px',color:'#888888'}}>{this.props.label}</p>
                <select id='yagnaDropDownSelect' value={this.state.selectedKey} onChange={this.onDropDownSelected.bind(this)}
                            style={{display:'block',minWidth:'88px',margin:'0',padding:'3px 0',
                            fontSize:'11px',border:'0.5px solid #888888',outline:'none',
                            color:'#888888',borderRadius:'2px'}}>
                    <option key={'topleft'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'topleft'}>
                        {'Top Left'}
                    </option>
                    <option key={'topcenter'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'topcenter'}>
                        {'Top Center'}
                    </option>
                    <option key={'topright'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'topright'}>
                        {'Top Right'}
                    </option>
                    <option key={'bottomleft'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bottomleft'}>
                        {'Bottom Left'}
                    </option>
                    <option key={'bottomcenter'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bottomcenter'}>
                        {'Bottom Center'}
                    </option>
                    <option key={'bottomright'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bottomright'}>
                        {'Bottom Right'}
                    </option>
                </select>
            </div>
        );
    }

    private onDropDownSelected(e:Event){
        let elem:HTMLSelectElement = e.target as HTMLSelectElement;
        this.setState({selectedKey: elem.value});
        if(this.props.onChanged){
            this.props.onChanged(elem.value);
        }
    }
}