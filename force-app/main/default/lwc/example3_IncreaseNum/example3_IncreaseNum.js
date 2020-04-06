/* eslint-disable no-console */

import { LightningElement,track,api } from 'lwc';

import apex_generateJSONRecords from '@salesforce/apex/BadBunchController.generateJSONRecords';

const MIN_NUM_RECORDS = 25000;
const MAX_NUM_RECORDS = 75000;

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
    this.isFetching = true;
    this.buttonIsDisabled = true;
    const waitTime = await this.longAsyncFetch();
    this.isFetching = false;
    this.buttonIsDisabled = false;
    
    if (waitTime) {
      this.totalWaitTime += waitTime;
      this.resultWaitTime = ` You just waited for ~${waitTime} seconds ( ~${this.totalWaitTime} in total)`;
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
 
      const end = performance.now();
      const duration = Math.floor(((end - start).toFixed())/1000);

      resultPromise = Promise.resolve(duration);
    } catch (error) {
      console.error(JSON.stringify(error));
      this.error = error;
      resultPromise = Promise.reject(error);
    }
    return resultPromise;
  }
}