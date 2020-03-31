<template>
    <div v-if="logs && logs.length > 0" class="logs">
        <table>
            <tbody>
            <tr v-for="(log, index) in logs">
                <td>{{index+1}}</td>
                <td v-if="is_image_log">{{log}}</td>
                <td v-else v-html="processLogLine(log)"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="logs" style="display: flex" v-else>
        <p style="margin: auto; direction: rtl">در حال حاضر سرویس شما لاگ ندارد!</p>
    </div>
</template>

<script>
    import FLoading from "~/components/Loading";

    export default {
        props: ['logs', 'is_image_log'],
        components: {
            FLoading
        },
        data() {
            return {
                time_stamps: null,
                part_one: null
            }
        },
        methods: {
            processLogLine(line) {
                let parts = line.toString().split('->');
                console.log(parts)
                if (!parts) {
                    return line
                }
                let words = parts[0].match(/[+[a-zA-Z-0-9]+]/g);
                var phrase = '';
                for (let word of words) {
                    phrase += `<span style="background-color: rgba(0,229,255,0.5); margin-right: 2px; padding-left: 2px"> ${word} </span> `
                }
                phrase += ' -> ';
                parts[1] = parts[1].replace(/</gi, '&lt');
                parts[1] = parts[1].replace(/>/gi, '&gt');
                parts[1] = parts[1].replace(/&/gi, '&amp');
                parts[1] = parts[1].replace(/&lt/gi, '');
                parts[1] = parts[1].replace(/&gt/gi, '');
                parts[1] = parts[1].replace(/&amp/gi, '');
                let timestamps = parts[1].toString().match(/ [0-9.:T-]*Z/g);
                if (timestamps) {
                    for (let time of timestamps) {
                        parts[1] = parts[1].replace(time, `<span style="background-color: rgba(79,204,84,0.5); margin-right: 2px; padding-left: 2px; padding-right: 2px;"> ${time} </span> `);
                    }
                }
                phrase += parts[1];
                return phrase;
            }
        }
    }
</script>

<style scoped lang="stylus">
    .logs
        width 100%
        min-height 500px
        height available
        overflow-y scroll
        background #fff
        direction ltr
        padding 10px 0
        border-radius 3px
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)

        table
            tr
                td
                    width 100%
                    font-size 14px
                    height 25px
                    text-align left
                    padding 4px 4px 4px 0
                    font-family Roboto, sans-serif

                    &:first-child
                        min-width 50px
                        width max-content
                        text-align center

                &:nth-child(even)
                    td
                        &:first-child
                            background-color #f2f2f2

</style>
