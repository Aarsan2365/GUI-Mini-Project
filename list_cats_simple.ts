async function getCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

getCategories();
