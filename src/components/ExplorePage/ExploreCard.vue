<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
      <!-- add function to add to drawer on v-card -->
      <v-img :src="photoUrl" height="300px" cover>
        <v-overlay :model-value="isHovering" contained>
          <div id="icon" v-if="favourite">
            <v-icon
              :class="[{ 'show-btns': isHovering }, 'pa-7', 'icon']"
              icon="mdi-heart"
              size="x-large"
            />
          </div>
        </v-overlay>
      </v-img>
    </v-card>
  </v-hover>
</template>
  
<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps(['placeDetails'])
const photoUrl = ref(props.placeDetails.photos[0].getUrl())

const favourite = ref(true)
</script>

<style scoped>
.v-card {
  height: 100%;
  width: 200px;
  cursor: pointer;
}

#icon {
  position: absolute;
  right: -200px;
  top: 0;
}

.icon {
  color: rgba(255, 255, 255, 0);
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>