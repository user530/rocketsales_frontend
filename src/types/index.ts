import { VNode } from 'vue';

export interface IColumn {
    title: string;
    dataIndex?: string;
    key: string;
    fixed?: boolean;
    customRender?: (...args: any[]) => VNode;
}

interface ILeadStatus {
    name: string;
    color: string;
}

interface ILeadResponsible {
    name: string;
}

export interface ILeadContact {
    name: string;
    phone?: string;
    email?: string;
    position?: string;
}

export interface ILead {
    name: string;
    price: number;
    created_at: number;
    status: ILeadStatus;
    responsible: ILeadResponsible;
    contacts: ILeadContact[];
}