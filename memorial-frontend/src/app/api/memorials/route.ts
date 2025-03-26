export const fetchMemorials = async () => {
    const res = await fetch("/api/memorials");
    return res.json();
};

export const addMemorial = async (memorialData: any) => {
    await fetch("/api/memorials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memorialData),
    });
};

