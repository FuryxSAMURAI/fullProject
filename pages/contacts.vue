<template>
  <div class="contacts container">
    <h1>{{ $t("contacts") }}</h1>

    <section class="block">
      <h2>{{ $t('contactWithUs') }}</h2>
      <ul>
        <li>📩 Email: <a href="mailto:support@yourshop.com">support@store.com</a></li>
        <li>📱 Instagram: <a href="https://instagram.com/yourshop" target="_blank">@store</a></li>
        <li>📦 Telegram: <a href="https://t.me/yourshop" target="_blank">@store</a></li>
      </ul>
    </section>

    <section class="block">
      <h2>{{ $t('workingHours') }}</h2>
      <p>{{ $t('workingHoursMNToFR') }}<br />{{ $t('workingHoursDayOff') }}</p>
    </section>

    <section class="block">
      <h2>{{ $t('feedback') }}</h2>
      <p>{{ $t('questionOrSuggestion') }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "ContactsPage",
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  line-height: 1.7;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.block {
  margin-bottom: 30px;
}

.block h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.block ul {
  list-style: none;
  padding-left: 0;
}

.block ul li {
  margin-bottom: 8px;
}

.block a {
  color: #007bff;
  text-decoration: none;
}

.block a:hover {
  text-decoration: underline;
}
</style>
