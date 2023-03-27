<template>
    <div>
        <DestinationItem 
            v-for="(destItem, index) in destItems"
            :key = index
            :title = destItem.title
            :description= destItem.description
            :imageSource = destItem.imageSource
            :imageAlt = destItem.imageAlt
            @removeItem=removeItem(index)
        />
    </div>
</template>

<script setup>
import DestinationItem from './DestinationItem.vue';
import { ref } from 'vue';

// replace this with API array of destItems object later 
const destItems = ref([
    {title: 'Marina Bay Sands', description: 'This is MBS.', imageSource: "../../assets/images/destination-item-image.jpg", imageAlt: "MBS image"},
    {title: 'Merlion', description: 'This is Merlion Park', imageSource: "", imageAlt: "Merlion image"},
    {title: 'Gardens By the Bay', description: 'This is Gardens by the Bay', imageSource: "", imageAlt: "Garden image"},
    {title: 'Bugis Street', description: 'This is Bugis Street', imageSource: "", imageAlt: "Bugis image"}
])

function removeItem(index) {
    destItems.value.splice(index, 1)
}



</script>


<style scoped>

</style>