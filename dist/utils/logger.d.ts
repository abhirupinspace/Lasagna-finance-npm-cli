export declare class Logger {
    private static spinner;
    static init(text: string): void;
    static success(message: string): void;
    static error(message: string): void;
    static handleError(err: unknown): void;
    static info(message: string): void;
    static warn(message: string): void;
    static table(data: any[][]): void;
}
