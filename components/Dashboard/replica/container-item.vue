<template>
    <div class="replica-containers-items">
        <div class="replica-containers-item">
            <strong>نام کانتینر:</strong>
            <span>{{name}}</span>
        </div>
        <div class="replica-containers-item">
            <strong>ایمیج:</strong>
            <span>{{image}}</span>
        </div>
        <div class="replica-containers-item">
            <strong>وضعیت:</strong>
            <span class="success-text">{{state | state}}</span>
        </div>
        <div v-if="terminated">
            <div class="replica-containers-item">
                <strong>وضعیت قبلی:</strong>
                <span class="error-text">{{terminated.reason}}</span>
            </div>

            <div v-if="terminated.message" class="replica-containers-item">
                <strong>توضیح:</strong>
                <span class="error-text">{{terminated.message}}</span>
            </div>
        </div>
        <div v-else-if="waiting">
            <div class="replica-containers-item">
                <strong>وضعیت قبلی:</strong>
                <span class="pending-text">{{waiting.reason}}</span>
            </div>
            <div v-if="waiting.message" class="replica-containers-item">
                <strong>توضیح:</strong>
                <span class="pending-text">{{waiting.message}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "replica-containers-items",
        props: {
            terminated: {
                type: Object,
                default: null
            },
            waiting: {
                type: Object,
                default: null
            },
            name: {
                type: String,
                default: ""
            },
            image: {
                type: String,
                default: ""
            },
            state: {
                // type: String,
                default: ""
            },
            color: {
                type: String,
                default: "success-text" // error-text , pending-text
            }
        },
        filters: {
            state(value) {
                return !value ? 'در حال ارزیابی' : "آماده شده";
            },
            terminated(value) {
                return !value ? null : value
            },
            waiting(value) {
                return !value ? null : value
            }
        },
        computed: {
            stateColor() {
                if (!this.state) return '';
                return this.state ? "success-text" : "error-text";
            }
        },
    };
</script>

<style lang="stylus" scoped>
    .replica-containers-items
        column-count 2
        flex-direction column
        font-family yekan
        overflow-x hidden
        @media only screen and (max-width 992px)
            display flex
            column-count 1

        .replica-containers-item
            strong
                margin-left 5px

            .elips
                display inline-block
                overflow hidden
                vertical-align middle
                text-overflow ellipsis
                white-space nowrap
                font-size 14px
                direction ltr

            span, strong
                color #4f4f4f
                text-align right
                font-style normal
                font-stretch normal
                font-size 14px
                line-height 3
</style>
