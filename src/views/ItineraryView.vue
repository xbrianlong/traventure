<template>
    <div class="view">
        <ExpandableMap />
        <ItineraryHeader />
        <DestinationContainer />
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue';
import ExpandableMap from '../components/GlobalComponents/ExpandableMap.vue';
import DestinationContainer from '../components/ItineraryPage/DestinationContainer.vue';

</script>

<style scoped>

</style>