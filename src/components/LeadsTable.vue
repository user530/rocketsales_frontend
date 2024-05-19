<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ILead } from '../types';
import ContactsTable from './ContactsTable.vue';
import SearchBar from './SearchBar.vue';
import { charToColor, unixTimeToString } from '../utils';
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

        // Placeholder data
        leadsData.value = [
            {
                "name": "Сделка№1",
                "price": 100,
                "created_at": 1715775952,
                "status": {
                    "name": "Переговоры",
                    "color": "#ffff99"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Василий Пупкин",
                        "phone": "Телефон1",
                        "email": "Почта1",
                        "position": "Должность1"
                    },
                    {
                        "name": "Пётр",
                        "phone": "Телефон5",
                        "email": "Почта5"
                    }
                ]
            },
            {
                "name": "Сделка3",
                "price": 300,
                "created_at": 1715776192,
                "status": {
                    "name": "Первичный контакт",
                    "color": "#99ccff"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Василий Пупкин",
                        "phone": "Телефон1",
                        "email": "Почта1",
                        "position": "Должность1"
                    }
                ]
            },
            {
                "name": "Сделка5",
                "price": 500,
                "created_at": 1715776345,
                "status": {
                    "name": "Принимают решение",
                    "color": "#ffcc66"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": []
            },
            {
                "name": "Сделка9",
                "price": 900,
                "created_at": 1715776511,
                "status": {
                    "name": "Переговоры",
                    "color": "#ffff99"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Василий Пупкин",
                        "phone": "Телефон1",
                        "email": "Почта1",
                        "position": "Должность1"
                    }
                ]
            },
            {
                "name": "Номер2",
                "price": 200,
                "created_at": 1715776154,
                "status": {
                    "name": "Первичный контакт",
                    "color": "#99ccff"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Пелагея Шувалова",
                        "phone": "Телефон2",
                        "position": "Должность2"
                    }
                ]
            },
            {
                "name": "Сделка6",
                "price": 600,
                "created_at": 1715776413,
                "status": {
                    "name": "Первичный контакт",
                    "color": "#99ccff"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": []
            },
            {
                "name": "Сделка7",
                "price": 700,
                "created_at": 1715776446,
                "status": {
                    "name": "Переговоры",
                    "color": "#ffff99"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Яков Королёв",
                        "phone": "Телефон4",
                        "email": "Почта4"
                    }
                ]
            },
            {
                "name": "Сделка8",
                "price": 800,
                "created_at": 1715776484,
                "status": {
                    "name": "Принимают решение",
                    "color": "#ffcc66"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Светлана Камалова"
                    }
                ]
            },
            {
                "name": "Сделка4",
                "price": 400,
                "created_at": 1715776218,
                "status": {
                    "name": "Согласование договора",
                    "color": "#ffcccc"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Марьяна Кайназарова",
                        "phone": "Телефон4",
                        "email": "Почта4"
                    },
                    {
                        "name": "Василий Пупкин",
                        "phone": "Телефон1",
                        "email": "Почта1",
                        "position": "Должность1"
                    },
                    {
                        "name": "Пётр",
                        "phone": "Телефон5",
                        "email": "Почта5"
                    }
                ]
            },
            {
                "name": "Сделка10",
                "price": 1000,
                "created_at": 1715776538,
                "status": {
                    "name": "Первичный контакт",
                    "color": "#99ccff"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Михаил Калашников",
                        "email": "Почта2",
                        "position": "Должность3"
                    }
                ]
            },
            {
                "name": "Тестовая21",
                "price": 250,
                "created_at": 1715959844,
                "status": {
                    "name": "Первичный контакт",
                    "color": "#99ccff"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Павел",
                        "email": "Почта21"
                    }
                ]
            },
            {
                "name": "тестовая23",
                "price": 300,
                "created_at": 1715959932,
                "status": {
                    "name": "Переговоры",
                    "color": "#ffff99"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "Алёша Попович",
                        "phone": "телефон23",
                        "email": "почта23"
                    }
                ]
            },
            {
                "name": "Тестова22",
                "price": 0,
                "created_at": 1715959874,
                "status": {
                    "name": "Принимают решение",
                    "color": "#ffcc66"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": [
                    {
                        "name": "",
                        "phone": "телефон22",
                        "email": "почта22"
                    }
                ]
            },
            {
                "name": "Сделка #2892909",
                "price": 0,
                "created_at": 1715959948,
                "status": {
                    "name": "Первичный контакт",
                    "color": "#99ccff"
                },
                "responsible": {
                    "name": "Magomed"
                },
                "contacts": []
            }
        ].map((val, ind) => ({ ...val, key: ind }));

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

        // Search handler
        const handleSearch = (searchValue: string) => { console.log('Search fired!', searchValue) };

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
        <SearchBar @searhLeads="handleSearch" />
        <a-spin :spinning="loading">
            <a-table :customHeaderRow="() => ({ class: 'custom-header' })" :columns="columns" :dataSource="leadsData"
                expandRowByClick tableLayout="fixed" sticky>
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