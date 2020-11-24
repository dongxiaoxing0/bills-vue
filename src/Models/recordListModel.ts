const  itemName = 'recordList';
const recordListModel = {
    fetch(){
        return JSON.parse(window.localStorage.getItem(itemName) || '[]') as RecordItem[];
    },
    save(data: RecordItem[]){
        window.localStorage.setItem(itemName, JSON.stringify(data));
    }
}
export default recordListModel;