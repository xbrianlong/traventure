<template>
    <div>
        <DestinationItem 
            v-for="(destItem, index) in destItems"
            :key = index
            :title = destItem.title
            :description= destItem.description
            :imageSource = destItem.imageSource
            :imageAlt = destItem.imageAlt
        />
    </div>
</template>

<script setup>
import DestinationItem from './DestinationItem.vue';
import { ref } from 'vue';

// replace this with API array of destItems object later 
const destItems = ref([
    {title: 'Marina Bay Sands', description: 'This is MBS.', imageSource: "", imageAlt: "MBS image"},
    {title: 'Merlion', description: 'This is Merlion Park', imageSource: "../../assets/images/destination-item-image.jpg", imageAlt: "Merlion image"}
]) 


</script>


<style scoped>

</style>