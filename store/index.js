import axios from "axios";

export const state = () => ({
  products: [],
  formBlockValue: false,
  statusValue: null
})

export const getters = {
  products: state => state.products,
  formBlockValue: state => state.formBlockValue,
  statusValue: state => state.statusValue
}

export const mutations = {
  ADD_PRODUCT(state, data) {
    state.products.push({
      title: data.product.title,
      description: data.product.description,
      linkImage: data.product.linkImage,
      price: data.product.price,
      id: data.name,
    })
  },

  REMOVE_PRODUCT(state, id) {
    state.products = state.products.filter(elem => elem.id !== id)
  },

  LOAD_PRODUCTS(state, {data}) {
    if (!data) {
      state.product = []
    }
    state.products = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      }
    })
  },
  FORM_BLOCK(state) {
    state.formBlockValue = !state.formBlockValue
  },
  STATUS_VALUE(state, value) {
    state.statusValue = value

  }
}

export const actions = {
  async addProduct({commit}, product) {
    try {
      const response = await axios.post('https://nuxt-db-5c42b-default-rtdb.europe-west1.firebasedatabase.app/product.json', {
        title: product.title,
        description: product.description,
        linkImage: product.linkImage,
        price: product.price
      })
      console.log(response.status)
      if( response.status === 200 ) {
        commit('STATUS_VALUE', true)
        setTimeout(() => {
          commit('STATUS_VALUE', false)
        }, 3000)
      } else {
        commit('STATUS_VALUE', false)
      }

      const firebaseData = await response.data
      const data = {
        name: firebaseData.name,
        product
      }
      commit('ADD_PRODUCT', data)
    } catch (e) {
      console.log(e.message)
    }
  },

  async removeProduct({commit, state}, id) {
    try {
      await axios.delete(`https://nuxt-db-5c42b-default-rtdb.europe-west1.firebasedatabase.app/product/${id}.json`)
      commit('REMOVE_PRODUCT', id)
    } catch (e) {
      console.log(e.message)
    }
  },

  async loadProduct({commit}) {
    try {
      const {data} = await axios.get('https://nuxt-db-5c42b-default-rtdb.europe-west1.firebasedatabase.app/product.json');
      if (!data) {
        throw new Error('Список пуст')
      }
      commit('LOAD_PRODUCTS', {data})
    } catch (e) {
      console.log(e.message)
    }
  },
  formBlock({commit}) {
    commit('FORM_BLOCK')
  }
}


