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
                <pre class="cli-key-label">{{keys.spec.label}}</pre>
            </div>
            <div>
                <pre class="cli-key-label" v-tooltip="keys.spec.image.tooltip">    {{keys.spec.image.label}}</pre>
                <input class="cli-input"
                       placeholder="image name"
                       type="text"
                       v-autowidth="{maxWidth: '300px', minWidth: '100px', comfortZone: 0}"
                       v-model="manifest_model.image.image_object.name">
                <span style="color: #fefefe;padding-left: 3px; padding-right: 3px">:</span>
                <input class="cli-input"
                       placeholder="image version"
                       v-autowidth="{maxWidth: '300px', minWidth: '100px', comfortZone: 0}"
                       v-model="manifest_model.image.image_object.version">
            </div>
            <div>
                <pre class="cli-key-label" v-tooltip="keys.spec.image_pull_policy.tooltip">    {{keys.spec.image_pull_policy.label}}</pre>

                <input class="cli-input"
                       type="text"
                       placeholder="Always/IfNotPresent"
                       v-model="manifest_model.image.image_pull_policy.value">
            </div>

            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label" v-tooltip="keys.spec.path.tooltip">    {{keys.spec.path.label}}</pre>

                <input class="cli-input"
                       type="text"
                       placeholder="/DIR_ADDRESS"
                       v-model="manifest_model.service.path.dir">
            </div>
            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label" v-tooltip="keys.spec.port.tooltip">    {{keys.spec.port.label}}</pre>

                <input class="cli-input"
                       type="number"
                       placeholder="80"
                       v-model.number="manifest_model.service.port.number">
            </div>
            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label"
                     v-tooltip="keys.spec.allow_http.tooltip">    {{keys.spec.allow_http.label}}</pre>

                <input class="cli-input"
                       type="checkbox"
                       v-model="manifest_model.service.allow_http.selected">
            </div>
            <div>
                <pre class="cli-key-label" v-tooltip="keys.spec.replicas.tooltip">    {{keys.spec.replicas.label}}</pre>

                <input class="cli-input"
                       type="number"
                       min="1"
                       v-model.number="manifest_model.service.replica.count">
            </div>
            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'" style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.domains.tooltip">    {{keys.spec.domains.label}}</pre>
            </div>
            <div v-if="manifest_model.service.domains.length && manifest_model.service.kind.prod_name === 'ExternalService'"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(domain, index) in manifest_model.service.domains">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label">    - name:</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="manifest_model.service.domains[index]">
                        </div>
                    </div>
                    <span @click="removeDomain(index)">حذف</span>
                </div>
            </div>
            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label"
                     v-tooltip="keys.spec.domains.tooltip">    - name:</pre>

                <input class="cli-input"
                       type="text"
                       @keyup.enter="addDomain"
                       v-autowidth="auto_width_config"
                       v-model="domain">
            </div>

            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.env.tooltip">    {{keys.spec.env.label}}</pre>
            </div>
            <div v-if="manifest_model.environment_variable.env_list.length > 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(env, index) in manifest_model.environment_variable.env_list">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.name.tooltip">    {{keys.spec.env.name.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="env.name">
                        </div>
                        <div v-if="!env.secret">
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.value.tooltip">      {{keys.spec.env.value.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="env.value">
                        </div>
                        <div v-if="!env.secret">
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.hidden.tooltip">      {{keys.spec.env.hidden.label}}</pre>
                            <input class="cli-input"
                                   type="checkbox"
                                   v-autowidth="auto_width_config"
                                   v-model="env.hidden">
                        </div>
                        <div v-if="!env.value">
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.secret.tooltip">      {{keys.spec.env.secret.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="env.secret">
                        </div>
                    </div>
                    <span @click="removeEnv(index)">حذف</span>
                </div>
            </div>
            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.env.name.tooltip">    {{keys.spec.env.name.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addEnv"
                               placeholder="type env name"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.name">
                    </div>
                    <div v-if="!manifest_model.environment_variable.secret">
                        <pre class="cli-key-label" v-tooltip="keys.spec.env.value.tooltip">      {{keys.spec.env.value.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addEnv"
                               placeholder="type env value"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.value">
                    </div>
                    <div v-if="!manifest_model.environment_variable.secret">
                        <pre class="cli-key-label" v-tooltip="keys.spec.env.hidden.tooltip">      {{keys.spec.env.hidden.label}}</pre>
                        <input class="cli-input"
                               type="checkbox"
                               @keyup.enter="addEnv"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.hidden">
                    </div>
                    <div v-if="!manifest_model.environment_variable.value">
                        <pre class="cli-key-label" v-tooltip="keys.spec.env.secret.tooltip">      {{keys.spec.env.secret.label}}</pre>
                        <input class="cli-input"
                               @keyup.enter="addEnv"
                               placeholder="type env secret"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.secret">
                    </div>
                </div>

            </div>
            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.tooltip">    {{keys.spec.volume_mounts.label}}</pre>
            </div>

            <div v-if="manifest_model.volumes.volume_list.length > 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(volume_mount, index) in manifest_model.volumes.volume_list">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.mount_path.tooltip">    {{keys.spec.volume_mounts.mount_path.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="volume_mount.mount_path">
                        </div>
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.sub_path.tooltip">      {{keys.spec.volume_mounts.sub_path.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="volume_mount.sub_path">
                        </div>
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.volume_name.tooltip">      {{keys.spec.volume_mounts.volume_name.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="volume_mount.volume_name">
                        </div>
                    </div>
                    <span @click="removeVolume(index)">حذف</span>
                </div>
            </div>
            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.mount_path.tooltip">    {{keys.spec.volume_mounts.mount_path.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addVolume"
                               placeholder="mount path address starting from root"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.volumes.volume.mount_path">
                    </div>
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.sub_path.tooltip">      {{keys.spec.volume_mounts.sub_path.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="sub path (optional)"
                               @keyup.enter="addVolume"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.volumes.volume.sub_path">
                    </div>
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.volume_mounts.volume_name.tooltip">      {{keys.spec.volume_mounts.volume_name.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="dedicated volume name"
                               @keyup.enter="addVolume"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.volumes.volume.volume_name">
                    </div>
                </div>

            </div>

            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.tooltip">    {{keys.spec.port_mapping.label}}</pre>
            </div>
            <div v-if="manifest_model.port_mapping.port_map_list.length> 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(port_map, index) in manifest_model.port_mapping.port_map_list">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.port.tooltip">    {{keys.spec.port_mapping.port.label}}</pre>
                            <input class="cli-input"
                                   type="number"
                                   v-autowidth="auto_width_config"
                                   v-model.number="port_map.port">
                        </div>
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.target_port.tooltip">      {{keys.spec.port_mapping.target_port.label}}</pre>
                            <input class="cli-input"
                                   type="number"
                                   v-autowidth="auto_width_config"
                                   v-model.number="port_map.target_port">
                        </div>
                        <div>
                            <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.protocol.tooltip">      {{keys.spec.port_mapping.protocol.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="port_map.protocol">
                        </div>
                    </div>
                    <span @click="removePortMap(index)">حذف</span>
                </div>
            </div>

            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.port.tooltip">    {{keys.spec.port_mapping.port.label}}</pre>
                        <input class="cli-input"
                               type="number"
                               @keyup.enter="addPortMap"
                               placeholder="enter target port to map port to"
                               v-autowidth="auto_width_config"
                               v-model.number="manifest_model.port_mapping.port_map.port">
                    </div>
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.target_port.tooltip">      {{keys.spec.port_mapping.target_port.label}}</pre>
                        <input class="cli-input"
                               type="number"
                               placeholder="enter desired port"
                               @keyup.enter="addPortMap"
                               v-autowidth="auto_width_config"
                               v-model.number="manifest_model.port_mapping.port_map.target_port">
                    </div>
                    <div>
                        <pre class="cli-key-label" v-tooltip="keys.spec.port_mapping.protocol.tooltip">      {{keys.spec.port_mapping.protocol.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="connection port protocol (UDP/TCP)"
                               v-autowidth="auto_width_config"
                               @keyup.enter="addPortMap"
                               v-model="manifest_model.port_mapping.port_map.protocol">
                    </div>
                </div>

            </div>
            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.tooltip">    {{keys.spec.liveness_probe.label}}</pre>
            </div>
            <div style="flex-direction: column; display: flex;">
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.initial_delay_seconds.tooltip">       {{keys.spec.liveness_probe.initial_delay_seconds.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter initial delay seconds"
                           v-model.number="manifest_model.health_check.liveness_object.initial_delay_seconds">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.period_seconds.tooltip">       {{keys.spec.liveness_probe.period_seconds.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter period seconds"
                           v-model.number="manifest_model.health_check.liveness_object.period_seconds">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.timeout_seconds.tooltip">       {{keys.spec.liveness_probe.timeout_seconds.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter timeout seconds"
                           v-model.number="manifest_model.health_check.liveness_object.timeout_seconds">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.http_get.tooltip">       {{keys.spec.liveness_probe.http_get.label}}</pre>
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.http_get.path.tooltip">          {{keys.spec.liveness_probe.http_get.path.label}}</pre>
                    <input class="cli-input"
                           type="text"
                           placeholder="enter method path starting from root"
                           v-model="manifest_model.health_check.liveness_object.http_get_method">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.http_get.port.tooltip">          {{keys.spec.liveness_probe.http_get.port.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter http get port"
                           v-model.number="manifest_model.health_check.liveness_object.http_get_port">
                </div>
            </div>
            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.tooltip">    {{keys.spec.readiness_probe.label}}</pre>
            </div>
            <div style="flex-direction: column; display: flex;">
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.initial_delay_seconds.tooltip">       {{keys.spec.readiness_probe.initial_delay_seconds.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter initial delay seconds"
                           v-model.number="manifest_model.health_check.readiness_object.initial_delay_seconds">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.period_seconds.tooltip">       {{keys.spec.readiness_probe.period_seconds.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter period seconds"
                           v-model.number="manifest_model.health_check.readiness_object.period_seconds">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.timeout_seconds.tooltip">       {{keys.spec.readiness_probe.timeout_seconds.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter timeout seconds"
                           v-model.number="manifest_model.health_check.readiness_object.timeout_seconds">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.http_get.tooltip">       {{keys.spec.readiness_probe.http_get.label}}</pre>
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.http_get.path.tooltip">          {{keys.spec.readiness_probe.http_get.path.label}}</pre>
                    <input class="cli-input"
                           type="text"
                           placeholder="enter method path starting from root"
                           v-model="manifest_model.health_check.readiness_object.http_get_method">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.http_get.port.tooltip">          {{keys.spec.readiness_probe.http_get.port.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           placeholder="enter http get port"
                           v-model.number="manifest_model.health_check.readiness_object.http_get_port">
                </div>
            </div>
            <div style="margin-top: 12px">
                <pre class="cli-key-label"
                     v-tooltip="keys.spec.resources.tooltip">    {{keys.spec.resources.label}}</pre>
            </div>
            <div>
                <pre class="cli-key-label" v-tooltip="keys.spec.resources.memory.tooltip">       {{keys.spec.resources.memory.label}}</pre>

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
                domain: null,
                auto_width_config: {
                    maxWidth: '600px', minWidth: '300px', comfortZone: 0
                },
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
                    },
                    spec: {
                        label: 'spec:',
                        image: {
                            label: 'image:',
                            tooltip: 'آدرس ایمیجی که سرویس از روی آن ساخته می‌شود.',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        image_pull_policy: {
                            label: 'image_pull_policy:',
                            tooltip: 'مشخص می‌کند در هر بار ساخت ایمیج از نو دریافت شود یا خیر',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        path: {
                            label: 'path:',
                            tooltip: 'مشخص می‌کند سرویس بر روی مسیر خاصی اجرا شود',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        port: {
                            label: 'port:',
                            tooltip: 'پورتی که سرویس بر روی آن Expose شده است',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        allow_http: {
                            label: 'allow_http:',
                            tooltip: 'مشخص می‌کند سرویس درخواست‌های http را قبول کند یا خیر',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        domains: {
                            label: 'domains:',
                            tooltip: 'نام دامنه‌هایی که قصد دارید به سرویس متصل نمایید',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        replicas: {
                            label: 'replicas:',
                            tooltip: 'تعداد instance‌هایی که از این سرویس باید ساخته شود',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                        },
                        env: {
                            label: 'env:',
                            tooltip: 'لیست‌ ‌environment variable‌های مورد نیاز سرویس',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                            name: {
                                label: '- name:',
                                tooltip: 'نام environment variable',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            value: {
                                label: 'value:',
                                tooltip: 'مقدار مستقیم environment variable',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            secret: {
                                label: 'secret:',
                                tooltip: 'نام سکرتی که مقدار environment variable داخل آن ذخیره شده است.',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            hidden: {
                                label: 'hidden:',
                                tooltip: 'مشخص می‌کند مقدار environment variable نمایش داده شود یا خیر',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                        },
                        volume_mounts: {
                            label: 'volume_mounts:',
                            tooltip: 'مشخص کردن محل‌های ذخیره‌سازی',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                            mount_path: {
                                label: '- mount_path:',
                                tooltip: 'آدرس مسیری از سرویس که باید به محل ذخیره‌سازی متصل شود و از root آدرس دهی می‌شود',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            sub_path: {
                                label: 'aub_path:',
                                tooltip: 'نام محل ذخیره‌سازی دلخواه',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            volume_name: {
                                label: 'volume_name:',
                                tooltip: 'در صورت نیاز، نام dedicated volume که باید به سرویس متصل شود',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                        },
                        port_mapping: {
                            label: 'port_mapping:',
                            tooltip: 'تخصیص پورت‌های داخلی سرویس در فضانام',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                            port: {
                                label: '- port:',
                                tooltip: 'پورت جدید که قرار است target_port به آن map شود',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            target_port: {
                                label: 'target_port:',
                                tooltip: 'پورتی از سرویس که قرار است به پورت جدید map شود',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            protocol: {
                                label: 'protocol:',
                                tooltip: 'نوع پروتکول پورت (TCP/UDP)',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                        },
                        liveness_probe: {
                            label: 'liveness_probe:',
                            tooltip: 'مکانیزم تشخیص سلامت و فعال بودن سرویس',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                            initial_delay_seconds: {
                                label: 'initial_delay_seconds:',
                                tooltip: 'زمان اولیه تا اولین صدا کردن متد',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            period_seconds: {
                                label: 'period_seconds:',
                                tooltip: 'میزان زمان بر حسب ثانیه که فندق بین هر بار صدا کردن متد صبر می‌کند',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            timeout_seconds: {
                                label: 'timeout_seconds:',
                                tooltip: 'میزان زمانی که فندق منتظر پاسخ میماند تا خطای timeout دهد',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            http_get: {
                                label: 'http_get:',
                                tooltip: 'دستور http get که برای تشخیص آمادگی صدا زده می‌شود',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                                path: {
                                    label: 'path:',
                                    tooltip: 'آدرس متد مورد نظر که از root شروع می‌شود',
                                    value_invalid: false,
                                    validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                                },
                                port: {
                                    label: 'port:',
                                    tooltip: 'پورت متد مورد نظر',
                                    value_invalid: false,
                                    validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                                },
                            },
                        },
                        readiness_probe: {
                            label: 'readiness_probe:',
                            tooltip: 'مکانیزم تشخیص آمادگی سرویس',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                            initial_delay_seconds: {
                                label: 'initial_delay_seconds:',
                                tooltip: 'زمان اولیه تا اولین صدا کردن متد',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            period_seconds: {
                                label: 'period_seconds:',
                                tooltip: 'میزان زمان بر حسب ثانیه که فندق بین هر بار صدا کردن متد صبر می‌کند',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            timeout_seconds: {
                                label: 'timeout_seconds:',
                                tooltip: 'میزان زمانی که فندق منتظر پاسخ میماند تا خطای timeout دهد',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                            http_get: {
                                label: 'http_get:',
                                tooltip: 'دستور http get که برای تشخیص آمادگی صدا زده می‌شود',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                                path: {
                                    label: 'path:',
                                    tooltip: 'آدرس متد مورد نظر که از root شروع می‌شود',
                                    value_invalid: false,
                                    validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                                },
                                port: {
                                    label: 'port:',
                                    tooltip: 'پورت متد مورد نظر',
                                    value_invalid: false,
                                    validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                                },
                            },
                        },
                        resources: {
                            label: 'resources:',
                            tooltip: 'تخصیص منابع مورد نیاز سرویس',
                            value_invalid: false,
                            validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد',
                            memory: {
                                label: 'memory (Mi):',
                                tooltip: 'میزان رم سرویس بر حسب مگابایت',
                                value_invalid: false,
                                validation_error: 'پر کردن این فیلد اجباری‌ است و نوع سرویس باید ExternalService یا InternalService باشد'
                            },
                        },
                    }
                }
            }
        },
        methods: {
            addDomain() {
                var redundant = false;

                if (this.domain){
                    if(this.domain.trim() !== ''){
                        this.manifest_model.service.domains.forEach(domain => {
                            if (domain === this.domain) {
                                redundant = true
                            }
                        });

                        if (!redundant) {
                            this.manifest_model.service.domains.push(this.domain);
                        }

                        this.domain = null;
                    }
                }
            },
            removeDomain(index) {
                this.manifest_model.service.domains.splice(index, 1)
            },
            addEnv() {

                if (this.manifest_model.environment_variable.name === null) {
                    return;
                }


                // if (this.manifest_model.environment_variable.value === null && !this.secret_obj.selected) {
                //     return;
                // }
                //
                //
                // if (this.manifest_model.environment_variable.secret === null && this.secret_obj.selected) {
                //     return;
                // }


                if (this.manifest_model.environment_variable.name.trim().length === 0) {
                    return;
                }


                // if (this.rules.no_space(this.manifest_model.environment_variable.name.trim()) !== true ||
                //     this.rules.regex(this.manifest_model.environment_variable.name.trim()) !== true ||
                //     this.rules.redundant(this.manifest_model.environment_variable.name.trim()) !== true) {
                //     this.$refs.key.focus();
                //     return;
                // }


                if (this.manifest_model.environment_variable.secret) {
                    this.manifest_model.environment_variable.env_list.push({
                        name: this.manifest_model.environment_variable.name.trim(),
                        secret: this.manifest_model.environment_variable.secret.trim(),
                        hidden: this.manifest_model.environment_variable.hidden
                    })
                } else {
                    this.manifest_model.environment_variable.env_list.push({
                        name: this.manifest_model.environment_variable.name.trim(),
                        value: this.manifest_model.environment_variable.value.trim(),
                        hidden: this.manifest_model.environment_variable.hidden
                    })
                }


                this.manifest_model.environment_variable.value = null;
                this.manifest_model.environment_variable.name = null;
                this.manifest_model.environment_variable.secret = null;
                this.manifest_model.environment_variable.hidden = false;

            },
            removeEnv(index) {
                this.manifest_model.environment_variable.env_list.splice(index, 1)
            },
            addVolume() {

                if (this.manifest_model.volumes.volume.mount_path === null) {
                    return;
                }

                if (this.manifest_model.volumes.volume.sub_path === null) {
                    return;
                }


                if (this.manifest_model.volumes.volume.mount_path.trim().length === 0) {
                    return;
                }

                // if (this.rules.is_root_addressed(this.manifest_model.volumes.volume.mount_path) !== true ||
                //     this.rules.no_space(this.manifest_model.volumes.volume.mount_path) !== true) {
                //     return;
                // }
                // if(this.rules.redundant(this.manifest_model.volumes.volume.mount_path) !== true){
                //     return;
                // }
                // if (this.manifest_model.volumes.volume.sub_path.trim().length === 0 ||
                //     this.rules.no_slash(this.manifest_model.volumes.volume.sub_path) !== true) {
                //     return;
                // }
                // if (this.manifest_model.volumes.volume_kind.local_name === 'Dedicated Volume') {
                //
                //     if (this.manifest_model.volumes.volume.volume_name === null) {
                //         return;
                //     }
                //
                //
                //     if (this.manifest_model.volumes.volume.volume_name.trim().length === 0) {
                //         this.$refs.volume_name_selector.focus()
                //         return;
                //     }
                //
                //     if (this.rules.volume_name_regex(this.manifest_model.volumes.volume.volume_name.trim()) !== true ||
                //         this.rules.no_space(this.manifest_model.volumes.volume.volume_name.trim()) !== true) {
                //         this.$refs.volume_name_selector.focus()
                //         return;
                //     }
                //
                // }

                if (this.manifest_model.volumes.volume.volume_name) {
                    this.manifest_model.volumes.volume_list.push({
                        mount_path: this.manifest_model.volumes.volume.mount_path.trim(),
                        sub_path: this.manifest_model.volumes.volume.sub_path.trim(),
                        volume_name: this.manifest_model.volumes.volume.volume_name.trim()
                    })
                } else {
                    this.manifest_model.volumes.volume_list.push({
                        mount_path: this.manifest_model.volumes.volume.mount_path.trim(),
                        sub_path: this.manifest_model.volumes.volume.sub_path.trim()
                    })
                }

                this.manifest_model.volumes.volume.mount_path = null;
                this.manifest_model.volumes.volume.sub_path = null;
                this.manifest_model.volumes.volume.volume_name = null;

            },
            removeVolume(index) {
                this.manifest_model.volumes.volume_list.splice(index, 1)
            },
            addPortMap() {

                if (this.manifest_model.port_mapping.port_map.port === null) {
                    return;
                }

                if (this.manifest_model.port_mapping.port_map.target_port === null) {
                    return;
                }


                if (this.manifest_model.port_mapping.port_map.port.toString().trim().length === 0) {
                    return;
                }


                if (this.manifest_model.port_mapping.port_map.target_port.toString().trim().length === 0) {
                    return;
                }

                // if (this.rules.valid_port(this.manifest_model.port_mapping.port_map.port) !== true) {
                //     return;
                // }
                //
                // if (this.rules.valid_port(this.manifest_model.port_mapping.port_map.target_port) !== true) {
                //     return;
                // }

                // if(this.rules.redundant(this.manifest_model.port_mapping.port_map.port) !== true){
                //     return;
                // }


                this.manifest_model.port_mapping.port_map_list.push({
                    port: this.manifest_model.port_mapping.port_map.port,
                    target_port: this.manifest_model.port_mapping.port_map.target_port,
                    protocol: this.manifest_model.port_mapping.port_map.protocol
                });


                this.manifest_model.port_mapping.port_map.port = null;
                this.manifest_model.port_mapping.port_map.target_port = null;
                this.manifest_model.port_mapping.port_map.protocol = 'TCP';

            },
            removePortMap(index) {
                this.manifest_model.port_mapping.port_map_list.splice(index, 1)
            },
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


    .spec-container
        width 100%
        display flex
        cursor pointer
        flex-direction row
        transition all .3s ease-in-out

        span
            display none
            margin-left: auto
            margin-top: auto
            margin-bottom: auto
            margin-right 12px
            font-size 1em
            color: white


    .spec-container:hover
        background rgba(0, 69, 255, 0.30)
        transition all .3s ease-in-out

        span
            display flex
            margin-left: auto
            margin-top: auto
            margin-bottom: auto
            color: white

</style>
