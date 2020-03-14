<template>

    <div>
        <div style="margin-top: 12px;">

            <config-box :section-title="sections.commands_config" :tooltip="sections.commands_tooltip">
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0" v-on:keydown.enter.prevent="addServiceCommands">
                    <div style="display: flex">

                        <v-text-field
                                ref="commands_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0045ff"
                                v-model="command"
                                v-on:keydown.enter.prevent="addServiceCommands"
                                :label="command_args_obj.commands_label"
                                :hint="command_args_obj.commands_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.commands"></popover>
                    </div>

                    <span @click="addServiceCommands" class="add-button">افزودن دستور</span>
                </form>

                <div class="remove-command col-lg-6 col-md-6 col-xs-12 col-sm-12"
                     style="display: flex; flex-wrap: wrap; justify-content: left; direction: ltr; font-family: iran-yekan; line-height: 1.2; color: #7f828b">[
                    <span v-for="(command, index) in manifest_model.service_commands"
                          :key="index"
                          style="direction: ltr; line-height: 1.2; color: #7f828b; cursor: default; font-family: iran-yekan"
                    >{{index !== manifest_model.service_commands.length - 1 ? `\"${command}\", ` : `\"${command}\"`}}</span>
                    ]
                    <span v-if="manifest_model.service_commands.length > 0" class="remove-btn" @click="removeCommands">حذف دستور</span>
                </div>
            </config-box>


            <config-box :section-title="sections.command_args_config" :tooltip="sections.command_args_tooltip" >
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0" v-on:keydown.enter.prevent="addServiceCommandArgs">
                    <div style="display: flex">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0045ff"
                                v-on:keydown.enter.prevent="addServiceCommandArgs"
                                v-model="command_args"
                                :label="command_args_obj.command_args_label"
                                :hint="command_args_obj.command_args_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.command_args"></popover>
                    </div>
                    <span @click="addServiceCommandArgs" class="add-button">افزودن آرگومان</span>
                </form>

                <div class="remove-command col-lg-6 col-md-6 col-xs-12 col-sm-12"
                     style="display: flex; flex-wrap: wrap; justify-content: left; direction: ltr; font-family: iran-yekan; line-height: 1.2; color: #7f828b">[
                    <span v-for="(command_arg, index) in manifest_model.service_command_args"
                          :key="index"
                          style="direction: ltr; line-height: 1.2; color: #7f828b; cursor: default; font-family: iran-yekan"
                    >{{index !== manifest_model.service_command_args.length - 1 ? `\"${command_arg}\", ` : `\"${command_arg}\"`}}</span>
                    ]
                    <span v-if="manifest_model.service_command_args.length > 0" class="remove-btn" @click="removeCommandArgs">حذف آرگومان‌ها</span>
                </div>
            </config-box>

        </div>
    </div>

</template>

<script>

    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";


    export default {
        name: "command-args-setup",
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
                rules: {
                    required: value => value !== '' || 'مقدار این فیلد نمی‌تواند خالی باشد',
                    is_root_addressed: value => value.toString().startsWith('/') || value.toString() === '' || 'آدرس وارد شده، باید از root (/) شروع شود',
                    no_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست',
                    no_slash: value => !value.toString().startsWith('/') || '/ مجاز نیست'
                },
                command: '',
                command_args: '',
                editing_index: -1,
                isEditing: false,
                allowed_name: null,
                command_args_obj: {
                    commands_label: 'Commands',
                    commands_hint: 'دستور مورد نظر خود را به صورت آرایه‌ای و بخش بخش وارد کرده و در انتها هر بخش enter را فشار دهید',
                    command_args_label: 'Command Args',
                    command_args_hint: 'Argumentهای مورد نظر خود را به صورت تک تک وارد کرده و در انتهای هر کدام کلید enter را فشار دهید.'
                },
                tooltips: {
                    commands: {
                        title: 'Commands',
                        text: 'دستور‌ مورد نظر خود را به صورت آرایه وارد نمایید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#commands'
                    },
                    command_args: {
                        title: 'Command Args',
                        text: 'argument‌های مورد نیاز خود را به صورت آرایه وارد نمایید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#command-args'
                    }
                },
                sections: {
                    commands_config: 'Commands',
                    commands_tooltip: {
                        title: 'Commands',
                        text: 'از طریق این فیلد می‌توانید دستوری که می‌خواهید در زمان ساخته شدن یک سرویس، بر روی کانتینر مورد نظرتان اجرا شود را مشخص نمایید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#command'
                    },
                    command_args_config: 'Command Args',
                    command_args_tooltip: {
                        title: 'Command Args',
                        text: 'در برخی موارد ممکن است command دارای یک یا چند آرگمان (argument) باشد، به همین دلیل برای آنکه آرگمان‌ها را به command پاس دهیم، نیاز است تا به صورت آرایه آن‌ها را در مانیفست بنویسیم.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#command-args'
                    }
                }
            }
        },
        methods: {

            addServiceCommands() {
                if (this.command.trim().length > 0) {
                    this.manifest_model.service_commands.push(this.command.trim());
                    this.command = '';
                }
            },
            removeCommands() {
                this.manifest_model.service_commands = [];
            },
            addServiceCommandArgs() {
                if (this.command_args.trim().length > 0) {
                    this.manifest_model.service_command_args.push(this.command_args.trim());
                    this.command_args = '';
                }
            },
            removeCommandArgs() {
                this.manifest_model.service_command_args = [];
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
