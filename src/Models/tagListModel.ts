const  itemName = 'tagList';
type TagList = {
    data: string[];
    fetch: () => string[];
    save: () => void;
    create: (tagName: string) => 'success'|'duplicated'|'void';
}

const tagListModel: TagList = {
    data:[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(itemName) || '[]');
        return this.data
    },
    save(){
        window.localStorage.setItem(itemName, JSON.stringify(this.data));
    },
    create(tagName: string){
        if(this.data.indexOf(tagName)>=0){
            return 'duplicated';
        }else{
            this.data.push(tagName);
            this.save();
        return 'success';
        }
    }
}
export default tagListModel;