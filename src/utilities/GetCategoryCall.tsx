

const GetApiCategory = async (url: string): Promise<string[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};
export default GetApiCategory;
