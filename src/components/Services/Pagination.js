export const paginate = (array, perPage, currentPage) => {

    let total = array.length;
    let pages = Math.ceil(total / perPage);
    let startIndex = (currentPage - 1) * perPage;
    let endIndex = startIndex + perPage;
    endIndex = total < endIndex ? total : endIndex;
    let sliced_array = array.slice(startIndex, endIndex);
    return { sliced_array, pages, total, startIndex, endIndex };
}