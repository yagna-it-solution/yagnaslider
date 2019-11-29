import * as React from 'react';
import { IVertAlignControlProps } from './IVertAlignControlProps';
import styles from '../assets/scss/elementorIcons.module.scss';

export interface IVertAlignControlState{
    selectedAlign: string;
}

export class VertAlignControl extends React.Component<IVertAlignControlProps, IVertAlignControlState> {
    constructor(props: IVertAlignControlProps, state: IVertAlignControlState){
        super(props);
        
        this.state={
            selectedAlign: props.selectedAlign
        };
    }

    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'10px 0',padding:'0'}}>
                <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'27px'}}>{this.props.label}</p>
                <input id={'yagnaSlideVertAlignTop' + this.props.sliderId + this.props.sldIndex} type='radio' style={{display:'none',width:'1px',height:'1px',margin:'0',padding:'0'}} checked={this.state.selectedAlign==='top'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onHorizAlignChanged('top'); }}/>
                <label htmlFor={'yagnaSlideVertAlignTop' + this.props.sliderId + this.props.sldIndex} style={{display:'block',
                        width:'43px',height:'27px',border:'1px solid #d5dadf',lineHeight:'27px',
                        textAlign:'center',cursor:'pointer',backgroundColor:this.state.selectedAlign==='top' ? '#d5dadf' : '#ffffff'}} title='Top'>
                    <i className={styles["eicon-v-align-top"]} aria-hidden="true"></i>
                </label>
                <input id={'yagnaSlideVertAlignCenter' + this.props.sliderId + this.props.sldIndex} type='radio' style={{display:'none',width:'1px',height:'1px',margin:'0',padding:'0'}} checked={this.state.selectedAlign==='middle'}  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onHorizAlignChanged('middle'); }}/>
                <label htmlFor={'yagnaSlideVertAlignCenter' + this.props.sliderId + this.props.sldIndex} style={{display:'block',
                        width:'43px',height:'27px',border:'1px solid #d5dadf',lineHeight:'27px',
                        textAlign:'center',cursor:'pointer',backgroundColor:this.state.selectedAlign==='middle' ? '#d5dadf' : '#ffffff'}} title='Middle'>
                    <i className={styles["eicon-v-align-middle"]} aria-hidden="true"></i>
                </label>
                <input id={'yagnaSlideVertAlignBottom' + this.props.sliderId + this.props.sldIndex} type='radio' style={{display:'none',width:'1px',height:'1px',margin:'0',padding:'0'}} checked={this.state.selectedAlign==='bottom'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onHorizAlignChanged('bottom'); }}/>
                <label htmlFor={'yagnaSlideVertAlignBottom' + this.props.sliderId + this.props.sldIndex} style={{display:'block',
                        width:'43px',height:'27px',border:'1px solid #d5dadf',lineHeight:'27px',
                        textAlign:'center',cursor:'pointer',backgroundColor:this.state.selectedAlign==='bottom' ? '#d5dadf' : '#ffffff'}} title='Bottom'>
                    <i className={styles["eicon-v-align-bottom"]} aria-hidden="true"></i>
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