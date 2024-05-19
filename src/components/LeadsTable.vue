<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ILead } from '../types';
import ContactsTable from './ContactsTable.vue';
import SearchBar from './SearchBar.vue';
import { charToColor, unixTimeToString, fetchData, validateLeadsResponse, generateFilters } from '../utils';
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

        // Update column filters 
        const updateColumnsFilters = (data: unknown[]) => {
            // Iterate over all columns
            columns.forEach(
                column => {
                    // Skip if no filters on column
                    if (!column.filters) return;
                    // Update filters if it supposed to get filtered
                    column.filters = generateFilters(data, `${column.dataIndex}`);
                }
            );
        }

        // Columns setup
        const columns: TableColumnType<ILead>[] = reactive([
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                fixed: true,
                sorter: (a, b) => a.name.localeCompare(b.name),
                filters: generateFilters(leadsData.value, 'name'),
                onFilter: (value, record) => record.name.includes(`${value}`),
            },
            {
                title: 'Бюджет',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                filters: generateFilters(leadsData.value, 'price'),
                onFilter: (value, record) => record.price === +value,
            },
            {
                title: 'Статус',
                dataIndex: 'status.name',
                key: 'status',
                sorter: (a, b) => a.status.name.localeCompare(b.status.name),
                filters: generateFilters(leadsData.value, 'status.name'),
                onFilter: (value, record) => record.status.name.includes(`${value}`),
            },
            {
                title: 'Ответственный',
                dataIndex: 'responsible.name',
                key: 'responsible',
                sorter: (a, b) => a.responsible.name.localeCompare(b.responsible.name),
                filters: generateFilters(leadsData.value, 'responsible.name'),
                onFilter: (value, record) => record.responsible.name.includes(`${value}`),
            },
            {
                title: 'Дата создания',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            },
        ]);

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

                    // Update filters, based on new values
                    updateColumnsFilters(leadsData.value);
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