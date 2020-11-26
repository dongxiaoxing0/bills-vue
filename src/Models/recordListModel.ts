const  itemName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(itemName) || '[]') as RecordItem[];
        return this.data;
    },
    save(){
        window.localStorage.setItem(itemName, JSON.stringify(this.data));
    },
    create(record: RecordItem){
        const recordCopy = JSON.parse(JSON.stringify(record));
        recordCopy.createdAt = new Date();
        this.data.push(recordCopy);
        this.save();    
    }
}
export default recordListModel;