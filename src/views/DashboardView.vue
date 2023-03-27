<template>
    <div class="view">
        <DashboardFeatured />
        <DashboardTitle />
        <TripSection />
        <ContextMenu />
    </div>
</template>

<script setup>
import DashboardFeatured from '../components/DashboardPage/DashboardFeatured.vue';
import DashboardTitle from '../components/DashboardPage/DashboardTitle.vue';
import TripSection from '../components/DashboardPage/TripSection.vue';

</script>

<style scoped>
.view {
    padding: 30px 60px 0 60px
}

</style>