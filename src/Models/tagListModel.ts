const itemName = 'tagList';
type Tag = {
    id: string;
    name: string;
};
type TagList = {
    data: Tag[];
    fetch: () => Tag[];
    save: () => void;
    create: (tagName: string) => 'success' | 'duplicated' | 'void';
};

const tagListModel: TagList = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(itemName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(itemName, JSON.stringify(this.data));
    },
    create(tagName: string) {
        this.fetch();
        const tags = this.data.map(value => value.name);
        if (tags.indexOf(tagName) >= 0) {
            return 'duplicated';
        } else {
            const newTag = {id:tagName,name:tagName}
            this.data.push(newTag);
            this.save();
            return 'success';
        }
    }
};
export default tagListModel;