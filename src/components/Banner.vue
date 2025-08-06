<template>
  <div id="main-banner">
    <h1>Make Your Burguer</h1>
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style scoped>
#main-banner {
  background-image: url("../../public/img/burger.jpg");
  background-position: center;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-banner h1 {
  color: #fff;
  font-size: 60px;
  background-color: rgba(34, 34, 34, 0.85);
  padding: 20px 40px;
}

@media (max-width: 1024px) {
  #main-banner {
    height: 400px;
  }

  #main-banner h1 {
    font-size: 45px;
    padding: 15px 30px;
    margin: 0;
  }
}

@media (max-width: 768px) {
  #main-banner {
    height: 300px;
  }

  #main-banner h1 {
    font-size: 32px;
    padding: 10px 20px;
    text-align: center;
  }
}
</style>
