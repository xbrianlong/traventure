<template>
    <div class="wrapper">
        <ul>
            <li class="item-wrapper">
                <font-awesome-icon icon="fa-solid fa-pen" class="menu-icon"/>
                <span class="menu-text">Rename</span>
            </li>

            <li class="item-wrapper">
                <font-awesome-icon icon="fa-solid fa-share-nodes" class="menu-icon"/>
                <span class="menu-text">Share</span>
            </li>

            <li class="item-wrapper">
                <font-awesome-icon icon="fa-solid fa-trash" class="menu-icon"/>
                <span class="menu-text">Remove</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faTrash, faShareNodes } from '@fortawesome/free-solid-svg-icons'

library.add(faPen, faTrash, faShareNodes)

</script>

<style scoped>
.wrapper {
    height: 275px;
    width: 220px;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 1000;
}

.item-wrapper {
    display: flex;
    align-items: center;
    padding: 15px 15px 15px 30px;
    cursor: pointer;
}

.item-wrapper:hover {
    background-color: var(--light-grey-primary);
}

.menu-text {
    font-size: 22px;
    color: var(--dark-grey-primary);
    margin-left: 20px;
}

.menu-icon {
    width: 25px;
    height: 25px;
    color: var(--dark-grey-primary);
}
</style>