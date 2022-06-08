<template>
  <q-drawer
    side="right"
    :width="360"
    bordered>
    <q-item
      dense
      clickable>
      <q-item-section avatar>
        <q-avatar size="md">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>
      <q-item-section>User Name</q-item-section>
      <q-item-section side>
        <q-btn
          icon="edit"
          size="sm"
          color="primary"
          dense
          flat
          round />
      </q-item-section>
    </q-item>
    <q-separator />
    <q-expansion-item
      icon="mdi-cogs"
      default-opened
      :content-inset-level="1"
      dense
      label="Perfers">
      <q-item
        tag="label"
        dense>
        <q-item-section avatar>
          <q-icon name="mdi-web" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Lang</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-select
            :model-value="$config.locale"
            square
            borderless
            dense
            :options="localeOptions"
            emit-value
            map-options
            @update:model-value="onUpdateLocale" />
        </q-item-section>
      </q-item>
      <q-item
        tag="label"
        dense>
        <q-item-section avatar>
          <q-icon name="mdi-view-agenda-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>View</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-select
            v-model="$config.view"
            square
            borderless
            dense
            :options="ViewOptions"
            emit-value
            map-options />
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <!-- <q-tabs
      v-model="$config.view"
      inline-label
      dense
      indicator-color="transparent"
      class="bg-grey-6 text-grey-4"
      active-bg-color="primary"
      active-color="white">
      <q-tab
        name="type"
        icon="mail"
        label="Default" />
      <q-tab
        name="namespace"
        icon="alarm"
        label="Namespace" />
    </q-tabs>
    <q-btn label="从XML导入" /> -->
  </q-drawer>
</template>
<script setup>
import { useConfigStore, ViewEnum } from 'stores/user'
import { localeOptions, setLocale } from 'boot/locale'

const ViewOptions = Object.entries(ViewEnum).map(([k, v]) => ({
  label: k,
  value: v,
}))

const $config = useConfigStore()
const onUpdateLocale = (v) => {
  setLocale(v)
  $config.locale = v
}
</script>
<style lang="scss" scoped>
  :deep(.q-item) {
    height: 40px;
  }
</style>
