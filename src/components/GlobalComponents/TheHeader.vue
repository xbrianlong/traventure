<template>
    <div class="header-wrapper">
        <div class="logo-wrapper">
            <img src="../../assets/images/logo-black.png">
        </div>
        <v-avatar color="black" class="mr-8" size="45"></v-avatar>
    </div>
</template>

<script setup>

</script>

<style scoped>

.header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    border-bottom-color: var(--light-grey-primary);
    border-bottom-style: solid;
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 10000;
}
.logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-wrapper img {
    object-fit: cover;
    height: 200px;
    width: 200px;
}

</style>