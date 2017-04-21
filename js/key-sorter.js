function keySorter(array){

    array.forEach((val,index,array) =>{

        Object.assign(array[index], {key: index});

    });

    return array;
}



module.exports = keySorter;