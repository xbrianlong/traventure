<template>
    <div class="section-wrapper">
        <h2 class="trip">Trips</h2>


        <div class="card-group">
            <TripCard 
                v-for="(tripCard, index) in tripCards"
                :key="index"
                :title="tripCard.title"
                :startDate="tripCard.startDate"
                :endDate="tripCard.endDate"
                :numPlaces="tripCard.numPlaces"
                :imageAlt="tripCard.imageAlt"
                :imageSource="tripCard.imageSource"
                @removeItem="removeItem(index)"
            />
        </div>
        
    </div>
</template>

<script setup>
import TripCard from './TripCard.vue';
import { ref } from 'vue';
import { useConfirm, useSnackbar } from 'vuetify-use-dialog'

const tripCards = ref([
    {title: 'Trip to Japan', startDate: 'Feb 3', endDate: 'Mar 15', numPlaces: '3', imageAlt: 'japan-image', imageSource: '../../assets/images/trip-card-image.jpg'},
    {title: 'Trip to Korea', startDate: 'Aug 9', endDate: 'Sep 21', numPlaces: '7', imageAlt: 'korea-image', imageSource: '../../assets/images/trip-card-image.jpg'},
    {title: 'Trip to Australia', startDate: 'Sept 11', endDate: 'Oct 3', numPlaces: '2', imageAlt: 'australia-image', imageSource: '../../assets/images/trip-card-image.jpg'},
    {title: 'Trip to Netherlands', startDate: 'May 27', endDate: 'July 19', numPlaces: '10', imageAlt: 'netherlands-image', imageSource: '../../assets/images/trip-card-image.jpg'}
])

const createConfirm = useConfirm()
const createSnackbar = useSnackbar()

async function removeItem(index) {
    try {
        await createConfirm({ 
            title: 'Confirm Deletion',
            content: `Are you sure you want to delete ${tripCards.value[index].title} ?` ,
            confirmationText: 'Delete',
            cardProps: {
                width: 500
            },
            confirmationButtonProps: {
                color: 'red'
            },
            dialogProps: {
                width: 500
            }
        })

        createSnackbar({ 
            text: `${tripCards.value[index].title} is deleted`,
            snackbarProps: {
                timeout: 1000
            }
        })
        tripCards.value.splice(index, 1)
    }

    catch {
        // Actions after clicking Cancel
        (err) => console.log(err)
    }

}

</script>

<style scoped>
.section-wrapper {
    margin-top: 20px;
}

.card-group {
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap: 50px;
    margin-top: 20px;
}

.trip {
    font-size: 30px;
}
</style>