import * as React from 'react';
import { IContentEffectControlProps } from './IContentEffectControlProps';

export interface IContentEffectControlState{
    options:any[];
    selectedEffect: string;
}

export default class ContentEffectControl extends React.Component<IContentEffectControlProps, IContentEffectControlState> {
    constructor(props: IContentEffectControlProps, state: IContentEffectControlState) {
        super(props);
    
        this.state = {
            options: [],
            selectedEffect: props.selectedEffect
        };
    }
    
    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',margin:'0',padding:'0',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,padding:'0 10px 0 0',margin:'0',lineHeight:'18px',fontSize:'11px',color:'#888888'}}>{this.props.label}</p>
                <select id='yagnaDropDownSelect' value={this.state.selectedEffect} 
                    onChange={this.onDropDownSelected.bind(this)}
                    style={{display:'block',minWidth:'88px',margin:'0',padding:'3px 0',
                            fontSize:'11px',border:'0.5px solid #888888',outline:'none',
                            color:'#888888',borderRadius:'2px'}}>
                    {this.state.options}
                </select>
            </div>
        );
    }

    public componentDidMount(){
        this.loadOptions();
    }

    private onDropDownSelected(e:Event){
        let elem:HTMLSelectElement = e.target as HTMLSelectElement;
        this.setState({selectedEffect: elem.value});
        if(this.props.onChanged){
            this.props.onChanged(elem.value);
        }
    }

    private loadOptions():void{
        const options:any[]=[];
        if(this.props.options && !this.props.disabled){            
            for(var jj=0; jj<this.props.options.length; jj++){
                options.push(
                    <option 
                        key={this.props.options[jj].key} 
                        style={{display:'block',fontSize:'11px',color:'#888888'}}
                        value={this.props.options[jj].key}>{this.props.options[jj].text}</option>
                );
            }
            this.setState({options:options});
        }
    }
}