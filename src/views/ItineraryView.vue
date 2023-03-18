<template>
    <div class="view">
        <ItineraryHeader />
    </div>
    <RouterView />
</template>

<script setup>
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue';
import { RouterView } from 'vue-router';

</script>

<style scoped>

</style>