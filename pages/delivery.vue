<template>
  <div class="delivery container">
    <h1>{{ $t("delivery") }}</h1>

    <section class="block">
      <h2>{{ $t('deliverTo') }}</h2>
      <p>{{ $t('deliverAllUkraine') }} 📦</p>
    </section>

    <section class="block">
      <h2>{{ $t('deliveryMethods') }}</h2>
      <ul>
        <li>🚚 {{ $t('novaPoshta') }}</li>
        <li>📦 {{ $t('ukrPoshta') }}</li>
        <li>🏬 {{ $t('Pickup') }}</li>
      </ul>
    </section>

    <section class="block">
      <h2>{{ $t('deliveryTime') }}</h2>
      <p>
        {{ $t('processedOrders') }}
      </p>
    </section>

    <section class="block">
      <h2>{{ $t('payOrder') }}</h2>
      <ul>
        <li>💳 {{ $t('paymentByCard') }}</li>
        <li>💵 {{ $t('cashOnDelivery') }}</li>
      </ul>
    </section>

    <section class="block">
      <h2>{{ $t('returns') }}</h2>
      <p>
        {{ $t('returnPolicy') }}
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "DeliveryPage",
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

.block ul li::before {
  content: "\2022";
  color: #000;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
</style>