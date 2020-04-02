/* eslint-disable no-console */

import { LightningElement,track,api } from 'lwc';

// import apex_generateRecords from '@salesforce/apex/BadBunchController.generateRecords';
import apex_generateJSONRecords from '@salesforce/apex/BadBunchController.generateJSONRecords';

const MIN_NUM_RECORDS = 5000;
const MAX_NUM_RECORDS = 10000;

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
    let resultPromise;

    try {
      const size = this.generateRandomNumber(MIN_NUM_RECORDS, MAX_NUM_RECORDS);
      const start = performance.now();

      const results = await apex_generateJSONRecords({size});
      const list = await JSON.parse(results);

      // eslint-disable-next-line no-console
      console.log(`do something with ${list.length} records...`);
      
      // const responseData = await apex_generateRecords(size);
      // await fetch(`api/v1/wait/${this.generateRandomNumber(5000, 10000)}` );
      // return (await responseData.json()).length;

      const end = performance.now();
      const duration = (end - start).toFixed();

      resultPromise = Promise.resolve(duration);
    } catch (error) {
      console.error(JSON.stringify(error));
      this.error = error;

      resultPromise = Promise.reject(error);
    }

    return resultPromise;
  }
}