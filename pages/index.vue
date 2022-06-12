<template>

 <div class="main">
   <div class="content">
     <FormComponent/>
     <ProductsComponent/>
   </div>
   <NewProducts/>
 </div>
</template>

<script>
import FormComponent from "~/components/Form/FormComponent";
import ProductsComponent from "~/components/Products/ProductsComponent";
import NewProducts from "~/components/Buttons/NewProducts";


export default {
  name: 'IndexPage',
  components: {NewProducts, FormComponent,ProductsComponent},

}
</script>
<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
  .content {
    display: flex;
    margin: 20px 0;
  }
}
@media (max-width: 1024px) {
  .main {
    padding: 32px 10px
  }
}
</style>
