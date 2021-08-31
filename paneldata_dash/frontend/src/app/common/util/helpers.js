import mcPanel from '../../data/sampleData'
import moment from 'moment'

export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], {id: e[0]}))
    }
}

export const objectParamsToArray = (object) => {
    let result = []
    if (object) {
        result = Object.keys(object).map(function (key) {
            return [key, object[key]];
        });
    }
    return result;

}


export const createCsvData = (markets, brands, categories, periods) => {
    let datas = [];

    for (let row in mcPanel) {
        let containMarkets = false;
        let containBrands = false;
        let containCategories = false;
        let containPeriods = false;
        let marketData = {};
        for (let item of mcPanel[row]) {
            if (markets.includes(item.value)) {
                containMarkets = true;
            }
            if (brands.includes(item.value)) {
                containBrands = true;
            }
            if (categories.includes(item.value)) {
                containCategories = true;
            }
            if (periods.includes(item.value)) {
                containPeriods = true;
            }
            marketData[item.column.toLowerCase()] = item.value;
        }
        if (containMarkets && containBrands && containCategories && containPeriods) {
            datas.push(marketData);
        }
    }
    return datas;

}

export const createCsvColumns = (facts) => {
    let columns = [{
        id: 'market',
        displayName: 'Market'
    }, {
        id: 'retailer',
        displayName: 'Retailer'
    },
        {
            id: 'department',
            displayName: 'Department'
        },
        {
            id: 'category',
            displayName: 'Category'
        }, {
            id: 'brand',
            displayName: 'Brand'
        },
        {
            id: 'period (4we)',
            displayName: 'Period (4we)'
        }];

    for (let item of facts) {
        columns.push({id: item.toLowerCase(), displayName: item})
    }

    return columns;

}


export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};


export const stringToDate = (dateStr, format) => {
    let dateMomentObject = moment(dateStr, format); // 1st argument - string, 2nd argument - format
    return dateMomentObject.toDate();
}

export const stringToDateNoFormat = (dateStr) => {
    if(dateStr.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)){
        let dateMomentObject = moment(dateStr, "yyyy-mm-dd"); // 1st argument - string, 2nd argument - format
        return dateMomentObject.toDate();
    }else if(dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{2}$/ )){
        let dateMomentObject = moment(dateStr, "mm/dd/yy"); // 1st argument - string, 2nd argument - format
        return dateMomentObject.toDate();
    }else{
        console.log('not match')
    }

}



export const b64toBlob = (b64Data) => {

    let block = b64Data.split(";");
    let contentType = block[0].split(":")[1];
    let realData = block[1].split(",")[1];

    contentType = contentType || '';
    let sliceSize = 512;

    let byteCharacters = atob(realData);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
