<template>
  <q-header
    style="background: inherit; color: inherit"
    class="shadow-1">
    <q-item style="height: 56px">
      <q-item-section>
        <q-item-label overline>
          {{ $block.block.name }}.{{ $block.block.namespace }}
        </q-item-label>
        <q-item-label caption>
          last edit 11 minutes ago
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div>
          <q-btn
            v-for="e in actions"
            :key="e.key"
            flat
            round
            dense
            :icon="e.icon" />
        </div>
      </q-item-section>
    </q-item>
  </q-header>
</template>
<script setup>
import { useBlockStore } from 'stores/block'

const actions = [
  { key: 'compile', icon: 'mdi-cog-clockwise' },
  { key: 'unitTest', icon: 'mdi-debug-step-over' },
]
const $block = useBlockStore()
</script>
