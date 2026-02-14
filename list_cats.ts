import axios from 'axios';

async function getCategories() {
    try {
        const response = await axios.get('https://dummyjson.com/products/category-list');
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

getCategories();
