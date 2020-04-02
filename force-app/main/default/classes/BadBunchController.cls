/**
 * Simple controller for the Bad Bunch demo.
 **/
public with sharing class BadBunchController {
    
    /**
     * Determines an arbitrarily large number of records.
     * @returns (Account)
     */
    @auraEnabled(cacheable=false)
    public static Account[] generateRecords(Integer size) {
        Account[] results = new Account[]{};

        for (Integer i = 0; i < size; i++ ){
            results.add(new Account(
                name = 'Account_' + i
            ));
        }

        return results;
    }
}
