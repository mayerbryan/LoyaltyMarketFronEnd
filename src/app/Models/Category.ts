

export class Category{
    public categoryId : string;
    public categoryName : string;
    public categoryDescription : string;

    constructor(categoryId : string, categoryName : string, categoryDescription : string){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
    }
}