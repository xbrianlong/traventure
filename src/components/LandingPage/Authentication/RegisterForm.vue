<template>
  <!-- Title -->
  <v-card-title class="text-h4">Sign up for Traventure </v-card-title>

  <br /><br />

  <!-- Register Form -->
  <v-responsive class="mx-auto" max-width="90%">
    <v-form>
      <v-container>
        <v-text-field label="Username"></v-text-field>
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Password"></v-text-field>
        <v-text-field label="Confirm password"></v-text-field>
      </v-container>
      <v-btn variant="flat" size="x-large" type="submit" class="mt-2 register-btn">Sign Up</v-btn>
    </v-form>
  </v-responsive>

  <br /><br />
</template>

<script setup>
</script>

<style scoped>
.register-btn {
  color: var(--button-color-primary);
}
</style>