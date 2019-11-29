import * as React from 'react';
import { IShowTimerControlProps } from './IShowTimerControlProps';
import styles from './ShowTimerControl.module.scss';

export interface IShowTimerControlState{
    selectedKey: boolean;
}

export default class ShowTimerControl extends React.Component<IShowTimerControlProps, IShowTimerControlState> {
    constructor(props: IShowTimerControlProps, state: IShowTimerControlState) {
        super(props);
        this.state = {
            selectedKey: props.selectedKey
        };
    }
    
    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,padding:'0',margin:'0',lineHeight:'22px',fontSize:'11px',color:'#888888'}}>{this.props.label}</p>
                <label className={styles.switch}>
                    <input className={styles.switchInput} type="checkbox" checked={this.state.selectedKey} onChange={this.onSwichChanged.bind(this)}/>
                    <span className={styles.switchLabel} data-on={"On"} data-off="Off"></span>
                    <span className={styles.switchHandle}></span>
		        </label>
            </div>
        );
    }

    private onSwichChanged(ev: Event){
        let elem:HTMLInputElement=ev.target as HTMLInputElement;
        this.setState({selectedKey: elem.checked});
        if(this.props.onChanged){
            this.props.onChanged(elem.checked);
        }
    }
}