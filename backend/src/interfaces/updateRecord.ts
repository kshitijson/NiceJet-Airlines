interface UpdateRecord {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: string | null,
    upsertedCount: number,
    matchedCount: number
}

export type { UpdateRecord }