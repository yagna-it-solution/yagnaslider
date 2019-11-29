import * as React from 'react';
import { IBulletImgControlProps } from './IBulletImgControlProps';

export interface IBulletImgControlState{
    selectedKey: string;
    options: any[];
}

export default class BulletImgControl extends React.Component<IBulletImgControlProps, IBulletImgControlState> {
    constructor(props: IBulletImgControlProps, state: IBulletImgControlState) {
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
                    <option key={'bullet_24'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet_24'}>
                        {'bullet_24'}
                    </option>
                    <option key={'bullet-24-24-0'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-0'}>
                        {'bullet-24-24-0'}
                    </option>
                    <option key={'bullet-24-24-1'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-1'}>
                        {'bullet-24-24-1'}
                    </option>
                    <option key={'bullet-24-24-2'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-2'}>
                        {'bullet-24-24-2'}
                    </option>
                    <option key={'bullet-24-24-3'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-3'}>
                        {'bullet-24-24-3'}
                    </option>
                    <option key={'bullet-24-24-4'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-4'}>
                        {'bullet-24-24-4'}
                    </option>
                    <option key={'bullet-24-24-5'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-5'}>
                        {'bullet-24-24-5'}
                    </option>
                    <option key={'bullet-24-24-6'} style={{display:'block',fontSize:'11px',color:'#888888'}} value={'bullet-24-24-6'}>
                        {'bullet-24-24-6'}
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