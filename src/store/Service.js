export const listProject = async () => {
    const res = await fetch('../data/data.json')
    let tabArticles = await res.json();
    return tabArticles
}