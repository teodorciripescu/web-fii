const {
    cacheSimpleCategories, getSimpleCategories,
    cacheIntervalCategories, getIntervalCategories,
    cacheDropdownCategories, getDropdownCategories,
    cacheExplicitCategories, getExplicitCategories
    } = require('./categories');
module.exports = async function (categories) {
    // await cacheSimpleCategories();
    // await cacheDropdownCategories();
    // await cacheIntervalCategories();
    // await cacheExplicitCategories();

    const simpleCategories = await getSimpleCategories();
    const dropdownCategories = await getDropdownCategories();
    const intervalCategories = await getIntervalCategories();
    const explicitCategories = await getExplicitCategories();
    const allCategories = [...simpleCategories,...dropdownCategories,...intervalCategories,...explicitCategories];
    return allCategories;
}