<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card 
        :elevation="isHovering ? 12 : 2"
        :class="{ 'on-hover': isHovering }"
        v-bind="props"
        >
        <!-- add function to add to drawer on v-card -->
            <v-img
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            height="100%"
            cover>
                <v-row>
                    <v-col align="right">
                        <v-btn
                            variant="text"
                            :class="{ 'show-btns': isHovering }"
                            color="rgba(255,255,255,0)"
                            icon="mdi-heart-outline"
                            small
                        >
                        <!-- @click.prevent=function to add to favourites -->
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="my-0">
                    <v-col align="center" class="pa-0">
                        <v-icon
                            variant="text"
                            :class="{ 'show-btns': isHovering }"
                            color="rgba(255,255,255,0)"
                            icon="mdi-plus-circle-outline"
                            size="100px"
                        ></v-icon>
                    </v-col>
                </v-row>
            </v-img>
        </v-card>
    </v-hover>
  </template>
  
  <style>
  .v-card {
    height: 200px;
    width: 130px;
  }

  .v-card.on-hover {
    opacity: 0.6;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
  </style>