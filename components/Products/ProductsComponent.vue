<template>
  <div class="container">
    <div v-if="products.length == 0">
      <h3>Список пуст</h3>
    </div>
    <div v-else>
      <div class="sort">
        <select
          v-model="selected"
          class="select"
        >
          <option disabled value="default">По умолчанию</option>
          <option value="ascending">По возростанию</option>
          <option value="descending">По убыванию</option>
          <option value="name">По имени</option>
        </select>
      </div>
      <div class="product__list">
        <transition-group name="fade" class="list__block">
          <div
            v-for="product in sortProducts"
            :key="product.id"
            class="product__item"
          >
            <div class="product__item-content">
              <div class="image__block">
                <img :src="product.linkImage" alt="" class="image__product">
              </div>
              <div class="product__content">
                <p class="title">{{ product.title }}</p>
                <p class="description">{{ product.description }}</p>
                <p class="price">{{ product.price }} руб.</p>
              </div>
              <button class="btn delete" @click.prevent="removeProduct(product.id)">
                <img src="@/assets/images/button-del.png">
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div
      class="product__add"
      :class="{visible: statusValue}"
    >Товар добавлен
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ProductsComponent",
  data() {
    return {
      selected: 'default',
    }
  },
  computed: {
    ...mapGetters(['products', 'statusValue']),
    sortProducts() {
      const data = Array.from(this.products)
      if (this.selected === "ascending") {
        console.log(1)
        data.sort((a, b) => +a.price.replace( /\s/g, "") - (+b.price.replace( /\s/g, "")))
      }
      if (this.selected === "descending") {
        data.sort((a, b) => +b.price.replace( /\s/g, "") - (+a.price.replace( /\s/g, "")))
      }
      if (this.selected === "name") {
        data.sort((a, b) => {
          if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
            return -1
          }
          return 0
        })
      }
      return data
    },
  },

  async mounted() {
    await this.loadProduct()
  },

  methods: {
    ...mapActions(['removeProduct', 'loadProduct'])
  }

}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}

.product__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.sort {
  display: flex;
  justify-content: flex-end;

  .select {
    background: #FFFEFB;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: none;
    padding: 10px;
    font-size: 12px;
    line-height: 15px;
    color: #363636;
    margin-right: 10px;

  }

  .select:focus, .select:active {
    border: none;
    outline: none;
  }
}

.list__block {
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  flex-wrap: wrap;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.product__item {
  flex: 0 0 auto;
  width: 33.333333%;
  max-height: 425px;
  height: 100%;
  padding: 10px;
  cursor: pointer;
  transform: scale(1);
  transition: 0.3s;

  .image__block {
    height: 200px;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover
    }
  }

  .product__item-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.5s;
    background: #FFFEFB;
    border-radius: 4px;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);


    .product__content {
      padding: 15px;
      width: 100%;
      height: 100%;

      .title {
        font-weight: 600;
        font-size: 20px;
        line-height: 25px;
        color: #3F3F3F;
        margin: 0 0 15px 0;
      }

      .description {
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #3F3F3F;
        margin-bottom: 15px;
        overflow-y: auto;
        height: 80px;
      }

      .price {
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        color: #3F3F3F;
      }
    }

    .btn {
      opacity: 0;
      transition: 0.5s;
      position: absolute;
      top: -5px;
      right: -5px;
      width: 32px;
      height: 32px;
      border: none;
      cursor: pointer;
      background: #FF8484;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  }

  .product__item-content:hover {
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }

  .product__item-content:hover .btn {
    transition: 0.5s;
    opacity: 1;
  }

}

.product__item:hover {
  transform: scale(1.01);
  transition: 0.3s;
}

.product__add {
  padding: 15px;
  border-radius: 10px;
  background: #c3fdbb;
  font-size: 18px;
  display: flex;
  position: absolute;
  left: 20px;
  bottom: 20px;
  opacity: 0;
  transition: 0.3s;
}

.visible {
  opacity: 1;
  transition: 0.3s;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #c4c4c4;
}

::-webkit-scrollbar-thumb {
  background-color: #2d2d2d;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #030303;
}

::-webkit-scrollbar-button:vertical:start:decrement {
  width: 0;
  height: 0;
  background: transparent;
}

::-webkit-scrollbar-button:vertical:end:increment {
  background: transparent;
  width: 0;
  height: 0;
}

::-webkit-scrollbar-button:horizontal:start:decrement {
  background: transparent;
  width: 0;
  height: 0;
}

::-webkit-scrollbar-button:horizontal:end:increment {
  background: transparent;
  width: 0;
  height: 0;
}

@media (max-width: 1024px) {
  .product__item {
    max-height: 300px;
    width: 50%;
    .image__block {
      height: 125px
    }
    .product__item-content {
      .product__content {
        padding: 10px;
        .title {
          font-size: 16px;
          line-height: 1

        }
        .description {
          font-size: 16px;
          line-height: 1;
          margin-bottom: 10px;
        }
        .price {
          font-size: 20px;
          line-height: 1
        }

      }
      .btn {
        opacity: 1;
        top: auto;
        right: 15px;
        bottom: 5px;
        width: 50px;
        height: 25px;
      }
    }
  }
}

@media (max-width: 480px) {
  .product__item {
    max-height: 300px;
    width: 100%;
  }
}
</style>
