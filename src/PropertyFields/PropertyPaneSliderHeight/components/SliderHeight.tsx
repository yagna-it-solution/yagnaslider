import * as React from 'react';
import { ISliderHeightProps } from './ISliderHeightProps';

export interface ISliderHeightState{
    selectedHeight: number;
}

export default class SliderHeight extends React.Component<ISliderHeightProps, ISliderHeightState> {
    constructor(props: ISliderHeightProps, state: ISliderHeightState) {
        super(props);
    
        this.state = {
            selectedHeight: props.selectedHeight
        };
    }
    
    public render(): JSX.Element{
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'18px'}}>{this.props.label}</p>
                <input type='number' style={{display:'block',width:'45px',margin:'0 0 0 15px',
                                padding:'3px 0 3px 3px',fontSize:'11px',outline:'none',
                                borderRadius:'2px',border:'0.5px solid #888888',paddingLeft:'4px'}}
                                value={this.state.selectedHeight} min={100}
                                step={1} onChange={this.onInputChanged.bind(this)}/>
            </div>
        );
    }

    private onInputChanged(ev: Event){
        let elem:HTMLInputElement = ev.target as HTMLInputElement;
        this.setState({selectedHeight: parseInt(elem.value)});
        if(this.props.onChanged){
            this.props.onChanged(parseInt(elem.value));
        }
    }
}