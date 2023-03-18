<template>
    <div class="view">
        <ExpandableMap />
        <ItineraryHeader />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />
        <DestinationItem />


    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import DestinationItem from '../components/ItineraryPage/DestinationItem.vue';
import ExpandableMap from '../components/GlobalComponents/ExpandableMap.vue';
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue';

</script>

<style scoped>

</style>