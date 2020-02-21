<template>
    <div style="margin: 0; padding: 0; flex: 1">
        <div class="wizard-cli-parent-container">
            <div>
                <pre class="cli-key-label" v-tooltip="keys.kind.tooltip">{{keys.kind.label}}</pre>
                <input class="cli-input"
                       @input="checkServiceKind"
                       v-model="manifest_model.service.kind.prod_name">
            </div>
            <span v-if="keys.kind.value_invalid"
                  style="width: max-content; color: #fe135c; font-size: .9em; padding-top: 6px; padding-bottom: 6px;">{{keys.kind.validation_error}}</span>

            <div>
                <pre class="cli-key-label" v-tooltip="keys.name.tooltip">{{keys.name.label}}</pre>
                <input class="cli-input"
                       v-model="manifest_model.service.service_name.name">
            </div>


            <div>
                <pre class="cli-key-label">spec:</pre>
            </div>

            <div>
                <pre class="cli-key-label">    image:</pre>
                <input class="cli-input"
                       placeholder="image name"
                       type="text"
                       v-autowidth="{maxWidth: '200px', minWidth: '92px', comfortZone: 0}"
                       v-model="manifest_model.image.image_object.name">
                <span style="color: #fefefe;padding-left: 3px; padding-right: 3px">:</span>
                <input class="cli-input"
                       placeholder="image version"
                       v-autowidth="{maxWidth: '200px', minWidth: '100px', comfortZone: 0}"
                       v-model="manifest_model.image.image_object.version">
            </div>

            <div>
                <pre class="cli-key-label">    image_pull_policy:</pre>

                <input class="cli-input"
                       type="text"
                       placeholder="Always/IfNotPresent"
                       v-model="manifest_model.image.image_pull_policy.value">
            </div>

            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label">    path:</pre>

                <input class="cli-input"
                       type="text"
                       placeholder="/DIR_ADDRESS"
                       v-model="manifest_model.service.path.dir">
            </div>

            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label">    port:</pre>

                <input class="cli-input"
                       type="number"
                       placeholder="80"
                       v-model.number="manifest_model.service.port.number">
            </div>

            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label">    allow_http:</pre>

                <input class="cli-input"
                       type="checkbox"
                       v-model="manifest_model.service.allow_http.selected">
            </div>


            <div>
                <pre class="cli-key-label">    replicas:</pre>

                <input class="cli-input"
                       type="number"
                       min="1"
                       v-model.number="manifest_model.service.replica.count">
            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label">    env:</pre>
            </div>
            <div v-if="manifest_model.environment_variable.env_list.length > 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="env in manifest_model.environment_variable.env_list">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label">    - name:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="env.name">
                    </div>
                    <div>
                        <pre class="cli-key-label">      value:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="env.value">
                    </div>
                    <div>
                        <pre class="cli-key-label">      hidden:</pre>
                        <input class="cli-input"
                               type="checkbox"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="env.hidden">
                    </div>
                    <div>
                        <pre class="cli-key-label">      secret:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="env.secret">
                    </div>
                </div>

            </div>

            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label">    - name:</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter=""
                               placeholder="type env name"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.environment_variable.name">
                    </div>
                    <div v-if="!manifest_model.environment_variable.secret">
                        <pre class="cli-key-label">      value:</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="type env value"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.environment_variable.value">
                    </div>
                    <!--<div>-->
                    <!--<pre class="cli-key-label">      hidden:</pre>-->
                    <!--<input class="cli-input"-->
                    <!--type="checkbox"-->
                    <!--v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"-->
                    <!--v-model="manifest_model.environment_variable">-->
                    <!--</div>-->
                    <div v-if="!manifest_model.environment_variable.value">
                        <pre class="cli-key-label">      secret:</pre>
                        <input class="cli-input"
                               placeholder="type env secret"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.environment_variable.secret">
                    </div>
                </div>

            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label">    volume_mounts:</pre>
            </div>
            <div v-if="manifest_model.volumes.volume_list.length > 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="volume_mount in manifest_model.volumes.volume_list">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label">    - mount_path:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="volume_mount.mount_path">
                    </div>
                    <div>
                        <pre class="cli-key-label">      sub_path:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="volume_mount.sub_path">
                    </div>
                    <div>
                        <pre class="cli-key-label">      volume_name:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="volume_mount.volume_name">
                    </div>
                </div>

            </div>

            <div style="flex-direction: column-reverse; display: flex; margin-top: 12px">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label">    - mount_path:</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="mount path address starting from root"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.volumes.volume.mount_path">
                    </div>
                    <div>
                        <pre class="cli-key-label">      sub_path:</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="sub path (optional)"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.volumes.volume.sub_path">
                    </div>
                    <div>
                        <pre class="cli-key-label">      volume_name:</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="dedicated volume name"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.volumes.volume.volume_name">
                    </div>
                </div>

            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label">    port_mapping:</pre>
            </div>
            <div v-if="manifest_model.port_mapping.port_map_list.length> 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="port_map in manifest_model.port_mapping.port_map_list">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label">    - port:</pre>
                        <input class="cli-input"
                               type="number"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model.number="port_map.port">
                    </div>
                    <div>
                        <pre class="cli-key-label">      target_port:</pre>
                        <input class="cli-input"
                               type="number"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model.number="port_map.target_port">
                    </div>
                    <div>
                        <pre class="cli-key-label">      protocol:</pre>
                        <input class="cli-input"
                               type="text"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="port_map.protocol">
                    </div>
                </div>

            </div>

            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label">    - port:</pre>
                        <input class="cli-input"
                               type="number"
                               placeholder="enter target port to map port to"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model.number="manifest_model.port_mapping.port_map.port">
                    </div>
                    <div>
                        <pre class="cli-key-label">      target_port:</pre>
                        <input class="cli-input"
                               type="number"
                               placeholder="enter desired port"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model.number="manifest_model.port_mapping.port_map.target_port">
                    </div>
                    <div>
                        <pre class="cli-key-label">      protocol:</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="connection port protocol (UDP/TCP)"
                               v-autowidth="{maxWidth: '400px', minWidth: '200px', comfortZone: 0}"
                               v-model="manifest_model.port_mapping.port_map.protocol">
                    </div>
                </div>

            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label">    liveness_probe:</pre>
            </div>
            <div style="flex-direction: column; display: flex;">
                <div>
                    <pre class="cli-key-label">       initial_delay_seconds:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.liveness_object.initial_delay_seconds">
                </div>
                <div>
                    <pre class="cli-key-label">       period_seconds:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.liveness_object.period_seconds">
                </div>
                <div>
                    <pre class="cli-key-label">       timeout_seconds:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.liveness_object.timeout_seconds">
                </div>
                <div>
                    <pre class="cli-key-label">       http_get:</pre>
                </div>
                <div>
                    <pre class="cli-key-label">          path:</pre>
                    <input class="cli-input"
                           type="text"
                           v-model="manifest_model.health_check.liveness_object.http_get_method">
                </div>
                <div>
                    <pre class="cli-key-label">          port:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.liveness_object.http_get_port">
                </div>
            </div>

            <div style="margin-top: 12px">
                <pre class="cli-key-label">    readiness_probe:</pre>
            </div>
            <div style="flex-direction: column; display: flex;">
                <div>
                    <pre class="cli-key-label">       initial_delay_seconds:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.readiness_object.initial_delay_seconds">
                </div>
                <div>
                    <pre class="cli-key-label">       period_seconds:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.readiness_object.period_seconds">
                </div>
                <div>
                    <pre class="cli-key-label">       timeout_seconds:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.readiness_object.timeout_seconds">
                </div>
                <div>
                    <pre class="cli-key-label">       http_get:</pre>
                </div>
                <div>
                    <pre class="cli-key-label">          path:</pre>
                    <input class="cli-input"
                           type="text"
                           v-model="manifest_model.health_check.readiness_object.http_get_method">
                </div>
                <div>
                    <pre class="cli-key-label">          port:</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           v-model.number="manifest_model.health_check.readiness_object.http_get_port">
                </div>
            </div>

            <div style="margin-top: 12px">
                <pre class="cli-key-label">    resources:</pre>
            </div>

            <div>
                <pre class="cli-key-label">       memory (Mi):</pre>

                <input class="cli-input"
                       type="number"
                       min="200"
                       v-model.number="manifest_model.service.memory.amount">
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "cli-setup-mode",
        props: {
            manifest_model: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                keys: {
                    kind: {
                        label: 'kind:',
                        tooltip: 'تعیین نوع سرویس',
                        value_invalid: false,
                        validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                    },
                    name: {
                        label: 'name:',
                        tooltip: 'نام سرویس که قصد ساخت آن را دارید',
                        value_invalid: false,
                        validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                    }
                }
            }
        },
        methods: {
            checkServiceKind(input) {
                this.validateServiceKind(input);

                if ((input.target.value === 'ExternalService' && this.manifest_model.service.kind.local_name !== 'External Service') ||
                    (input.target.value === 'InternalService' && this.manifest_model.service.kind.local_name !== 'Internal Service')) {
                    this.$emit('update-service-kind', input.target.value)
                }
            },
            validateServiceKind(input) {
                this.keys.kind.value_invalid = input.target.value !== 'ExternalService' && input.target.value !== 'InternalService';
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .wizard-cli-parent-container
        min-height: 700px
        margin-bottom: 14px
        margin-top: 12px
        border-radius: 3px
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16)
        background-color: #212426
        padding: 16px
        box-sizing: padding-box
        color: #fefefe
        font-family: 'Helvetica Neue'

        div
            display: flex
            flex-direction: row-reverse

    .cli-key-label
        text-align: left
        color: #3ccc38
        padding-right: 6px
        font-family "Helvetica Neue"
        font-weight normal
        font-size 1em
        display: flex
        width: max-content
        margin-bottom: 3px
        direction: ltr
        cursor pointer

    .cli-input
        color: #fefefe
        text-align: left
        width: 100%
        margin: auto 0
        padding-left: 6px
        direction: ltr
        font-size: .9em
        font-family: 'Helvetica Neue'

    label
        text-align: left
        color: #3ccc38
        padding-right: 6px
        font-family "Helvetica Neue"
        font-weight normal
        font-size 1em
        display: flex
        width: max-content
        margin-bottom: 3px
        direction: ltr
        cursor pointer

</style>
