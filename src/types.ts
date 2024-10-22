export enum Label {
    personal = "personal",
    study = "study",
    work = "work",
    other = "other",
}
 
 export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    favorited: boolean;
}

export type GroceryItem = { name: string; isPurchased: boolean };
 
 