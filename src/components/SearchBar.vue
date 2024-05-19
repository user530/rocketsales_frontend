<script lang="ts">
import { defineComponent, ref } from 'vue';
import debounce from 'lodash.debounce';

export default defineComponent({
    name: 'SearchBar',
    emits: ['searhLeads'],
    setup(_, { emit }) {
        const inputValue = ref('');

        // Debounce the emit by 300 ms (recommended value)
        const debouncedEmit = debounce(
            (query: string) => { emit('searhLeads', query); },
            300
        );

        const inputHandler = (e: Event) => {
            if (!e.target) return;
            inputValue.value = (e.target as HTMLInputElement).value;
            debouncedEmit(inputValue.value);
        };

        return {
            inputValue,
            inputHandler,
        };
    }
});
</script>

<template>
    <a-input-search v-model="inputValue" @input="inputHandler" placeholder="Search" style="width: 200px" />
</template>