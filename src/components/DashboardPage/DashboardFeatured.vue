<template>
    <div class="image-wrapper">
        <img src="../../assets/images/dashboard-featured-image.jpg" alt="featured-image">
    </div>
</template>

<script setup>

</script>

<style scoped>

.image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    
}

.image-wrapper img {
    height: 180px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
}

</style>