import * as React from 'react';
import { ISliderSpeedControlProps } from './ISliderSppedControlProps';

export interface ISliderSpeedControlState{
    selectedSpeed: number;
}

export default class SliderSpeedControl extends React.Component<ISliderSpeedControlProps, ISliderSpeedControlState> {
    constructor(props: ISliderSpeedControlProps, state: ISliderSpeedControlState) {
        super(props);
    
        this.state = {
            selectedSpeed: props.selectedSpeed
        };
    }
    
    public render(): JSX.Element{
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'18px'}}>{this.props.label}</p>
                <input type='number' style={{display:'block',width:'45px',margin:'0 0 0 15px',
                                padding:'3px 0 3px 3px',fontSize:'11px',outline:'none',
                                borderRadius:'2px',border:'0.5px solid #888888',paddingLeft:'4px'}}
                                value={this.state.selectedSpeed} min={1000}
                                step={1} onChange={this.onInputChanged.bind(this)}/>
            </div>
        );
    }

    private onInputChanged(ev: Event){
        let elem:HTMLInputElement = ev.target as HTMLInputElement;
        this.setState({selectedSpeed: parseInt(elem.value)});
        if(this.props.onChanged){
            this.props.onChanged(parseInt(elem.value));
        }
    }
}