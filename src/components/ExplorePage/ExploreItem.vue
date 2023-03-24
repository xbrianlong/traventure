<template>
    <v-card flat
        class="py-1 mx-0 card">
        <v-container>
            <v-row
                class="d-flex">
                <v-col
                    md="8"
                    lg="8"
                    class="pa-2 flex-grow-1 flex-shrink-0">
                    <v-row class="align-center">
                        <v-col
                            class="px-1 flex-grow-1 flex-shrink-0">
                            <v-card-title class="font-weight-bold text-h6 text-md-h5">Marina Bay Sands</v-card-title>
                        </v-col>
                        <v-col
                            class="px-1 flex-grow-0 flex-shrink-0">
                            <v-btn
                            icon 
                            flat
                            @click="toggleLike">
                            <v-icon v-if="like" class="icon" icon="mdi-heart"></v-icon>
                            <v-icon v-else class="icon" icon="mdi-heart-outline"></v-icon>
                            </v-btn>
                        </v-col>
                        <v-col
                            class="px-1 flex-grow-0 flex-shrink-0">
                            <v-btn
                            icon 
                            flat
                            @click="toggleFavourite">
                            <v-icon v-if="favourite" class="icon" icon="mdi-check"></v-icon>
                            <v-icon v-else class="icon" icon="mdi-plus-circle-outline"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-chip label size="x-small" class="ma-1 ml-3 font-weight-bold labelname"> Hotel</v-chip>
                    <v-chip label size="x-small" class="ma-1 font-weight-bold labelname"> Casino</v-chip>
                    <v-chip label size="x-small" class="ma-1 font-weight-bold labelname"> Shopping</v-chip>
                    <v-chip label size="x-small" class="ma-1 font-weight-bold labelname"> Theme Park</v-chip>
                    <v-card-text>
                        Marina Bay Sands is the leading business, leisure and entertainment 
                        destination in Asia. 
                    </v-card-text>

                    <!-- rating -->
                    <v-row class="px-3 py-0 align-center">
                        <v-col
                            class="px-2 py-0 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-star"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <v-card-text class="pa-0">4.6</v-card-text>
                        </v-col>
                    </v-row>

                    <!-- location -->
                    <v-row class="px-3 py-0 align-center">
                        <v-col
                            class="px-2 py-0 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-map-marker"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <v-card-text class="pa-0">10 Bayfront Ave, Singapore 018956</v-card-text>
                        </v-col>
                    </v-row>

                    <!-- phone number (havent impliment if no website how) -->
                    <v-row class="px-3 py-0 align-center">
                        <v-col
                            class="px-2 py-0 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-phone"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <a href="tel:+65 6688 8868">
                                <v-card-text class="pa-0">+65 6688 8868</v-card-text>
                            </a>
                        </v-col>
                    </v-row>

                    <!-- website (havent impliment if no website how) -->
                    <v-row class="px-3 py-0 align-center">
                        <v-col
                            class="px-2 py-0 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-web"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <a href="https://www.marinabaysands.com">
                                <v-card-text class="pa-0">https://www.marinabaysands.com</v-card-text>
                            </a>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    md="4"
                    lg="4"
                    class="hidden-xs img-wrapper">
                    <img class="image" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                </v-col>
            </v-row>
        </v-container>
    </v-card>
  </template>

<script>

</script>

<style scoped>
.card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--expanded-map-width);
}

.v-btn--size-default {
    --v-btn-height: 10px;
}

.img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.image {
    max-width: 250px;
    max-height: 250px;
    object-fit: cover;
}
.labelname {
    background-color: #6A1B9A;
    color: white;
}

.icon {
    color: #000000;
    opacity: 0.54;
}

</style>