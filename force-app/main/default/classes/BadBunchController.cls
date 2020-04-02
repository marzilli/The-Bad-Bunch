/**
 * Simple controller for the Bad Bunch demo.
 **/
public with sharing class BadBunchController {
    
    /**
     * Generates a number of accounts.
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

    /**
     * Generates a number of accounts as JSON string
     * @returns (String)
     */
    @auraEnabled(cacheable=false)
    public static String generateJSONRecords(Integer size) {
        Account[] accounts = generateRecords(size);
        String results = JSON.serialize(accounts);
        return results;
    }
}
