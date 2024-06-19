import { LightningElement, wire } from 'lwc';
import ListOfHotel from '@salesforce/apex/Hotelseacrh.getListOfHotel';
import FilterHotels from '@salesforce/apex/Hotelseacrh.getFilteredHotels';
import Rating from '@salesforce/apex/Hotelseacrh.getRatings';
import Amenities from '@salesforce/apex/Hotelseacrh.getAmenities';

export default class YourComponentName extends LightningElement {
    hotelRecord;
    City;
    error;
     ratingOption = [];
    selectedRating = [];
    selectPriceRange = 1000;

    @wire(Rating)
    wireRating({ data, error }) {
        if (data) {
            this.ratingOption = data.map(rating => ({ label: rating + ' star', value: rating }));
        } else if (error) {
            console.error('Error Fetching Rating', error);
        }
    }
    
    handleRating(event) {
        this.selectedRating = event.detail.value;
        this.fetchFilterHotel();
    }

    amenitiesOption = [];
    
    @wire(Amenities)
    wireAmenities({ data, error }) {
        if (data) {
            this.amenitiesOption = data.map(amenity => ({ label: amenity, value: amenity }));
        } else if (error) {
            console.error('Error Fetching Amenities', error);
        }
    }

    selectedAmenities = [];

    handleAmenities(event) {
        this.selectedAmenities = event.detail.value;
        this.fetchFilterHotel();
    }
    
    handleDestinationCity(event) {
        this.City = event.target.value;
        this.fetchFilterHotel();
    }
    
    handleSearchHotel() {
        ListOfHotel({ city: this.City })
            .then(result => {
                this.hotelRecord = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.hotelRecord = undefined;
            });
    }

    handlePrice(event) {
        this.selectPriceRange = event.detail.value;
        this.fetchFilterHotel();
    }

    fetchFilterHotel() {
        FilterHotels({
            city: this.City,
            selectedAmenities: this.selectedAmenities,
            selectedRatings: this.selectedRating,
            minPrice: this.selectPriceRange
        })
        .then(result => {
            this.hotelRecord = result;
            this.error = undefined;
        })
        .catch(error => {
            this.hotelRecord = undefined;
            this.error = error.body.message;
        });
    }
}
