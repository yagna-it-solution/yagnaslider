import * as React from 'react';
import { INavImgControlProps } from './INavImgControlProps';

export interface INavImgControlState{
    selectedKey: string;
    options: any[];
}

export default class NavImgControl extends React.Component<INavImgControlProps, INavImgControlState> {
    constructor(props: INavImgControlProps, state: INavImgControlState) {
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
                    <option key={'arrows_32'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows_32'}>
                        {'arrows_32'}
                    </option>
                    <option key={'arrows-32-32-0'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-32-32-0'}>
                        {'arrows-32-32-0'}
                    </option>
                    <option key={'arrows-32-32-1'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-32-32-1'}>
                        {'arrows-32-32-1'}
                    </option>
                    <option key={'arrows-32-32-2'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-32-32-2'}>
                        {'arrows-32-32-2'}
                    </option>
                    <option key={'arrows-32-32-3'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-32-32-3'}>
                        {'arrows-32-32-3'}
                    </option>
                    <option key={'arrows-32-32-4'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-32-32-4'}>
                        {'arrows-32-32-4'}
                    </option>
                    <option key={'arrows-36-36-0'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-36-36-0'}>
                        {'arrows-36-36-0'}
                    </option>
                    <option key={'arrows-48-48-1'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-48-48-1'}>
                        {'arrows-48-48-1'}
                    </option>
                    <option key={'arrows-48-48-2'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-48-48-2'}>
                        {'arrows-48-48-2'}
                    </option>
                    <option key={'arrows-48-48-3'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-48-48-3'}>
                        {'arrows-48-48-3'}
                    </option>
                    <option key={'arrows-48-48-4'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'arrows-48-48-4'}>
                        {'arrows-48-48-4'}
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