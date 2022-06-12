<template>
  <div
    class="form__block"
    :class="{active: formBlockValue}"
    @click="formBlock"
  >
    <div
      @click.stop
    >
      <h1>Добавление товара</h1>
      <form action="" class="form" @submit.prevent="addProductNew()">
        <div class="input__block">
          <label for="name">
            Наименование товара
            <span v-if="!product.title"></span>
          </label>
          <input
            id="name"
            v-model="product.title"
            type="text"
            placeholder="Введите наименование товара"
            class="input"
            :class="{error: isTitleError}"
            @blur="inputBlurTitle = true"
            @keypress.enter.prevent
          >
          <div v-if="isTitleError" class="error-txt">Поле является обязательным</div>
        </div>

        <div class="input__block">
          <label for="description">Описание товара </label>
          <textarea
            id="description"
            v-model="product.description"
            placeholder="Введите описание товара"
            class="textarea"
            @keypress.enter.prevent
          ></textarea>
        </div>
        <div class="input__block">
          <label for="link-img">
            Ссылка на изображение товара
            <span v-if="!product.linkImage"></span>
          </label>
          <input
            id="link-img"
            v-model="product.linkImage"
            type="text"
            placeholder="Введите ссылку"
            class="input"
            :class="{error: isLinkImageError}"
            @blur="inputBlurLinkImage = true"
            @keypress.enter.prevent
          >
          <div v-if="isLinkImageError" class="error-txt">Поле является обязательным</div>
        </div>
        <div class="input__block">
          <label for="price">
            Цена товара
            <span v-if="!product.price"></span>
          </label>
          <input
            id="price"
            v-model="product.price"
            type="text"
            placeholder="Введите цену"
            class="input"
            :class="{error: isPriceError}"
            @blur="inputBlurPrice = true"
            @input="handlerNumber"
            @keypress.enter.prevent
          >
          <div v-if="isPriceError" class="error-txt">Поле является обязательным</div>
        </div>
        <button
          type="submit"
          class="btn"
          :class="{primary: !isValidate}"
          :disabled="isValidate"
          @keypress.enter.prevent
        >Добавить товар
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "FormComponent",
  data() {
    return {
      product: {
        title: '',
        description: '',
        linkImage: '',
        price: ''
      },
      inputBlurTitle: false,
      inputBlurLinkImage: false,
      inputBlurPrice: false
    }
  },
  computed: {
    isValidate() {
      return !(this.product.title && this.product.linkImage && this.product.price)
    },
    isTitleError() {
      return !this.product.title && this.inputBlurTitle;
    },
    isLinkImageError() {
      return !this.product.linkImage && this.inputBlurLinkImage;
    },
    isPriceError() {
      return !this.product.price && this.inputBlurPrice;
    },
    ...mapGetters(['formBlockValue'])
  },
  methods: {
    ...mapActions(['addProduct', 'formBlock']),
    addProductNew() {
      this.addProduct(this.product)
      this.inputBlurTitle = false
      this.inputBlurLinkImage = false
      this.inputBlurPrice = false
      this.product = {
        title: '',
        description: '',
        linkImage: '',
        price: ''
      }
    },
    handlerNumber() {
      const numberFormatter = new Intl.NumberFormat('ru-RU')
      this.product.price = numberFormatter.format(Number(this.product.price.replace( /\s/g, "")))
      if (!/^[\d\s]+$/.test(this.product.price)) {
        this.product.price = null
      }
    }


  }
}
</script>

<style scoped lang="scss">
.form__block {
  width: 40%;
  margin-right: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  height: max-content;
  margin-top: 10px;

  .input__block {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .input, .textarea {
    padding: 10px;
    resize: none;
    font-size: 16px;
    background: #FFFEFB;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: none;
    margin-bottom: 15px;
  }

  .input::placeholder, .textarea::placeholder {
    font-size: 12px;
    line-height: 15px;
    color: #B4B4B4;
  }

  textarea:focus, input:focus {
    outline: none;
  }

  label {
    display: flex;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #49485E;
    margin-bottom: 10px;

    span {
      width: 4px;
      height: 4px;
      display: block;
      background: #FF8484;
      border-radius: 4px;
      margin-left: 5px;
    }
  }

  .btn {
    margin: 10px;
    padding: 10px;
    background: #EEEEEE;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #B4B4B4;
    cursor: not-allowed;
  }

  .error-txt {
    font-size: 10px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: #FF8484;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .error {
    outline: 1px solid #FF8484;
  }

  .primary {
    background: #7BAE73;
    color: #ffffff;
    cursor: pointer;
  }
}

@media (max-width: 1024px) {
  .form__block {
    transform: translateY(-120%);
    transition: 0.3s;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    background: rgba(218, 218, 218, 0.82);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .active {
    transform: translateY(0%);
    transition: 0.3s;

  }

}

</style>
