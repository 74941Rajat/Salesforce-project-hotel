public with sharing class Hotelseacrh{

    private static final Integer MAX_PRICE = 50000;

    @AuraEnabled(cacheable=true)
    public static List<Search_Hotel__c> getListOfHotel(String city) {
        String cityLike = '%' + city + '%';
        return [
            SELECT Id, City__c, Amenities__c, Price__c, Rating__c, Name FROM Search_Hotel__c
            WHERE City__c LIKE :cityLike
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getRatings() {
        List<String> ratings = new List<String>();
        
        // Fetch distinct ratings from Search_Hotel__c object
        for (AggregateResult aggregate : [
            SELECT Rating__c 
            FROM Search_Hotel__c 
            WHERE Rating__c != null 
            GROUP BY Rating__c
        ]) {
            ratings.add(String.valueOf(aggregate.get('Rating__c')));
        }

        return ratings;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getAmenities() {
        List<String> amenities = new List<String>();
        
        // Fetch distinct amenities from Search_Hotel__c object
        for (AggregateResult aggregate : [
            SELECT Amenities__c 
            FROM Search_Hotel__c 
            WHERE Amenities__c != null 
            GROUP BY Amenities__c
        ]) {
            amenities.add(String.valueOf(aggregate.get('Amenities__c')));
        }

        return amenities;
    }

    @AuraEnabled(cacheable=true)
    public static List<Search_Hotel__c> getFilteredHotels(String city, List<String> selectedAmenities, List<String> selectedRatings, Integer minPrice) 
    {
        if ((selectedAmenities == null || selectedAmenities.isEmpty()) && (selectedRatings == null || selectedRatings.isEmpty())) {
            // If no ratings or amenities are selected    
            return [
                SELECT Id, City__c, Amenities__c, Price__c, Rating__c, Name FROM Search_Hotel__c
                WHERE City__c = :city AND Price__c >= :minPrice AND Price__c <= :MAX_PRICE
            ];
        }

        if (selectedAmenities == null || selectedAmenities.isEmpty()) {
            // If no amenities are selected 
            return [
                SELECT Id, City__c, Amenities__c, Price__c, Rating__c, Name FROM Search_Hotel__c
                WHERE City__c = :city AND Rating__c IN :selectedRatings AND Price__c >= :minPrice AND Price__c <= :MAX_PRICE
            ];
        }

        if (selectedRatings == null || selectedRatings.isEmpty()) {
            // If no ratings are selected     
            return [
                SELECT Id, City__c, Amenities__c, Price__c, Rating__c, Name FROM Search_Hotel__c
                WHERE City__c = :city AND Amenities__c IN :selectedAmenities AND Price__c >= :minPrice AND Price__c <= :MAX_PRICE
            ];
        }

        // Fetch hotels based on all filters
        return [
            SELECT Id, City__c, Amenities__c, Price__c, Rating__c, Name FROM Search_Hotel__c
            WHERE City__c = :city AND Amenities__c IN :selectedAmenities AND Rating__c IN :selectedRatings AND Price__c >= :minPrice AND Price__c <= :MAX_PRICE
        ];
    }
}
