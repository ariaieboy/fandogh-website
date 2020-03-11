<template>

    <div>
        <div style="margin-top: 12px;">

            <config-box :section-title="sections.post_start_command_config" :tooltip="sections.post_start_command_tooltip">
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0" v-on:keydown.enter.prevent="addPostStartCommands">
                    <div style="display: flex">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0045ff"
                                v-model="post_start_command"
                                v-on:keydown.enter.prevent="addPostStartCommands"
                                :label="lifecycle_commands_obj.post_start_command_label"
                                :hint="lifecycle_commands_obj.post_start_command_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.post_start_command"></popover>
                    </div>

                    <span @click="addPostStartCommands" class="add-button">افزودن دستور</span>
                </form>

                <div class="remove-command col-lg-6 col-md-6 col-xs-12 col-sm-12"
                     style="display: flex; flex-wrap: wrap; justify-content: left; direction: ltr; font-family: iran-yekan; line-height: 1.2; color: #7f828b">[
                    <span v-for="(command, index) in manifest_model.post_start_commands"
                          :key="index"
                          style="direction: ltr; line-height: 1.2; color: #7f828b; cursor: default; font-family: iran-yekan"
                    >{{index !== manifest_model.post_start_commands.length - 1 ? `\"${command}\", ` : `\"${command}\"`}}</span>
                    ]
                    <span v-if="manifest_model.post_start_commands.length > 0" class="remove-btn" @click="removePostStartCommands">حذف دستور</span>
                </div>
            </config-box>

            <config-box :section-title="sections.pre_stop_command_config" :tooltip="sections.pre_stop_command_tooltip" >
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0" v-on:keydown.enter.prevent="addPreStopCommand">
                    <div style="display: flex">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0045ff"
                                v-on:keydown.enter.prevent="addPreStopCommand"
                                v-model="pre_stop_command"
                                :label="lifecycle_commands_obj.pre_stop_command_label"
                                :hint="lifecycle_commands_obj.pre_stop_command_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.pre_stop_command"></popover>
                    </div>
                    <span @click="addPreStopCommand" class="add-button">افزودن دستور</span>
                </form>

                <div class="remove-command col-lg-6 col-md-6 col-xs-12 col-sm-12"
                     style="display: flex; flex-wrap: wrap; justify-content: left; direction: ltr; font-family: iran-yekan; line-height: 1.2; color: #7f828b">[
                    <span v-for="(command, index) in manifest_model.pre_stop_commands"
                          :key="index"
                          style="direction: ltr; line-height: 1.2; color: #7f828b; cursor: default; font-family: iran-yekan"
                    >{{index !== manifest_model.pre_stop_commands.length - 1 ? `\"${command}\", ` : `\"${command}\"`}}</span>
                    ]
                    <span v-if="manifest_model.pre_stop_commands.length > 0" class="remove-btn" @click="removePreStopCommands">حذف دستور</span>
                </div>
            </config-box>

        </div>
    </div>

</template>

<script>

    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";

    export default {
        name: "lifecycle-methods-setup",
        props: {
            manifest_model: {
                type: Object,
                required: true
            }
        },
        model: {
            prop: 'manifest_model',
        },
        components: {
            Popover,
            ConfigBox
        },
        data() {
            return {
                post_start_command: '',
                pre_stop_command: '',
                lifecycle_commands_obj: {
                    post_start_command_label: 'Post Start Command',
                    post_start_command_hint: 'دستور مورد نظر خود را به صورت آرایه‌ای و بخش بخش وارد کرده و در انتها هر بخش enter را فشار دهید',
                    pre_stop_command_label: 'Pre Stop Command',
                    pre_stop_command_hint: 'Argumentهای مورد نظر خود را به صورت تک تک وارد کرده و در انتهای هر کدام کلید enter را فشار دهید.'
                },
                tooltips: {
                    post_start_command: {
                        title: 'Post Start Command',
                        text: 'دستور یا دستوراتی که بعد از شروع سرویس قصد دارید اجرا شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-lifecycle-handlers.html#%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D9%87%D8%A7%DB%8C-post-start-command-%D9%88-pre-stop-command'
                    },
                    pre_stop_command: {
                        title: 'Pre Stop Command',
                        text: 'دستور یا دستوراتی که قبل از توقف سرویس قصد دارید اجرا شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-lifecycle-handlers.html#%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D9%87%D8%A7%DB%8C-post-start-command-%D9%88-pre-stop-command'
                    }
                },
                sections: {
                    post_start_command_config: 'Post Start Command',
                    post_start_command_tooltip: {
                        title: 'Post Start Command',
                        text: 'فندق دستور post_start_command را سریعا بعد از اجرای سرویس اجرا می‌کند ولی ضمانتی وجود ندارد که این دستور دقیقا قبل از اجرای دستورات entrypoint اجرا شود.\n' +
                            'دستور post_start_command به صورت موازی اجرا می‌شود ولی فندق تا زمان پایان یافتن دستور post_start_command اجرای سرویس را به تاخیر می‌اندازد.',
                        url: 'https://docs.fandogh.cloud/docs/service-lifecycle-handlers.html#%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D9%87%D8%A7%DB%8C-post-start-command-%D9%88-pre-stop-command'
                    },
                    pre_stop_command_config: 'Pre Stop Command',
                    pre_stop_command_tooltip: {
                        title: 'Pre Stop Command',
                        text: 'فندق دستور pre_stop_command را درست قبل از پایان یافتن یا همان destroy شدن سرویس اجرا می‌کند و تا زمانی که این دستور بطور کامل اجرا نشده باشد، پایان یافتن سرویس را به تاخیر می‌اندازد.',
                        url: 'https://docs.fandogh.cloud/docs/service-lifecycle-handlers.html#%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D9%87%D8%A7%DB%8C-post-start-command-%D9%88-pre-stop-command'
                    }
                }
            }
        },
        methods: {

            addPostStartCommands() {
                if (this.post_start_command.trim().length > 0) {
                    this.manifest_model.post_start_commands.push(this.post_start_command.trim());
                    this.post_start_command = '';
                }
            },
            removePostStartCommands() {
                this.manifest_model.post_start_commands = [];
            },
            addPreStopCommand() {
                if (this.pre_stop_command.trim().length > 0) {
                    this.manifest_model.pre_stop_commands.push(this.pre_stop_command.trim());
                    this.pre_stop_command = '';
                }
            },
            removePreStopCommands() {
                this.manifest_model.pre_stop_commands = [];
            },
            addToManifest(value, path) {
                this.$store.dispatch('manifestGenerator', {
                    value: value,
                    path: path
                })
            },
            deleteFromManifest(path) {
                this.$store.dispatch('manifestDeleter', {
                    path: path
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .add-button
        font-size .9em
        color #fefefe
        padding 8px 16px
        border-radius 3px
        font-family iran-yekan
        background-color #24d5d8
        cursor pointer
        margin-top 8px
        user-select none
        box-shadow 0 1px 3px 0 rgba(36, 213, 216, 0.3), 0 1px 5px 0 rgba(36, 213, 216, 0.6)
        float: right

    .remove-command
        padding 16px
        width: 100%

        span.remove-btn
            font-size .8em
            display none
            margin-left auto
            cursor pointer

    .remove-command:hover
        span.remove-btn
            cursor pointer
            margin-left auto
            font-size .8em
            display flex

</style>
