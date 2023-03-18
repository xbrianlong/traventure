<template>
    <div class="view">
        <DestinationItem />
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import DestinationItem from '../components/ItineraryPage/DestinationItem.vue';

</script>

<style scoped>

</style>