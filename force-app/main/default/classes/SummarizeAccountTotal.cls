global class SummarizeAccountTotal implements Database.Batchable<sObject>, Database.Stateful {

    global final String query;
    global Integer summary;

    global SummarizeAccountTotal(String q) {
        query = q;
        summary = 0;
    }

    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<sObject> scope) {
        for (sObject s : scope) {
            summary += Integer.valueOf(s.get('total__c'));
        }
    }

    global void finish(Database.BatchableContext BC) {
        // Final summary logic, like sending a notification or updating a record
        System.debug('Total summary: ' + summary);
    }
}
