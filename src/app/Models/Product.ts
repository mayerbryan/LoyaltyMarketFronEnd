import { Category } from "./Category";


export class Product{
    public productId : string;
    public productName : string;
    public productDescription : string;
    public productPrice : number;
    public productColor : string;
    public productCategory : Category;

    constructor(productId : string, productName : string, productDescription : string, productPrice :  number, productColor : string, productCategory : Category){
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productColor = productColor;
        this.productCategory = productCategory;
    }
}