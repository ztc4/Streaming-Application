export  const customJSON = (data: any) =>
    JSON.stringify(data, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    );