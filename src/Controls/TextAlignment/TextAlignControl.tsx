import * as React from 'react';
import { ITextAlignControlProps } from './ITextAlignControlProps';

export interface ITextAlignControlState{
    leftAlignBackground:string;
    centerAlignBackground:string;
    rightAlignBackground:string;
    justifyAlignBackground:string;
    leftAlignBorder:string;
    centerAlignBorder:string;
    rightAlignBorder:string;
    justifyAlignBorder:string;
    leftAlignColor:string;
    centerAlignColor:string;
    rightAlignColor:string;
    justifyAlignColor:string;
}

export class TextAlignControl extends React.Component<ITextAlignControlProps, ITextAlignControlState> {
    private selectedKey: React.ReactText;
    constructor(props: ITextAlignControlProps, state: ITextAlignControlState) {
        super(props);
        this.selectedKey = props.selectedKey;
        this.state={
            leftAlignBackground:this.props.selectedKey.toLowerCase()==='left' ? '#a4afb7' : '#ffffff',
            centerAlignBackground:this.props.selectedKey.toLowerCase()==='center' ? '#a4afb7' : '#ffffff',
            rightAlignBackground:this.props.selectedKey.toLowerCase()==='right' ? '#a4afb7' : '#ffffff',
            justifyAlignBackground:this.props.selectedKey.toLowerCase()==='justify' ? '#a4afb7' : '#ffffff',
            leftAlignBorder:this.props.selectedKey.toLowerCase()==='left' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            centerAlignBorder:this.props.selectedKey.toLowerCase()==='center' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            rightAlignBorder:this.props.selectedKey.toLowerCase()==='right' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            justifyAlignBorder:this.props.selectedKey.toLowerCase()==='justify' ? '1px solid #a4afb7' : '0.5px solid #d5dadf',
            leftAlignColor:this.props.selectedKey.toLowerCase()==='left' ? '#ffffff' : '#a4afb7',
            centerAlignColor:this.props.selectedKey.toLowerCase()==='center' ? '#ffffff' : '#a4afb7',
            rightAlignColor:this.props.selectedKey.toLowerCase()==='right' ? '#ffffff' : '#a4afb7',
            justifyAlignColor:this.props.selectedKey.toLowerCase()==='justify' ? '#ffffff' : '#a4afb7',
        };
    }

    public render():JSX.Element{
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',margin:'0',padding:'5px 5px 0 0',marginTop:'15px',boxSizing:'border-box'}}>
                <p style={{display:'block',flexGrow:1,margin:'0',padding:'0',fontSize:'11px',lineHeight:'20px',color:'#888888'}}>{this.props.label}</p>
                <button id='leftAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.leftAlignBorder,backgroundColor:this.state.leftAlignBackground,color:this.state.leftAlignColor}} onClick={this.onLeftAlignButtonClick.bind(this)} title={this.props.leftAlignTitle}>
                    <i className='fa fa-align-left' style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
                <button id='centerAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.centerAlignBorder,backgroundColor:this.state.centerAlignBackground,color:this.state.centerAlignColor}} onClick={this.onCenterAlignButtonClick.bind(this)} title={this.props.centerAlignTitle}>
                    <i className='fa fa-align-center' style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
                <button id='rightAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.rightAlignBorder,backgroundColor:this.state.rightAlignBackground,color:this.state.rightAlignColor}} onClick={this.onRightAlignButtonClick.bind(this)} title={this.props.rightAlignTitle}>
                    <i className='fa fa-align-right' style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
                <button id='justifyAlignButton' type='button' style={{display:'block',width:'20px',height:'20px',margin:'0',padding:'0',outline:'none',border:this.state.justifyAlignBorder,backgroundColor:this.state.justifyAlignBackground,color:this.state.justifyAlignColor}} onClick={this.onJustifyAlignButtonClick.bind(this)} title={this.props.justifyAlignTitle}>
                    <i className='fa fa-align-justify' style={{display:'block',margin:'auto',padding:'0',fontSize:'11px'}}></i>
                </button>
            </div>
        );
    }

    private onChanged(value:string): void {
        this.selectedKey=value;
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
        this.setState({justifyAlignBackground:'#ffffff'});
        this.setState({justifyAlignBorder:'0.5px solid #d5dadf'});
        this.setState({justifyAlignColor:'#a4afb7'});
        this.onChanged('left');
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
        this.setState({justifyAlignBackground:'#ffffff'});
        this.setState({justifyAlignBorder:'0.5px solid #d5dadf'});
        this.setState({justifyAlignColor:'#a4afb7'});
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
        this.setState({justifyAlignBackground:'#ffffff'});
        this.setState({justifyAlignBorder:'0.5px solid #d5dadf'});
        this.setState({justifyAlignColor:'#a4afb7'});
        this.onChanged('right');
    }

    private onJustifyAlignButtonClick(e){
        this.setState({leftAlignBackground:'#ffffff'});
        this.setState({leftAlignBorder:'0.5px solid #d5dadf'});
        this.setState({leftAlignColor:'#a4afb7'});
        this.setState({centerAlignBackground:'#ffffff'});
        this.setState({centerAlignBorder:'0.5px solid #d5dadf'});
        this.setState({centerAlignColor:'#a4afb7'});
        this.setState({rightAlignBackground:'#ffffff'});
        this.setState({rightAlignBorder:'0.5px solid #d5dadf'});
        this.setState({rightAlignColor:'#a4afb7'});
        this.setState({justifyAlignBackground:'#a4afb7'});
        this.setState({justifyAlignBorder:'1px solid #a4afb7'});
        this.setState({justifyAlignColor:'#ffffff'});
        this.onChanged('justify');
    }
}