class FeatureController{

    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }

    search(){
        const keyword = this.queryString.keyword
        //console.log(keyword);

        // TERNARY OPERATOR
        ? {
            name : {
                $regex : this. queryString.keyword,
                $options : 'i'
            }
        }
        : {};

        this.query = this.query.find({...keyword})

        return this;
    }

    filter(){

        const queryCopy = {...this.queryString}
        //console.log(queryCopy)
        
        //const removefields = ['keyword','page','limit']

        //removefields.forEach((key) => delete queryCopy[key])
        //console.log(queryCopy);

        // FILTER FOR PRICE & RATINGS

        let queryString = JSON.stringify(queryCopy)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryString));
        
        //console.log(queryString);
        return this;

    }

    pagination(resultPerPage){

        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}

module.exports = FeatureController