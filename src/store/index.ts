import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId.ts';


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList:[],
    createTagError:null,
    createRecordError:null
  } as MyState,
  mutations: {
    fetchTagList(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(!state.tagList||state.tagList.length === 0){
        store.commit('createTag','衣');
        store.commit('createTag','食');
        store.commit('createTag','住');
        store.commit('createTag','行');
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, tagName: string) {
      state.createTagError = null;
      const tags = state.tagList.map(value => value.name);
      if(tags.indexOf(tagName) >= 0) {
        state.createTagError = new Error('tag name duplicated');
      }else {
        const id = createId().toString();
        state.tagList.push({ id: id, name: tagName });
        store.commit('saveTags');
      }
    },
    removeTag(state, tagId: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === tagId) {
          index = i;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
      } else {
        window.alert('删除失败');
      }
    },
    updateTag(state, obj) {
      const { id, name } = obj;
      const oldTag = state.tagList.filter(item => item.id === id)[0];
      if (oldTag) {
        const nameList = state.tagList.map(item => item.name);
        if (nameList.indexOf(name) >= 0 && name !== oldTag.name) {
          window.alert('标签名已经存在');
        } else if(name === oldTag.name){
          window.alert('保存成功');
        }else {
          oldTag.name = name;
          store.commit('saveTags');
          window.alert('保存成功');
        }
      } else {
        window.alert('保存失败');
      }
    },

    fetchRecordList(state){
        state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state){
        window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state,record: RecordItem){
      state.createRecordError = null;
      if(record.tags.length > 0){
        const recordCopy = JSON.parse(JSON.stringify(record));
        recordCopy.createdAt = new Date().toISOString();
        state.recordList.push(recordCopy);
        store.commit('saveRecords');
      }else{
        window.alert('请至少选择一个标签');
        state.createRecordError = new Error('require tags');
        return;
      }
 
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store;
