export function convertBigIntToNumber(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            typeof value === "bigint" ? Number(value) : value
        ])
    );
}