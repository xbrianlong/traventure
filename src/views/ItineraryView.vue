<template>
    <div class="view">
        <!-- Uncomment to test page -->
        <ExpandableMap />
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
        <DestinationItem />
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';

</script>

<style scoped>

</style>