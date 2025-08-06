<template>
  <footer id="footer">
    <p>Make Your Burguer &copy; 2022</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
#footer {
  height: 80px;
  background-color: #222;
  color: #fcba03;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 0 10px;
  font-size: 1rem;
}

@media (max-width: 768px) {
  #footer {
    font-size: 0.9rem;
    height: auto;
    padding: 10px;
  }
}
</style>
