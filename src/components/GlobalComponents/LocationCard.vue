<template>
    <div class="location-card-wrapper">
        <div class="location-title-wrapper">
            <font-awesome-icon icon="fa-solid fa-location-pin" />
            <span class="location-title">Marina Bay Sands</span>
        </div>

        <div class="location-image-wrapper">
            <img src="../../assets/images/destination-item-image.jpg" alt="location-item-image">
        </div>

        <p class="location-description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste dolor nihil, 
                consequuntur laborum mollitia modi aliquam. Neque iste alias amet corrupti repellendus 
                suscipit vitae mollitia. Consectetur qui officiis tempore numquam.
        </p>

        <div class="label-group">
            <span class="label">Hotel</span>
            <span class="label">Restaurant</span>
            <span class="label">Theme Park</span>
        </div>

        <div class="location-content">
            <div class="text-wrapper rating">
                <font-awesome-icon icon="fa-solid fa-star" class="text-icon"/>
                <span class="text">4.6</span>
            </div>
            <div class="text-wrapper address">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="text-icon"/>
                <a href="http://maps.google.com/?q=10 Bayfront Ave, Singapore 018956" target="_blank">
                    <span class="text link">10 Bayfront Ave, Singapore 018956</span>
                </a>
                
            </div>
            <div class="text-wrapper">
                <font-awesome-icon icon="fa-solid fa-phone" class="text-icon"/>
                <a href="tel:+65 6688 8868">
                    <span class="text link">+65 6688 8868</span>
                </a>
            </div>
            <div class="text-wrapper">
                <font-awesome-icon icon="fa-solid fa-earth-americas" class="text-icon"/>
                <a href="https://www.marinabaysands.com/" target="_blank">
                    <span class="text link">https://www.marinabaysands.com</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationPin, faStar, faLocationDot, faPhone, faEarthAmericas } from '@fortawesome/free-solid-svg-icons'


library.add(faLocationPin, faStar, faLocationDot, faPhone, faEarthAmericas)

</script>

<style scoped>
.location-card-wrapper {
    width: 26%;
    height: 340px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 5px 10px;
    margin: 1em;

    /*position fixed for formatting*/
    position: fixed;
    right: 0;
    bottom: 0;
}


.location-title {
    font-size: 22px;
    font-weight: 700;
    margin-left: 10px;
}

.fa-location-pin {
    width: 22px;
    height: 22px;
}

.location-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.3em;
}

.location-image-wrapper img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
}

.location-description {
    margin-top: 5px;
    font-size: 12px;
    font-weight: 500;
    text-overflow:ellipsis;
    overflow:hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    color: var(--dark-grey-primary);
}

.label-group {
    display: flex;
    column-gap: 5px;
    margin-top: 8px;
}

.label {
    font-size: 13px;
    font-weight: 500;
    padding: 3px 8px;
    background-color: var(--black-text-primary);
    border-radius: 5px;
    color: white;
}

.text-wrapper {
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.text {
    margin-left: 8px;
    font-size: 14px;
    color: var(--dark-grey-primary);

}

.text-icon {
    width: 15px;
    height: 15px;
    color: var(--dark-grey-primary);
}

.rating .text,
.rating .text-icon {
    color: #F9A825;
}

.text.link {
    color: var(--blue-link-primary)
}

</style>