import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId.ts';
type MyState = {
  tagList: Tag[];
}

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    tagList: [],
  } as MyState,
  mutations: {
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, tagName: string) {
      const tags = state.tagList.map(value => value.name);
      if(tags.indexOf(tagName) >= 0) {
        window.alert('标签名已经存在')
      }else {
        const id = createId().toString();
        state.tagList.push({ id: id, name: tagName });
        store.commit('saveTags');
        window.alert('添加成功');
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
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store;
