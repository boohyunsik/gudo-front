
export const calculateLinearSpec = (initialValue: number, weight: number, level: number) => {
    return (initialValue + weight * (level - 1)).toFixed(1)
}
