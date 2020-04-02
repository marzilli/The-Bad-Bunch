import { LightningElement,track,api } from 'lwc';

import apex_generateRecords from '@salesforce/apex/BadBunchController.generateRecords';

/**
 * Default message to provide
 * @type {String}
 */
const ERROR_DEFAULT = 'An error occurred';

export default class Example3_IncreaseNum extends LightningElement {
    @track numberCount;
    @track resultWaitTime;
    @track error;

    numberCount =0;
    resultWaitTime='';
    buttonIsDisabled = false;
    isFetching = false;
    totalWaitTime = 0;

    async increaseNum(event) {
        event.stopPropagation();

        this.error = null;

        this.resultWaitTime = '';
        this.isFetching = true;
        this.buttonIsDisabled = true;
        const waitTime = await this.longAsyncFetch();
        this.isFetching = false;
        this.buttonIsDisabled = false;
        
        if (waitTime) {
            this.totalWaitTime += waitTime;
            this.resultWaitTime = ` You just waited for ~${waitTime} ( ~${this.totalWaitTime} in total)`;
          }
      
          this.numberCount++;
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async longAsyncFetch() {
        try {
          debugger;
          const size = this.generateRandomNumber(5000, 10000);
          const responseData = await apex_generateRecords(size);
          // await fetch(`api/v1/wait/${this.generateRandomNumber(5000, 10000)}` );
          return (await responseData.json()).length;
        } catch (error) {
            console.debug;
            console.error(JSON.stringify(error));
            this.error = error;
        }
    
        return Promise.resolve();
      }
}