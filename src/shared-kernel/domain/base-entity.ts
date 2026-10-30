import crypto from 'node:crypto';

export interface BaseEntityProps {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export abstract class BaseEntity {
    public readonly id: string;
    public readonly createdAt: Date;
    protected _updatedAt: Date;
    protected _deletedAt: Date | null;

    protected constructor(base?: BaseEntityProps) {
        this.id = base?.id ?? crypto.randomUUID();
        this.createdAt = base?.createdAt ?? new Date();
        this._updatedAt = base?.updatedAt ?? new Date();
        this._deletedAt = base?.deletedAt ?? null;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get deletedAt(): Date | null {
        return this._deletedAt;
    }

    get isDeleted(): boolean {
        return this._deletedAt !== null;
    }

    public markAsDeleted(): void {
        if (!this.isDeleted) {
            const now = new Date();
            this._deletedAt = now;
            this._updatedAt = now;
        }
    }

    protected touch(): void {
        this._updatedAt = new Date();
    }
}