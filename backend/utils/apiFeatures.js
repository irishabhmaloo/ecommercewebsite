class ApiFeatures {
    constructor (query, queryStr) {
        this.query = query; // method (eg. find())
        this.queryStr = queryStr; // keyword
    }


    // Search using product name
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, // mongodb operator
                $options: "i", // case insenstive
            }
        } : {};

        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    } 


    // filer by category
    filter() {
        const queryTemp = {...this.queryStr} // spread operator used to get copy and not reference of original object
    
        // console.log(queryTemp);
        
        // removing some fields
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryTemp[key]);
        
        // filter for Price & Ratings
        let queryStr = JSON.stringify(queryTemp);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`); // MongoDB: gt = $gt

        // console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }


    // Pagination
    pagination(resultsPerPage) {
        const currentPage = +this.queryStr.page || 1;
        const skip = resultsPerPage * (currentPage - 1); // how many products to skip

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;