<template>
    <div class="view">
        <!-- Uncomment to test page -->
        <!-- <ExpandableMap />
        <LocationCard />
        <ItineraryHeader />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem /> -->
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import DestinationItem from '../components/ItineraryPage/DestinationItem.vue';
import ExpandableMap from '../components/GlobalComponents/ExpandableMap.vue';
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue';
import LocationCard from '../components/GlobalComponents/LocationCard.vue';

</script>

<style scoped>

</style>