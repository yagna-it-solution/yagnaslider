import * as $ from 'jquery';

export class AppUpdater {
    private Key_id: number;
    private key_type: string;
    private key_serial: string;
    private reg_date: Date;
    private reg_site: string;
    private reg_expire: number;
    private reg_status: string;

    constructor(){
        this.Key_id     = 0;
        this.key_type   = "dummy";
        this.key_serial = "";
        this.reg_date   = new Date(new Date().toLocaleString());
        this.reg_expire = 30;
        this.reg_site   = window.location.origin;
        this.reg_status = "Active";
        this.getUpdatedDummyKey();
    }

    private getUpdatedDummyKey(){
        $.post('https://yagnaitsolution.com/sharepoint/class-api-key-checker.php', 
            { 'type_action': 'get-request-dummy', 'site_url': this.reg_site, 'cur_date': new Date().toLocaleString() }, 
            (res: any, sts, jQXR) => {
                if( res ){
                    var data = JSON.parse(res);
                    this.Key_id = data.Key_id;
                    this.key_type = data.key_type;
                    this.key_serial = data.key_serial;
                    this.reg_date   = data.reg_date;
                    this.reg_expire = data.reg_expire;
                    this.reg_status = data.status;
                }
                else{
                    console.log(sts);
                    console.log(jQXR);
                }
            }
        );
    }

    public getAppId(){
        return this.Key_id;
    }

    public getAppKey(){
        return this.key_serial;
    }

    public getAppDate(){
        return this.reg_date;
    }

    public getAppType(){
        return this.key_type;
    }

    public getAppStatus(){
        return this.reg_status;
    }
}