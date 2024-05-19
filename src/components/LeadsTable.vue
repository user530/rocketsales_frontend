<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ILead } from '../types';
import ContactsTable from './ContactsTable.vue';
import SearchBar from './SearchBar.vue';
import { charToColor, unixTimeToString, fetchData, validateLeadsResponse } from '../utils';
import type { TableColumnType } from 'ant-design-vue/es';
import { UserOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'LeadsTable',
    components: {
        ContactsTable,
        UserOutlined,
        SearchBar,
    },
    setup() {
        const leadsData = ref<(ILead & { key: number })[]>([]);
        const loading = ref(false);
        const abortController = ref<AbortController | null>(null);
        const requestTracker = ref(0);

        // Columns setup
        const columns: TableColumnType<ILead>[] = [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                fixed: true,
            },
            {
                title: 'Бюджет',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'Ответственный',
                dataIndex: 'responsible',
                key: 'responsible'
            },
            {
                title: 'Дата создания',
                dataIndex: '',
                key: 'created_at'
            },
        ];

        // Data fetch implementation for this component
        const fetchLeads = async (query = '') => {
            // Interrupt possible request
            if (abortController.value)
                abortController.value.abort();

            // Setup new controller
            abortController.value = new AbortController();

            // Increment request counter and save the id
            const requestId = ++requestTracker.value;

            // Fetch block
            try {
                // Raise loading flag
                loading.value = true;

                // Fetch data
                const data = await fetchData<ILead[]>(
                    'leads',
                    { query },
                    abortController.value.signal,
                    validateLeadsResponse,
                );

                // Check that request is a latest one
                if (requestId === requestTracker.value) {

                    // If it is -> set data
                    leadsData.value = data.map((val, ind) => ({ ...val, key: ind }));
                }
            } catch (error) {
                // Log error, but don't throw it
                console.error('Leads fetch failed!', (error as Error).message);
            } finally {
                // Check that request is a latest one
                if (requestId === requestTracker.value) {
                    // If it is reset loading flag
                    loading.value = false;
                }
            }
        };

        // Search handler
        const handleSearch = (searchValue: string) => {
            fetchLeads(searchValue);
        };

        // Initial fetch
        onMounted(
            () => fetchLeads()
        );

        return {
            columns,
            loading,
            leadsData,
            charToColor,
            unixTimeToString,
            handleSearch,
        };
    }
});
</script>

<template>
    <a-card title="Пример тестового задания">
        <!-- Add search bar to the header part -->
        <template #extra>
            <SearchBar @searhLeads="handleSearch" />
        </template>

        <!-- Wrap the table in the spinner -->
        <a-spin :spinning="loading">
            <a-table :customHeaderRow="() => ({ class: 'custom-header' })" :columns="columns" :dataSource="leadsData"
                expandRowByClick tableLayout="fixed" sticky :pagination=false>
                <template #expandedRowRender="{ record }: { record: ILead }">
                    <ContactsTable :contacts="record.contacts" />
                </template>

                <template #bodyCell="{ column, record }: { column: TableColumnType, record: ILead }">
                    <!-- Status column -->
                    <template v-if="column.key === 'status'">
                        <a-tag :color="record.status.color" class="custom-tag-text-color">{{ record.status.name
                            }}</a-tag>
                    </template>

                    <!-- Responsible column -->
                    <template v-if="column.key === 'responsible'">
                        <a-avatar
                            :style="{ 'background-color': charToColor(record.responsible.name ? record.responsible.name : '?'), 'color': '#666' }">
                            <user-outlined />
                        </a-avatar>
                        {{ record.responsible.name }}
                    </template>

                    <!-- Created At column -->
                    <template v-if="column.key === 'created_at'">
                        <!-- Unix time to JS time and then to string of requested format -->
                        {{ unixTimeToString(record.created_at) }}
                    </template>
                </template>
            </a-table>
        </a-spin>
    </a-card>
</template>

<style scoped>
:deep(.custom-tag-text-color) {
    color: #666 !important;
}

:deep(.custom-header) th {
    background-color: #ffafaf !important;
}
</style>