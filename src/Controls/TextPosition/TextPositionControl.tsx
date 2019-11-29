import * as React from 'react';
import { getIconClassName } from '@uifabric/styling';
import { ITextPositionControlProps, ITextPositionControlState } from './ITextPositionControlProps';

export class TextPositionControl extends React.Component<ITextPositionControlProps, ITextPositionControlState>{
    constructor(props: ITextPositionControlProps, state: ITextPositionControlState){
        super(props);

        this.state={
            leftAlignBackground:this.props.selectedAlign.toLowerCase()==='top' ? '#a4afb7' : '#ffffff',
            centerAlignBackground:this.props.selectedAlign.toLowerCase()==='center' ? '#a4afb7' : '#ffffff',
            rightAlignBackground:this.props.selectedAlign.toLowerCase()==='bottom' ? '#a4afb7' : '#ffffff',
            leftAlignBorder:this.props.selectedAlign.toLowerCase()==='top' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            centerAlignBorder:this.props.selectedAlign.toLowerCase()==='center' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            rightAlignBorder:this.props.selectedAlign.toLowerCase()==='bottom' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            leftAlignColor:this.props.selectedAlign.toLowerCase()==='top' ? '#ffffff' : '#a4afb7',
            centerAlignColor:this.props.selectedAlign.toLowerCase()==='center' ? '#ffffff' : '#a4afb7',
            rightAlignColor:this.props.selectedAlign.toLowerCase()==='bottom' ? '#ffffff' : '#a4afb7',
            selectedAlign: props.selectedAlign
        };
    }

    public render(): JSX.Element{
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',margin:'0',padding:'0',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,margin:'0',padding:'0',fontSize:'11px',lineHeight:'20px',}}>{this.props.label}</p>
                <button id='leftAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.leftAlignBorder,backgroundColor:this.state.leftAlignBackground,color:this.state.leftAlignColor}} onClick={this.onLeftAlignButtonClick.bind(this)} title={this.props.topAlignTitle}>
                    <i className={getIconClassName('AlignVerticalTop')} style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
                <button id='centerAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.centerAlignBorder,backgroundColor:this.state.centerAlignBackground,color:this.state.centerAlignColor}} onClick={this.onCenterAlignButtonClick.bind(this)} title={this.props.centerAlignTitle}>
                    <i className={getIconClassName('AlignVerticalCenter')} style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
                <button id='rightAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.rightAlignBorder,backgroundColor:this.state.rightAlignBackground,color:this.state.rightAlignColor}} onClick={this.onRightAlignButtonClick.bind(this)} title={this.props.bottomAlignTitle}>
                    <i className={getIconClassName('AlignVerticalBottom')} style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
            </div>
        );
    }

    private onChanged(value:string): void {
        this.setState({selectedAlign: value});
        if(this.props.onChanged){
            this.props.onChanged(value);
        }
    }

    private onLeftAlignButtonClick(e){
        this.setState({leftAlignBackground:'#a4afb7'});
        this.setState({leftAlignBorder:'1px solid #a4afb7'});
        this.setState({leftAlignColor:'#ffffff'});
        this.setState({centerAlignBackground:'#ffffff'});
        this.setState({centerAlignBorder:'0.5px solid #d5dadf'});
        this.setState({centerAlignColor:'#a4afb7'});
        this.setState({rightAlignBackground:'#ffffff'});
        this.setState({rightAlignBorder:'0.5px solid #d5dadf'});
        this.setState({rightAlignColor:'#a4afb7'});
        this.onChanged('top');
    }

    private onCenterAlignButtonClick(e){
        this.setState({leftAlignBackground:'#ffffff'});
        this.setState({leftAlignBorder:'0.5px solid #d5dadf'});
        this.setState({leftAlignColor:'#a4afb7'});
        this.setState({centerAlignBackground:'#a4afb7'});
        this.setState({centerAlignBorder:'1px solid #a4afb7'});
        this.setState({centerAlignColor:'#ffffff'});
        this.setState({rightAlignBackground:'#ffffff'});
        this.setState({rightAlignBorder:'0.5px solid #d5dadf'});
        this.setState({rightAlignColor:'#a4afb7'});
        this.onChanged('center');
    }

    private onRightAlignButtonClick(e){
        this.setState({leftAlignBackground:'#ffffff'});
        this.setState({leftAlignBorder:'0.5px solid #d5dadf'});
        this.setState({leftAlignColor:'#a4afb7'});
        this.setState({centerAlignBackground:'#ffffff'});
        this.setState({centerAlignBorder:'0.5px solid #d5dadf'});
        this.setState({centerAlignColor:'#a4afb7'});
        this.setState({rightAlignBackground:'#a4afb7'});
        this.setState({rightAlignBorder:'1px solid #a4afb7'});
        this.setState({rightAlignColor:'#ffffff'});
        this.onChanged('bottom');
    }
}