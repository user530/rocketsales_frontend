<script lang="ts">
import { PropType, defineComponent, h } from 'vue';
import { ILeadContact, IColumn } from '../types';
import { UserOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'ContactsTable',
    props: {
        contacts: {
            type: Array as PropType<Array<ILeadContact>>,
            required: true,
        },
    },
    setup() {
        const columns: IColumn[] = [
            {
                title: '',
                dataIndex: 'avatar',
                key: 'icon',
            },
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
        ];

        const charToHexColor = (char: string) => {
            const code = char.charCodeAt(0);
            // Generate hex code
            const hex = (code * 1234567).toString(16).padStart(6, '0');
            // Slice to get 6 character hex-code
            return `#${hex.slice(-6)}`;
        }

        return {
            columns,
            charToHexColor,
        };
    },
})
</script>

<template>
    <a-table :columns="columns" :dataSource="contacts" :pagination=false>
        <template #bodyCell="{ column, record }: { column: IColumn, record: ILeadContact }">
            <template v-if="column.key === 'icon'">
                <a-avatar :style="{ 'background-color': charToHexColor(record.name ? record.name[0] : '?') }">
                    {{ record.name ? record.name[0] : '?' }}
                </a-avatar>
            </template>
        </template>
    </a-table>
</template>