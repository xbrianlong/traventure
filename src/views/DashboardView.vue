<template>
  <TheHeader />
  <NavigationBar />
  <div class="view" id="dashboard-view">
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
import NavigationBar from '../components/GlobalComponents/NavigationBar.vue'
import DashboardFeatured from '../components/DashboardPage/DashboardFeatured.vue'
import DashboardTitle from '../components/DashboardPage/DashboardTitle.vue'
import TripSection from '../components/DashboardPage/TripSection.vue'
</script>

<style>
#dashboard-view {
  padding: 30px 60px;
}
</style>
