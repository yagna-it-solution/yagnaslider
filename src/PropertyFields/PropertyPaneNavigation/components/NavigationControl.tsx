import * as React from 'react';
import { INavigationControlProps } from './INavigationControlProps';

export interface INavigationControlState{
    options:any[];
    selectedNavigation: string;
}

export default class NavigationControl extends React.Component<INavigationControlProps, INavigationControlState> {
    constructor(props: INavigationControlProps, state: INavigationControlState) {
        super(props);
    
        this.state = {
            options: [],
            selectedNavigation: props.selectedNavigation
        };
    }
    
    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',margin:'0',padding:'0',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,padding:'0 10px 0 0',margin:'0',lineHeight:'18px',fontSize:'11px',color:'#888888'}}>{this.props.label}</p>
                <select id='yagnaDropDownSelect' value={this.state.selectedNavigation} 
                    onChange={this.onDropDownSelected.bind(this)}
                    style={{display:'block',minWidth:'88px',margin:'0',padding:'2px 0',
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
        this.setState({selectedNavigation: elem.value});
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