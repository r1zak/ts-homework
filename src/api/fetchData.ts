export async function fetchData(URL: string): Promise<any> {
    try {
        const data = await fetch(URL).then((res) => res.json());
        return data;
    } catch (error) {
        console.log(error);
    }
}
