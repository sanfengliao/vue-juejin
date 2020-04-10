export const keepAliveMixin = {
  created() {
    this.$store.dispatch('addKeepAlive', this.$options.name)
  },
  methods: {
    goBackAndRemoveKeepAlive() {
      this.$store.dispatch('removeKeepAlive', this.$options.name)
      this.$router.goBack()
    }
  }
}