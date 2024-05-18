<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { ILeadContact } from '../types';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons-vue';
import type { TableColumnType } from 'ant-design-vue/es';

export default defineComponent({
    name: 'ContactsTable',
    components: {
        MailOutlined,
        PhoneOutlined,
    },
    props: {
        contacts: {
            type: Array as PropType<Array<ILeadContact>>,
            required: true,
        },
    },
    setup() {
        const columns: TableColumnType<ILeadContact>[] = [
            {
                title: '',
                dataIndex: 'avatar',
                key: 'icon',
                align: 'right'
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

        // Helper function to get a color based on the first letter of the string
        const charToColor = (char: string, saturation = 1, lightness = 0.7, random = false) => {
            // Get the number from the first character
            const code = char.charCodeAt(0);

            // Bound saturation and lightness values
            saturation = Math.min(100, Math.max(0, saturation * 100));
            lightness = Math.min(100, Math.max(0, lightness * 100));

            // Generate hue from the char
            const hue = (code * (random ? Math.random() : 1) * 137) % 360;

            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }

        return {
            columns,
            charToColor,
        };
    },
})
</script>

<template>
    <a-table rowClassName="test" :columns="columns" :dataSource="contacts" :pagination=false :showHeader=false
        tableLayout="fixed">
        <template #bodyCell="{ column, record }: { column: TableColumnType, record: ILeadContact }">
            <!-- Avatar column -->
            <template v-if="column.key === 'icon'">
                <a-avatar :style="{ 'background-color': charToColor(record.name ? record.name[0] : '?') }">
                    {{ record.name ? record.name[0] : '?' }}
                </a-avatar>
            </template>

            <!-- Position column -->
            <template v-if="column.key === 'position'">
                <a-tag v-if="record.position" color="red">
                    {{ record.position?.toUpperCase() }}
                </a-tag>
            </template>

            <!-- Email column -->
            <template v-if="column.key === 'email' && record.email">
                {{ record.email }}
                <a-divider type="vertical" />
                <a :href="`mailto:${record.email}`"><mail-outlined /></a>
            </template>

            <!-- Phone column -->
            <template v-if="column.key === 'phone' && record.phone">
                {{ record.phone }}
                <a-divider type="vertical" />
                <a :href="`tel:${record.phone}`"><phone-outlined /></a>
            </template>
        </template>
    </a-table>
</template>

<style scoped>
:deep .test td {
    background-color: #fafafa;
}

:deep .test:hover td {
    background-color: #efefef !important;
}
</style>