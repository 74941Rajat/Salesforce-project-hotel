public with sharing class test
{
    @AuraEnabled(cacheable=true)
         public static List<Reservation__c> getReservations()
          {         return [SELECT Id, Phone__c, Emailid__c, Aadhar_card_number__c, Date_of_Reservation__c, 
            Check_in_Date__c, Check_out_Date__c,  Status__c, Days_Of_Reservation__c,
             Total_Price__c, Room_Name__c, Search_Hotel__c, Customer_Name__c,Name FROM Reservation__c];    
                 }    
                  @AuraEnabled(cacheable=true)   
                    public static List<Customer__c> getCustomers() 
                    {         return [SELECT Id, Name, Phone__c, Email__c, Aadhar_card_number__c, Room__c FROM Customer__c];    
                     }
}