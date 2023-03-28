<template>
    <div class="view">
        <ExpandableMap v-show="toggle"/>
        <div :class="toggle === true ? 'openMap' : 'closeMap'" >
            <ItineraryHeader @toggleMap=toggleMap() :changeIcon="toggle"/>
            <DestinationContainer />
        </div>
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import ItineraryHeader from '../components/ItineraryPage/ItineraryHeader.vue';
import ExpandableMap from '../components/GlobalComponents/ExpandableMap.vue';
import DestinationContainer from '../components/ItineraryPage/DestinationContainer.vue';

const toggle = ref(true)

function toggleMap() {
    toggle.value = !toggle.value
    console.log(toggle.value)
}

</script>

<style scoped>

.openMap {
    width: var(--expanded-map-width);
}

.closeMap {
    width: 100%;
}

</style>