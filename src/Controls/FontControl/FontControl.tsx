import * as React from 'react';
import { IFontControlProps, IFontControlOption, IFontControlState } from './IFontControlProps';
import * as jQuery from 'jquery';
import { Spinner } from 'office-ui-fabric-react';
import { SPComponentLoader } from '@microsoft/sp-loader';

export class FontControl extends React.Component<IFontControlProps, IFontControlState> {
    private prevFontUrl: string = '';
    private defaultFonts=[{key:'Arial',text:'Arial'},
                        {key:'Tahoma',text:'Tahoma'},
                        {key:'Verdana',text:'Verdana'},
                        {key:'Helvetica',text:'Helvetica'},
                        {key:'Georgia',text:'Georgia'},
                        {key:'Times New Roman', text:'Times New Roman'}];
    constructor(props: IFontControlProps, state: IFontControlState) {
        super(props);
        this.state={
            selectedFont:props.selectedFont,
            options:[],
            fontLists: [],
            fontLoaded: false
        };
    }

    public render(): JSX.Element {
        if(!this.state.fontLoaded){
            return (
                <div style={{display:'block',width:'100%'}}>
                    <Spinner label='Loading fonts'/>
                </div>
            );
        }
        else{
            return (
                <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',marginTop:'10px'}}>
                    <p style={{display:'block',flexGrow:1,margin:'0 5px 0 0',
                            padding:'0',lineHeight:'16px',fontSize:'11px',
                            color:'#888888'}}>{this.props.label}</p>
                    <select style={{display:'block',width:'88px',border:'0.5px solid #888888',
                            outline:'none',fontSize:'11px',padding:'4px 0',color:'#888888',
                            borderRadius:'2px'}} value={this.state.selectedFont}
                            onChange={this._onSelectChanged.bind(this)}>
                        {this.state.options}
                    </select>
                </div>
            );
        }
    }

    public componentWillMount(){
        this.loadGoogleFontList().then((lists: IFontControlOption[]) => {
            this.loadOptions(lists).then((options: any[]) => {
                this.setState({options: options, fontLists: lists, fontLoaded:true});
                this.setState({selectedFont: this.getFontKey()});
            });
        });
    }

    private _onSelectChanged(ev: React.FormEvent<HTMLInputElement>){
        var elem:HTMLSelectElement=ev.target as HTMLSelectElement;
        var opt:HTMLOptionElement=elem.options[elem.selectedIndex];
        var optParent:HTMLOptGroupElement=opt.parentNode as HTMLOptGroupElement;
        var groupLabel = optParent.label;
        if(this.prevFontUrl && this.prevFontUrl.length !== 0){
            $('link[rel=stylesheet][href~="' + this.prevFontUrl + '"]').remove();
        }

        if(!groupLabel){
            this.setState({selectedFont: opt.value});
            if(this.props.onChanged){
                this.props.onChanged(opt.value);
            }
        }
        else if(groupLabel.toLowerCase()==='system'){
            this.prevFontUrl='';
            this.setState({selectedFont:opt.value});
            if(this.props.onChanged){
                this.props.onChanged(opt.value);
            }
        }
        else if(groupLabel.toLowerCase()==='google'){
            SPComponentLoader.loadCss(opt.value);
            this.prevFontUrl=opt.value;
            var result = this.state.fontLists.filter(obj => {
                return obj.key.trim() == opt.value.trim();
            })[0];
            if(result){
                this.setState({selectedFont: result.key});
                if(this.props.onChanged){
                    this.props.onChanged(result.family);
                }
            }
        }
    }

    private getFontKey(): string{
        if(!this.props.selectedFont) return '';
        var result = this.state.fontLists.filter(obj => {
            return obj.family.trim() == this.props.selectedFont.trim();
        })[0];
        if(result){
            return result.key;
        }
    }

    private loadOptions(fonts:IFontControlOption[]): Promise<any[]> {
        return new Promise<any[]>(
            (resolve: (options: any[]) => void, 
            reject: (error:any) => void) => {
            setTimeout((): void => {  
                var options:any[]=[];
                options.push(<option key='Segoe UI,sans-serif' value='Segoe UI,sans-serif' style={{fontSize:'11px',color:'#888888'}}>{'Default'}</option>);
                options.push(
                    <optgroup style={{fontSize:'11px'}} key='system' label='System'>
                        {
                            this.defaultFonts.map((value, index) => {
                                return (
                                    <option key={value.key} value={value.key} style={{fontSize:'11px',color:'#888888'}}>{value.text}</option>
                                );
                            })
                        }
                    </optgroup>
                );
                options.push(
                    <optgroup style={{fontSize:'11px'}} key='google' label='Google'>
                        {
                            fonts.map((font:IFontControlOption, index:number) => {
                                return (
                                    <option key={font.key} value={font.key} style={{fontSize:'11px',color:'#888888'}}>{font.text}</option>
                                );
                            })
                        }
                    </optgroup>
                );
                resolve(options);
            },500);
        });
    }

    private loadGoogleFontList(): Promise<IFontControlOption[]>{
        return new Promise<IFontControlOption[]>(
            (resolve: (options: IFontControlOption[]) => void, 
            reject: (error) => void) => {
            setTimeout((): void => {
                let options = [];
                jQuery.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCic1SXYMp4NeqNVBxZ7aKZivETzgUYeQ0', 
                (data:any) => {
                    jQuery.each( data.items, (index: number, font) => {
                        if(font['category'].toLowerCase() === 'sans-serif' || font['category'].toLowerCase() === 'serif'){
                            let f: string = font.family.indexOf(' ') > 0 ? font.family.split(' ').join('+') : font.family;
                            let v1 = [];
                            let v2: Array<string> = font.variants;
                            let v3: string = '';
                            for(let jj=0; jj<v2.length; jj++) {
                                let item1 = v2[jj].trim();
                                let item2 = '';
                                if(item1.toLowerCase() === 'regular'){
                                    item2 = '400';
                                }
                                else if(item1.toLowerCase() === 'italic'){
                                    item2 = '400i';
                                }
                                else if(item1.toLowerCase().indexOf('italic')){
                                    item2 = item1.replace('italic', 'i');
                                }
                                else{
                                    item2 = item1;
                                }
                                v1.push(item2);
                            }
                            v3 = v1.join(',');
                            let url = 'https://fonts.googleapis.com/css?family=';
                            url += f + ':' + v3 + '&display=swap';
                            options.push({ 
                                key: url, text: font.family, 
                                family: '\'' + font.family + '\'' + ', sans-serif', 
                                baseFont: font.category, fontWeights: v2 
                            });
                        }
                    });
                }).then((data) => {
                    resolve(options);
                });  
            }, 1000);
        });
    }
}