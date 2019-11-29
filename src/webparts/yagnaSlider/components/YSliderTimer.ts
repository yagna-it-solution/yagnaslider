import * as React from 'react';

export class YSliderTimer{
    private timerInstance = this;
    private timeout: number;
    private updateinterval: number = 50;
    private updateTimerId = null;
    private runningTime: number = 0;
    private paused: boolean = false;
    private started: boolean = false;
    private startedandpaused: boolean = false;
    private callback: Function;
    private updatecallback: Function;
    constructor(interval: number, callback: Function, updatecallback: Function){
        this.timeout=interval;
        this.callback=callback;
        this.updatecallback=updatecallback;
    }
    public pause() {
        if (this.started) {
            this.paused = true;
            clearInterval(this.updateTimerId);
        }
    }
    public resume(forceresume: boolean){
        if (this.startedandpaused && !forceresume) return;
        this.startedandpaused = false;
        if (this.started && this.paused) {
            this.paused = false;
            this.updateTimerId = setInterval(() => {
                this.runningTime += this.updateinterval;
                if (this.runningTime > this.timerInstance.timeout) {
                    clearInterval(this.updateTimerId);
                    if (this.callback) this.callback();
                }
                if (this.updatecallback) this.updatecallback(this.runningTime / this.timeout);
            }, this.updateinterval);
        }
    }
    public stop() {
        clearInterval(this.updateTimerId);
        if (this.updatecallback) this.updatecallback(-1);
        this.runningTime = 0;
        this.paused = false;
        this.started = false;
    }
    public start() {
        this.runningTime = 0;
        this.paused = false;
        this.started = true;
        this.updateTimerId = setInterval(() => {
            this.runningTime += this.updateinterval;
            if (this.runningTime > this.timeout) {
                clearInterval(this.updateTimerId);
                if (this.callback) this.callback();
            }
            if (this.updatecallback) this.updatecallback(this.runningTime / this.timeout);
        }, this.updateinterval);
    }
    public startandpause() {
        this.runningTime = 0;
        this.paused = true;
        this.started = true;
        this.startedandpaused = true;
    }
    public unsetstartandpause() {
        this.startedandpaused = false;
    }
}