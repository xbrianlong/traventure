<template>
  <TheHeader />
  <div id="dashboard-view">
    <DashboardFeatured />
    <DashboardTitle />
    <Suspense>
      <TripSection />
    </Suspense>

    <ContextMenu />
  </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue'
import DashboardFeatured from '../components/DashboardPage/DashboardFeatured.vue'
import DashboardTitle from '../components/DashboardPage/DashboardTitle.vue'
import TripSection from '../components/DashboardPage/TripSection.vue'
</script>

<style>
#dashboard-view {
  position: relative;
  padding: 30px 60px;
  top: var(--header-height);
  margin-left: 6%;
  margin-right: 6%;
}
</style>
