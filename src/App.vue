<template>
  <main class="main-content">
    <LeadsTable />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeadsTable from './components/LeadsTable.vue';

export default defineComponent({
  name: 'App',
  components: {
    LeadsTable,
  },
});
</script>

<style scoped>
.main-content {
  padding: 2rem 1rem;
  background-color: #f0f2f5;
  min-height: 100vh;
}
</style>
