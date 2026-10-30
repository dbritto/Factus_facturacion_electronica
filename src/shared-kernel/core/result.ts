export class Result<T> {
    public readonly isSuccess: boolean;
    public readonly isFailure: boolean;
    public readonly error?: string;
    private readonly _value?: T;

    private constructor(isSuccess: boolean, error?: string, value?: T) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
        Object.freeze(this); // Inmutable
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error(`No puedes hacer getValue() de un Result fallido: ${this.error}`);
        }
        return this._value as T;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }
}