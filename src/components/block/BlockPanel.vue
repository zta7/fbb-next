<script setup>
// import anime from 'animejs'
import { ref, watchEffect } from 'vue'

// const animation = ref(null)

const imgs = ref([
  'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg',
  'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg', 'http://p1.music.126.net/I1ov-NqsABjsdRkiAs9hZg==/109951167551824032.jpg',
  'http://p1.music.126.net/u3oq-WCH9xLEusEihNviSA==/109951167551773624.jpg',
  'http://p1.music.126.net/393c3Mu6_Gxvs1g9s3orfg==/109951167551722650.jpg',
  'http://p1.music.126.net/3NoXNKJqfrNS-HAuSpnTfA==/109951167552068501.jpg',
  'http://p1.music.126.net/yZBB7zaA36MAWneoyXItYg==/109951167551751589.jpg',
  'http://p1.music.126.net/tIYOCIa6yGhS-mCWsZ45IQ==/109951167551750897.jpg',
])

const index = ref(0)
const items = ref([])

watchEffect(() => {
  items.value = [...imgs.value.slice(index.value, index.value + 3)]
})

const onClick = () => {
  index.value += 1
}
</script>
<template>
  <TransitionGroup
    name="fade"
    tag="div"
    class="container row no-wrap items-center relative-position"
    @click="onClick()">
    <img
      v-for="(e, i) in items"
      :key="e"
      :src="e"
      :class="`box-${i}`"
      class="box">
  </TransitionGroup>
</template>
<style lang="scss" scoped>
  .container {
    // width: 400px;
  }
  .box {
    width: 300px;
  }

  .box-0{
    height: 150px;
  }
  .box-1 {
    height: 200px;
    z-index: 99
  }
  .box-2 {
    height: 150px;
  }

.fade-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
