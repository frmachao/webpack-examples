exports.getEntry = (ENTRY_FILESNAME) => {
    let str = '';
    for (i in ENTRY_FILESNAME) {
        str += `${i}=${ENTRY_FILESNAME[i]} `;
    }
    return str;
}
