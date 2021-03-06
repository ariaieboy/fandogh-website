<template>
  <div class="wizard">
    <div class="wizard-progress">
      <div class="wizard-progress-steps">
        <div
          class="step-container"
          v-for="(step, index) in _steps"
          :class="{'current': index === current_state, 'before': index < current_state}"
        >
          <div class="step">
            <router-link :to="prevent ? $route.fullPath : step.path">
              <span>{{(index+1).toLocaleString("fa-EG")}}</span>
            </router-link>
            <!-- current_state -->
            <p v-if="windowWidth >= 1170">{{step.title}}</p>

            <p v-else-if="index === current_state">{{step.title}}</p>
          </div>
          <div v-if="index+1 < _steps.length" class="line"></div>
        </div>
      </div>
    </div>
    <form v-form>
      <div class="wizard-content">
        <slot/>
      </div>

      <div class="wizard-footer">
        <f-button v-if="back" :path="back.path" styles="red">مرحله قبل</f-button>
        <f-button v-if="next && prevent" styles="gray disabled">مرحله بعد</f-button>
        <f-button v-if="next && !prevent" :path="next.path" styles="blue">مرحله بعد</f-button>
        <f-button v-if="back && !loading && !prevent" @onClick="finish" :styles="built">اتمام ساخت</f-button>
        <f-button v-if="back && loading" :styles="built">در حال ساخت...</f-button>
      </div>
    </form>
  </div>
</template>

<script>
import FButton from "~/components/elements/button";
import ErrorReporter from '~/utils/ErrorReporter'
import { removeValue } from "~/utils/cookie";
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    btn_title: {
      default: ""
    },
    prevent: {
      default: false
    },
    steps: {
      default: null,
      type: Array
    }
  },
  components: {
    FButton
  },
  mounted() {
    let manifest = this.$store.state.manifest
    if (!Object.keys(manifest).length) this.$router.push({ path: this._steps[0].path })
    this.persistData(manifest)
  },
  destroyed() {
    if (!this.$route.path.includes('/services/')) {
      this.$store.commit('SET_DATA', { id: 'manifest', data: {} })
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    },
    wizard() {
      return this.$store.state.wizard
    },
    built() {
      return this.next ? 'border black transparent' : 'blue'
    },
    _steps() {
      let steps = this.steps || this.wizard.steps;
      return steps.map(
        item =>
          this.$route.fullPath === item.path
            ? { ...item, current: true }
            : { ...item, current: false }
      );
    },
    current_state() {
      return this._steps.findIndex(item => item.current);
    },
    back() {
      return this._steps[this.current_state - 1]
    },
    next() {
      return this._steps[this.current_state + 1]
    }
  },
  methods: {
    persistData(manifest) {
      for (let key in manifest) {
        if (manifest.hasOwnProperty(key)) {
          if (typeof manifest[key] === 'object' && !Array.isArray(manifest[key])) {
            this.persistData(manifest[key])
          }
          else {
            if (this.$parent.hasOwnProperty(key)) {
              this.$parent[key] = manifest[key]
            }
          }
        }
      }
    },
    finish(e) {
      this.$emit('onFinish', e)
      this.loading = true
      this.$store.commit("SET_DATA", { data: true, id: "loading" });
      this.$store.dispatch('createServiceManifest').then(res => {
        this.loading = false
        removeValue('name')
        removeValue('versions')
        this.$store.commit("SET_DATA", { id: "service", data: res });
        this.$router.push(`/dashboard/services/${res.name}`)
        this.$store.commit('SET_DATA', { id: 'manifest', data: {} })
      }).catch(e => {
        this.loading = false
        // ErrorReporter(e, [], true).forEach(error => {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        //
        // })
        this.$notify({
          title: e,
          time: 4000,
          type: 'error'
        })
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/mixins.styl'

.wizard
  padding-right 30px
  &-footer
    margin-top 100px
    a
      margin-bottom 30px
      margin-left 20px
  &-progress
    &-steps
      position relative
      display flex
      justify-content space-between
      width max-content
      .step-container
        display flex
        margin-bottom 100px
        .line
          margin 18px -2px
          width 90px
          height 6px
          border solid 1px #e7e8ea
          border-radius 10px
          background-color #f0f0f0
        .step
          position relative
          z-index 1
          &:last-child
            margin-left 0
          a
            display flex
            justify-content center
            align-items center
            width 36px
            height 36px
            border solid 1px #e7e8ea
            border-radius 50%
            background-color #f0f0f0
          span
            color #bfbfbf
          p
            position absolute
            right -25px
            width 100px
            text-align center
            font-size 16px
        &.before
          .line
            border solid 1px #2cac46
            background-color #2cac46
          a
            background-color #2cac46
            span
              color #fff
        &.current
          a
            background-color #296bdd
            span
              color #fff
@media tablet
  .wizard
    &-progress
      &-steps
        .step-container
          .line
            width 30px
@media mobile
  .wizard
    &-progress
      &-steps
        .step-container
          .line
            width 15px
</style>
