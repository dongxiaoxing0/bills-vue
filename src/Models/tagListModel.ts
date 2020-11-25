import createId from '@/lib/createId';
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
            const id = createId().toString()
            this.data.push({id:id,name:tagName});
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
    },
    update(tagId: string,tagName: string){
        const oldTag = this.data.filter(item => item.id === tagId)[0];
        if(oldTag){
            const nameList = this.data.map(item => item.name);
            if(nameList.indexOf(tagName) >= 0){
                return 'duplicated';
            }else{
                oldTag.name = tagName;
                this.save();
                return 'success';
            }
        }else{
            return 'not found';
        }
    }
};
export default tagListModel;