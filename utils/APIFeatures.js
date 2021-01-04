module.exports = class {
    constructor(dbQuery, urlQuery) {
        this.dbQuery = dbQuery;
        this.urlQuery = urlQuery;
    }

    filter() {
        // basic filtering
        let queryObj = { ...this.urlQuery };
        const excludedFields = ["sort", "page", "limit", "fields"];
        excludedFields.forEach((field) => delete queryObj[field]);

        // advanced filtering
        queryObj = JSON.parse(
            JSON.stringify(queryObj).replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`)
        );

        this.dbQuery = this.dbQuery.find(queryObj);

        return this;
    }

    sort() {
        if (this.urlQuery.sort) {
            this.dbQuery = this.dbQuery.sort(this.urlQuery.sort.split(",").join(" "));
        } else {
            this.dbQuery = this.dbQuery.sort("-createdAt");
        }

        return this;
    }

    project() {
        if (this.dbQuery.fields) {
            this.dbQuery = this.dbQuery.select(this.dbQuery.fields.split(",").join(" "));
        } else {
            this.dbQuery = this.dbQuery.select("-__v");
        }
        return this;
    }

    paginate() {
        const page = +this.urlQuery.page || 1;
        const limit = +this.urlQuery.limit || 6;
        const skip = (page - 1) * limit;

        this.dbQuery = this.dbQuery.skip(skip).limit(limit);

        return this;
    }
};
