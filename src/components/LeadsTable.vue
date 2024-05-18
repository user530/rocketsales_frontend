<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IColumn, ILead } from '../types';

export default defineComponent({
    name: 'LeadsTable',
    setup() {
        const leadsData = ref<ILead[]>([]);
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

        const leadsColumns: IColumn[] = [
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

        const contactsColumns: IColumn[] = [
            {
                title: 'Имя контакта',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Должность',
                dataIndex: 'position',
                key: 'position'
            },
            {
                title: 'Почтовый адрес',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Телефон',
                dataIndex: 'phone',
                key: 'phone'
            },
        ]

        return {
            leadsColumns,
            contactsColumns,
            loading,
            leadsData,
        };
    }
});
</script>

<template>
    <a-spin :spinning="loading">
        <a-table :columns="leadsColumns" :dataSource="leadsData">
            <!-- Expand column setup -->
            <template #expandedRowRender="{ record }">
                <a-table :columns="contactsColumns" :dataSource="record.contacts">

                </a-table>
            </template>
            <!-- Expand column title -->
            <template #expandColumnTitle>
                <span style="color:red">Контакты</span>
            </template>
        </a-table>
    </a-spin>
</template>