<template>
    <div class="card-wrapper">
        <div class="image-wrapper">
            <img src="../../assets/images/trip-card-image.jpg" alt="card-image">
        </div>

        <div class="card-details">
            <h3 class="title">Trip to Japan</h3>
            <div class="card-date-location-wrapper">
                <span class="date">Feb 3 - Mar 15</span> 
                <span class="divider">|</span>
                <span class="place">3 places</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.card-wrapper {
    width: 400px;
    height: 300px;
    border: solid 1.5px var(--light-grey-primary);
    border-radius: 10px;
}

.image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.image-wrapper img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.card-details {
    padding: 10px;
}

.title {
    font-size: 22px;
}

.card-date-location-wrapper span {
    font-size: 16px;
}
.date {
    color: var(--dark-grey-primary);
}

.divider {
    margin-left: 8px;
    margin-right: 8px;
}



</style>