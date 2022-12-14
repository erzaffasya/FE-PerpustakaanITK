<script>
import { layoutComputed } from "@/state/helpers";

import Vertical from "./vertical";
// import Horizontal from "./horizontal";
// import TwoColumns from "./twocolumn";

export default {
  components: {
    Vertical,
    // Horizontal,
    // TwoColumns
  },
  setup() {
   
  },
  data() {
    return {
      user: {},
      isLoad: false,
      role: null,
    };
  },

  methods: {},
  computed: {
    ...layoutComputed,
  },
  created() {
  },
  mounted() {},
};
</script>

<template>
  <div>
    <Vertical :layout="layoutType">
      <slot />
    </Vertical>

    <!-- <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
        <slot />
    </Horizontal>

    <TwoColumns v-if="layoutType === 'twocolumn'" :layout="layoutType">
        <slot />
    </TwoColumns> -->
  </div>
</template>
