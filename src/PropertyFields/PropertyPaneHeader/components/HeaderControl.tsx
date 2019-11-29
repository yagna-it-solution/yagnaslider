import * as React from 'react';
import { IHeaderControlProps } from './IHeaderControlProps';

export default class HeaderControl extends React.Component<IHeaderControlProps, {}> {
    constructor(props:IHeaderControlProps, state:{}){
        super(props);
    }

    public render():JSX.Element{
        return (
            <div style={{display:'block',width:'100%',margin:'0',padding:'4px 0',backgroundColor:this.props.backgroundColor,textAlign:'center',boxSizing:'border-box'}}>
                <p style={{display:'block',fontWeight:'bold',margin:'auto',padding:'2px 0',color:this.props.foreColor,lineHeight:'12px',fontSize:'12px',userSelect:'none'}}>{this.props.label}</p>
            </div>
        );
    }
}