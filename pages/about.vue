<template>
    <div class="about container">
        <h1>{{ $t("about") }}</h1>

        <section class="block">
            <h2>{{ $t('whoWeAre') }}</h2>
            <p>
                {{ $t('weAreOnlineClothing') }}
            </p>
        </section>

        <section class="block">
            <h2>{{ $t('whatWeOffer') }}</h2>
            <ul>
                <li>👕 {{ $t('cloting') }}</li>
                <li>🎒 {{ $t('accessories') }}</li>
                <li>📸 {{ $t('photos') }}</li>
            </ul>
        </section>

        <section class="block">
            <h2>{{ $t('goal') }}</h2>
            <p>
                {{ $t('goalShopping') }}
            </p>
        </section>

        <section class="block">
            <h2>{{ $t('advantages') }}</h2>
            <ul>
                <li>✅ {{ $t('reasonablePrices') }}</li>
                <li>🚚 {{ $t('deliverAllUkraine') }}</li>
                <li>🔁 {{ $t('easyReturn') }}</li>
                <li>💬 {{ $t('supportInDirect') }}</li>
            </ul>
        </section>

        <section class="block">
            <h2>{{$t('workForYou')}}</h2>
            <p>{{ $t('workFromMNtoFR') }}</p>
        </section>
    </div>
</template>

<script>
export default {
    name: "AboutPage",
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