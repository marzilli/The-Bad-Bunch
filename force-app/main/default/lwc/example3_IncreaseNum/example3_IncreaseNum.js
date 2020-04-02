import { LightningElement,track,api } from 'lwc';

export default class Example3_IncreaseNum extends LightningElement {
    @track numberCount;
    @track resultWaitTime;
    numberCount =0;
    resultWaitTime='';
    buttonIsDisabled = false;
    isFetching = false;
    totalWaitTime = 0;

    async increaseNum(event) {
        event.stopPropagation();
        this.resultWaitTime = '';
        this.isFetching = true;
        this.buttonIsDisabled = true;
        const waitTime = await this.longAsyncFetch();
        this.isFetching = false;
        this.buttonIsDisabled = false;
        
        
        if (waitTime) {
            totalWaitTime += waitTime;
            this.resultWaitTime = ` You just waited for ~${waitTime} ( ~${totalWaitTime} in total)`;
          }
      
          this.numberCount++;
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async longAsyncFetch() {
        try {
          const responseData = await fetch(`api/v1/wait/${this.generateRandomNumber(5000, 10000)}` );
          return (await responseData.json()).waitTime;
        } catch (error) {
            console.debug(error.message);
        }
    
        return Promise.resolve();
      }
}