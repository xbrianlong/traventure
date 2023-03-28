<template>
    <TheHeader />
    <NavigationBar />
    <div class="view">
      <GoogleMap placeId="ChIJdZOLiiMR2jERxPWrUs9peIg" />
      <ExploreList />
      <ExploreList />
      <ExploreList />
      <ExploreItem />
      <ExploreItem />
      <ExploreItem />
      <ExploreItem />
      <ExploreItem />
    </div>
</template>

<script setup>
import TheHeader from '../components/GlobalComponents/TheHeader.vue';
import NavigationBar from '../components/GlobalComponents/NavigationBar.vue';
import GoogleMap from '../components/GlobalComponents/GoogleMap.vue';
import ExploreItem from '../components/ExplorePage/ExploreItem.vue';
import ExploreList from '../components/ExplorePage/ExploreList.vue';

</script>

<style scoped>

</style>
