export interface ILeadStatus {
    name: string;
    color: string;
}

export interface ILeadResponsible {
    name: string;
}

export interface ILeadContact {
    name?: string;
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

export interface IYupValiation {
    valid: boolean;
    errors: unknown;
}