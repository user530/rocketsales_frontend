<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SearchBar',
    emits: ['searhLeads'],
    setup(_, { emit }) {
        const inputValue = ref('');

        const inputHandler = (e: Event) => {
            if (!e.target) return;
            inputValue.value = (e.target as HTMLInputElement).value;
            emit('searhLeads', inputValue.value);
        };

        return {
            inputValue,
            inputHandler,
        };
    }
});
</script>

<template>
    <a-input-search v-model="inputValue" @input="inputHandler" placeholder="Search" />
</template>