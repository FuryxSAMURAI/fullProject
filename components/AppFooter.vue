<template>
  <footer class="container__footer" style="position: relative;bottom: 0;left: 0;">
    <div class="footer__content">
      <div class="footer__logo">
        <nuxt-link to="/">STORE</nuxt-link>
      </div>
      <div class="footer__links">
        <nuxt-link to="/about">{{$t("about")}}</nuxt-link>
        <nuxt-link to="/delivery">{{$t("delivery")}}</nuxt-link>
        <nuxt-link to="/contacts">{{$t("contacts")}}</nuxt-link>
      </div>
      <div class="footer__social">
        <a href="https://instagram.com" target="_blank"
          ><i class="fa-brands fa-instagram"></i
        ></a>
        <a href="https://facebook.com" target="_blank"
          ><i class="fa-brands fa-facebook"></i
        ></a>
        <a href="mailto:store@example.com"
          ><i class="fa-solid fa-envelope"></i
        ></a>
      </div>
    </div>
    <div class="footer__bottom">
      © {{ new Date().getFullYear() }} STORE. Усі права захищено.
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.container__footer {
  border-top: 1px solid black;
  padding: 20px;
  margin-top: 40px;
  font-size: 14px;
  color: #333;
}
.footer__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.footer__logo a {
  font-weight: bold;
  font-size: 20px;
  color: #000;
  text-decoration: none;
}
.footer__links a {
  margin-right: 20px;
  text-decoration: none;
  color: #000;
}
.footer__social a {
  margin-right: 10px;
  font-size: 20px;
  color: #000;
}
.footer__bottom {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #888;
}
</style>
