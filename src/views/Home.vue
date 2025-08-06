<template>
  <Banner />
  <div class="main-container">
    <h1>Monte o seu burguer:</h1>
    <BurguerForm />
  </div>
</template>

<script>
import BurguerForm from "@/components/BurguerForm.vue";
import Banner from "../components/Banner.vue";

export default {
  name: "Home",
  components: {
    Banner,
    BurguerForm,
  },
};
</script>

<style>
.main-container {
  margin-top: 20px;
}
</style>
