<template>
    <div class="section-wrapper">
        <h2>Trips</h2>
        <div class="card-group">
            <TripCard />
            <TripCard />
            <TripCard />
            <TripCard />
            <TripCard />
        </div>
        
    </div>
</template>

<script setup>
import TripCard from './TripCard.vue';

</script>

<style scoped>
.section-wrapper {
    margin-top: 20px;
}

.card-group {
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap: 50px;
    margin-top: 20px;
}
</style>