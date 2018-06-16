module.exports = (str) => {
    if (!str) {
        return '';
    }

    return (str[0].toUpperCase() + str.slice(1)).replace(/-[a-z]/g, item => {
        return item[1].toUpperCase();
    });
};
