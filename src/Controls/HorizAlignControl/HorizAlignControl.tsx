import * as React from 'react';
import { IHorizAlignControlProps } from './IHorizAlignControlProps';
import styles from '../assets/scss/elementorIcons.module.scss';

export interface IHorizAlignControlState{
    selectedAlign: string;
}

export class HorizAlignControl extends React.Component<IHorizAlignControlProps, IHorizAlignControlState> {
    constructor(props: IHorizAlignControlProps, state: IHorizAlignControlState){
        super(props);
        
        this.state={
            selectedAlign: props.selectedAlign
        };
    }

    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'10px 0',padding:'0'}}>
                <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'27px'}}>{this.props.label}</p>
                <input id={'yagnaSlideHorizAlignLeft' + this.props.sliderId + this.props.sldIndex} type='radio' style={{display:'none',width:'1px',height:'1px',margin:'0',padding:'0'}} checked={this.state.selectedAlign==='left'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onHorizAlignChanged('left'); }}/>
                <label htmlFor={'yagnaSlideHorizAlignLeft' + this.props.sliderId + this.props.sldIndex} style={{display:'block',
                        width:'43px',height:'27px',border:'1px solid #d5dadf',lineHeight:'27px',
                        textAlign:'center',cursor:'pointer',backgroundColor:this.state.selectedAlign==='left' ? '#d5dadf' : '#ffffff'}} title='Left'>
                    <i className={styles["eicon-h-align-left"]} aria-hidden="true"></i>
                </label>
                <input id={'yagnaSlideHorizAlignCenter' + this.props.sliderId + this.props.sldIndex} type='radio' style={{display:'none',width:'1px',height:'1px',margin:'0',padding:'0'}} checked={this.state.selectedAlign==='center'}  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onHorizAlignChanged('center'); }}/>
                <label htmlFor={'yagnaSlideHorizAlignCenter' + this.props.sliderId + this.props.sldIndex} style={{display:'block',
                        width:'43px',height:'27px',border:'1px solid #d5dadf',lineHeight:'27px',
                        textAlign:'center',cursor:'pointer',backgroundColor:this.state.selectedAlign==='center' ? '#d5dadf' : '#ffffff'}} title='Center'>
                    <i className={styles["eicon-h-align-center"]} aria-hidden="true"></i>
                </label>
                <input id={'yagnaSlideHorizAlignRight' + this.props.sliderId + this.props.sldIndex} type='radio' style={{display:'none',width:'1px',height:'1px',margin:'0',padding:'0'}} checked={this.state.selectedAlign==='right'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onHorizAlignChanged('right'); }}/>
                <label htmlFor={'yagnaSlideHorizAlignRight' + this.props.sliderId + this.props.sldIndex} style={{display:'block',
                        width:'43px',height:'27px',border:'1px solid #d5dadf',lineHeight:'27px',
                        textAlign:'center',cursor:'pointer',backgroundColor:this.state.selectedAlign==='right' ? '#d5dadf' : '#ffffff'}} title='Right'>
                    <i className={styles["eicon-h-align-right"]} aria-hidden="true"></i>
                </label>
            </div>
        );
    }

    private _onHorizAlignChanged(align: string){
        this.setState({selectedAlign: align});
        if(this.props.onChanged){
            this.props.onChanged(align);
        }
    }
}