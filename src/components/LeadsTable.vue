<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IColumn, ILead, ILeadContact } from '../types';
import ContactsTable from './ContactsTable.vue';

export default defineComponent({
    name: 'LeadsTable',
    components: {
        ContactsTable,
    },
    setup() {
        const leadsData = ref<(ILead & { key: number })[]>([]);
        const loading = ref(false);

        // Placeholder data
        leadsData.value = [
            {
                "key": 1,
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
                        "phone": "Должность1",
                        "email": "Почта1"
                    },
                    {
                        "name": "Пётр",
                        "phone": "Телефон5",
                        "email": "Почта5"
                    }
                ]
            },
            {
                "key": 2,
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
                        "phone": "Должность1",
                        "email": "Почта1"
                    }
                ]
            },
            {
                "key": 3,
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
        ]

        const columns: IColumn[] = [
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

        return {
            columns,
            loading,
            leadsData,
        };
    }
});
</script>

<template>
    <a-spin :spinning="loading">
        <a-table :columns="columns" :dataSource="leadsData">
            <!-- Expand column setup -->
            <template #expandedRowRender="{ record }: { record: ILead }">
                <ContactsTable :contacts="record.contacts" />
            </template>

            <!-- Expand column title -->
            <template #expandColumnTitle>
                <span style="color:red">Контакты</span>
            </template>
        </a-table>
    </a-spin>
</template>