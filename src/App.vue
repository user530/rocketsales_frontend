<template>
  <LeadsTable />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LeadsTable } from './components';

export default defineComponent({
  name: 'App',
  components: {
    LeadsTable,
  },
});
</script>
