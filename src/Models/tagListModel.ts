const itemName = 'tagList';

const tagListModel: TagList = {
    data: [] as Tag[],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(itemName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(itemName, JSON.stringify(this.data));
    },
    create(tagName: string) {
        const tags = this.data.map(value => value.name);
        if (tags.indexOf(tagName) >= 0) {
            return 'duplicated';
        } else {
            const newTag = {id:tagName,name:tagName}
            this.data.push(newTag);
            this.save();
            return 'success';
        }
    },
    remove(tagId: string){
        let index = -1;
        for(let i = 0; i<this.data.length;i++){
            if(this.data[i].id === tagId){
                index = i;
            }
        }
        if(index >= 0){
            this.data.splice(index,1);
            this.save();
            return true
        }else{
            window.alert('删除失败')
            return false
        }
    }
};
export default tagListModel;