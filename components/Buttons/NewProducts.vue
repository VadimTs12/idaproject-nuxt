<template>
  <div
       class="button-add-mob"
       @click="formBlock"
  >+</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "NewProducts",
  methods: {
    ...mapActions(['formBlock'])
  },
}
</script>

<style scoped>
.button-add-mob {
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background: #7BAE73;
  color: #EEEEEE;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

@media (min-width: 1024px) {
  .button-add-mob {
    display: none;
  }
}
</style>
