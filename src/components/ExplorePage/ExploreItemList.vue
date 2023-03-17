<template>
    <v-card
        width="100vw"
        class="py-1">
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
                            <v-icon class="icon" icon="mdi-heart-outline"></v-icon>
                        </v-col>
                        <v-col
                            class="px-1 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-plus-circle-outline"></v-icon>
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
                            <v-icon class="icon" icon="mdi-heart-outline"></v-icon>
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
                            <v-icon class="icon" icon="mdi-heart-outline"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <v-card-text class="pa-0">4.6</v-card-text>
                        </v-col>
                    </v-row>

                    <!-- phone number (havent impliment if no website how) -->
                    <v-row class="px-3 py-0 align-center">
                        <v-col
                            class="px-2 py-0 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-heart-outline"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <v-card-text class="pa-0">4.6</v-card-text>
                        </v-col>
                    </v-row>

                    <!-- website (havent impliment if no website how) -->
                    <v-row class="px-3 py-0 align-center">
                        <v-col
                            class="px-2 py-0 flex-grow-0 flex-shrink-0">
                            <v-icon class="icon" icon="mdi-heart-outline"></v-icon>
                        </v-col>
                        <v-col
                            class="px-2 py-0 flex-grow-1 flex-shrink-0">
                            <v-card-text class="pa-0">4.6</v-card-text>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    md="4"
                    lg="4"
                    class="hidden-xs">
                    <v-img
                        class="rounded ma-0 pa-0"
                        max-height="250px"
                        max-width="250px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        aspect-ratio="1"
                        cover  
                    >
                    </v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
  </template>

<script>

</script>

<style scoped>
.labelname {
    background-color: #6A1B9A;
    color: white;
}

.icon {
    color: #000000;
    opacity: 0.54;
}

</style>