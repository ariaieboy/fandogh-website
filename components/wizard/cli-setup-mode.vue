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
                  class="invalid-message">
                {{keys.kind.validation_error}}
            </span>
            <div>
                <pre class="cli-key-label" v-tooltip="keys.name.tooltip">{{keys.name.label}}</pre>
                <input class="cli-input"
                       maxlength="100"
                       @input="validateServiceName"
                       v-model="manifest_model.service.service_name.name">
            </div>
            <span v-if="keys.name.value_invalid"
                  class="invalid-message">
                {{keys.name.validation_error}}
            </span>
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
                       @input="validateImagePullPolicy"
                       v-model="manifest_model.image.image_pull_policy.value">
            </div>
            <span v-if="keys.spec.image_pull_policy.value_invalid"
                  class="invalid-message">
                {{keys.spec.image_pull_policy.validation_error}}
            </span>


            <div v-if="manifest_model.image.registry.local_name !== 'Fandogh'">
                <pre class="cli-key-label" v-tooltip="keys.spec.image_pull_secret.tooltip">    {{keys.spec.image_pull_secret.label}}</pre>

                <input class="cli-input"
                       type="text"
                       placeholder="enter image pull secret"
                       @input="validateImagePullSecret"
                       v-model="manifest_model.image.secret_obj.value">
            </div>
            <span v-if="keys.spec.image_pull_secret.value_invalid && manifest_model.image.registry.local_name !== 'Fandogh'"
                  class="invalid-message">
                {{keys.spec.image_pull_secret.validation_error}}
            </span>


            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label" v-tooltip="keys.spec.path.tooltip">    {{keys.spec.path.label}}</pre>

                <input class="cli-input"
                       type="text"
                       placeholder="/dir_address"
                       @input="validatePath"
                       v-model="manifest_model.service.path.dir">
            </div>
            <span v-if="keys.spec.path.value_invalid"
                  class="invalid-message">
                {{keys.spec.path.validation_error}}
            </span>


            <div v-if="manifest_model.service.kind.prod_name === 'ExternalService'">
                <pre class="cli-key-label" v-tooltip="keys.spec.port.tooltip">    {{keys.spec.port.label}}</pre>

                <input class="cli-input"
                       type="number"
                       placeholder="80"
                       min="1"
                       max="65535"
                       @input="validatePort"
                       v-model.number="manifest_model.service.port.number">
            </div>
            <span v-if="keys.spec.port.value_invalid"
                  class="invalid-message">
                {{keys.spec.port.validation_error}}
            </span>


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
                       @input="validateReplicas"
                       v-model.number="manifest_model.service.replica.count">
            </div>
            <span v-if="keys.spec.replicas.value_invalid"
                  class="invalid-message">
                {{keys.spec.replicas.validation_error}}
            </span>


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
                                   @input="validateDomain"
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
            <span v-if="keys.spec.domains.value_invalid"
                  class="invalid-message">
                {{keys.spec.domains.validation_error}}
            </span>


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
                                   :disabled="env.hidden"
                                   v-model="env.name">
                        </div>
                        <div v-if="!env.secret">
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.value.tooltip">      {{keys.spec.env.value.label}}</pre>
                            <input v-if="!env.hidden" class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="env.value">
                            <input v-else class="cli-input"
                                   type="text"
                                   :disabled="env.hidden"
                                   placeholder="**********"
                                   v-autowidth="auto_width_config"/>
                        </div>
                        <div v-if="!env.secret">
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.hidden.tooltip">      {{keys.spec.env.hidden.label}}</pre>
                            <input class="cli-input"
                                   type="checkbox"
                                   :disabled="env.hidden"
                                   v-autowidth="auto_width_config"
                                   v-model="env.hidden">
                        </div>
                        <div v-if="!env.value">
                            <pre class="cli-key-label" v-tooltip="keys.spec.env.secret.tooltip">      {{keys.spec.env.secret.label}}</pre>
                            <input class="cli-input"
                                   type="text"
                                   :disabled="env.hidden"
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
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.env.name.tooltip">    {{keys.spec.env.name.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addEnv"
                               placeholder="type env name"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.name">
                    </div>
                    <div v-if="!manifest_model.environment_variable.secret">
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.env.value.tooltip">      {{keys.spec.env.value.label}}</pre>
                        <input class="cli-input input"
                               type="text"
                               @keyup.enter="addEnv"
                               placeholder="type env value"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.value">
                    </div>
                    <div v-if="!manifest_model.environment_variable.secret">
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.env.hidden.tooltip">      {{keys.spec.env.hidden.label}}</pre>
                        <input class="cli-input"
                               type="checkbox"
                               @keyup.enter="addEnv"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.hidden">
                    </div>
                    <div v-if="!manifest_model.environment_variable.value">
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.env.secret.tooltip">      {{keys.spec.env.secret.label}}</pre>
                        <input class="cli-input"
                               @keyup.enter="addEnv"
                               placeholder="type env secret"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.environment_variable.secret">
                    </div>
                </div>

            </div>
            <span v-if="keys.spec.env.value_invalid"
                  class="invalid-message">
                {{keys.spec.env.validation_error}}
            </span>


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
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.volume_mounts.mount_path.tooltip">    {{keys.spec.volume_mounts.mount_path.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addVolume"
                               placeholder="mount path address starting from root"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.volumes.volume.mount_path">
                    </div>
                    <div>
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.volume_mounts.sub_path.tooltip">      {{keys.spec.volume_mounts.sub_path.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="sub path"
                               @keyup.enter="addVolume"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.volumes.volume.sub_path">
                    </div>
                    <div>
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.volume_mounts.volume_name.tooltip">      {{keys.spec.volume_mounts.volume_name.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="dedicated volume name (optional)"
                               @keyup.enter="addVolume"
                               v-autowidth="auto_width_config"
                               v-model="manifest_model.volumes.volume.volume_name">
                    </div>
                </div>

            </div>
            <span v-if="keys.spec.volume_mounts.value_invalid"
                  class="invalid-message">
                {{keys.spec.volume_mounts.validation_error}}
            </span>


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
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.port_mapping.port.tooltip">    {{keys.spec.port_mapping.port.label}}</pre>
                        <input class="cli-input"
                               type="number"
                               @keyup.enter="addPortMap"
                               placeholder="enter target port to map port to"
                               v-autowidth="auto_width_config"
                               v-model.number="manifest_model.port_mapping.port_map.port">
                    </div>
                    <div>
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.port_mapping.target_port.tooltip">      {{keys.spec.port_mapping.target_port.label}}</pre>
                        <input class="cli-input"
                               type="number"
                               placeholder="enter desired port"
                               @keyup.enter="addPortMap"
                               v-autowidth="auto_width_config"
                               v-model.number="manifest_model.port_mapping.port_map.target_port">
                    </div>
                    <div>
                        <pre class="cli-input-key-label" v-tooltip="keys.spec.port_mapping.protocol.tooltip">      {{keys.spec.port_mapping.protocol.label}}</pre>
                        <input class="cli-input"
                               type="text"
                               placeholder="connection port protocol (UDP/TCP)"
                               v-autowidth="auto_width_config"
                               @keyup.enter="addPortMap"
                               v-model="manifest_model.port_mapping.port_map.protocol">
                    </div>
                </div>

            </div>
            <span v-if="keys.spec.port_mapping.value_invalid"
                  class="invalid-message">
                {{keys.spec.port_mapping.validation_error}}
            </span>


            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.command.tooltip">    {{keys.spec.command.label}}</pre>
            </div>
            <div v-if="manifest_model.service_commands.length> 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(command, index) in manifest_model.service_commands">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label">    -</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="manifest_model.service_commands[index]">
                        </div>
                    </div>
                    <span @click="removeServiceCommand(index)">حذف</span>
                </div>
            </div>
            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-input-key-label">    -</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter.prevent="addServiceCommand"
                               placeholder="enter command part"
                               v-autowidth="auto_width_config"
                               v-model="command">
                    </div>
                </div>

            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.command_args.tooltip">    {{keys.spec.command_args.label}}</pre>
            </div>
            <div v-if="manifest_model.service_command_args.length> 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(command_arg, index) in manifest_model.service_command_args">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label">    -</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="manifest_model.service_command_args[index]">
                        </div>
                    </div>
                    <span @click="removeServiceCommandArg(index)">حذف</span>
                </div>
            </div>
            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-input-key-label">    -</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addServiceCommandArg"
                               placeholder="enter command arg"
                               v-autowidth="auto_width_config"
                               v-model="command_args">
                    </div>
                </div>

            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.post_start_commands.tooltip">    {{keys.spec.post_start_commands.label}}</pre>
            </div>
            <div v-if="manifest_model.post_start_commands.length> 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(command, index) in manifest_model.post_start_commands">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label">    -</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="manifest_model.post_start_commands[index]">
                        </div>
                    </div>
                    <span @click="removePostStartCommand(index)">حذف</span>
                </div>
            </div>
            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-input-key-label">    -</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter.prevent="addPostStartCommand"
                               placeholder="enter post start command part"
                               v-autowidth="auto_width_config"
                               v-model="post_start_command">
                    </div>
                </div>

            </div>


            <div style="margin-top: 12px">
                <pre class="cli-key-label" v-tooltip="keys.spec.pre_stop_commands.tooltip">    {{keys.spec.pre_stop_commands.label}}</pre>
            </div>
            <div v-if="manifest_model.pre_stop_commands.length> 0"
                 style="flex-direction: column-reverse; display: flex"
                 v-for="(command, index) in manifest_model.pre_stop_commands">
                <div class="spec-container">
                    <div style="flex-direction: column; display: flex;">
                        <div>
                            <pre class="cli-key-label">    -</pre>
                            <input class="cli-input"
                                   type="text"
                                   v-autowidth="auto_width_config"
                                   v-model="manifest_model.pre_stop_commands[index]">
                        </div>
                    </div>
                    <span @click="removePreStopCommand(index)">حذف</span>
                </div>
            </div>
            <div style="flex-direction: column-reverse; display: flex;">
                <div style="flex-direction: column; display: flex;">
                    <div>
                        <pre class="cli-input-key-label">    -</pre>
                        <input class="cli-input"
                               type="text"
                               @keyup.enter="addPreStopCommand"
                               placeholder="enter pre stop command part"
                               v-autowidth="auto_width_config"
                               v-model="pre_stop_command">
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
                           @input="validateLivenessPath"
                           placeholder="enter method path starting from root"
                           v-model="manifest_model.health_check.liveness_object.http_get.path">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.liveness_probe.http_get.port.tooltip">          {{keys.spec.liveness_probe.http_get.port.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           @input="validateLivenessPort"
                           placeholder="enter http get port"
                           v-model.number="manifest_model.health_check.liveness_object.http_get.port">
                </div>
            </div>
            <span v-if="keys.spec.liveness_probe.value_invalid"
                  class="invalid-message">
                {{keys.spec.liveness_probe.validation_error}}
            </span>


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
                           @input="validateReadinessPath"
                           placeholder="enter method path starting from root"
                           v-model="manifest_model.health_check.readiness_object.http_get.path">
                </div>
                <div>
                    <pre class="cli-key-label" v-tooltip="keys.spec.readiness_probe.http_get.port.tooltip">          {{keys.spec.readiness_probe.http_get.port.label}}</pre>
                    <input class="cli-input"
                           type="number"
                           min="1"
                           @input="validateReadinessPort"
                           placeholder="enter http get port"
                           v-model.number="manifest_model.health_check.readiness_object.http_get.port">
                </div>
            </div>
            <span v-if="keys.spec.readiness_probe.value_invalid"
                  class="invalid-message">
                {{keys.spec.readiness_probe.validation_error}}
            </span>


            <div style="margin-top: 12px">
                <pre class="cli-key-label"
                     v-tooltip="keys.spec.resources.tooltip">    {{keys.spec.resources.label}}</pre>
            </div>
            <div>
                <pre class="cli-key-label" v-tooltip="keys.spec.resources.memory.tooltip">       {{keys.spec.resources.memory.label}}</pre>

                <input class="cli-input"
                       type="number"
                       min="200"
                       @input="validateMemory"
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
                command: '',
                command_args: '',
                post_start_command: '',
                pre_stop_command: '',
                rules: {
                    name_required: value => !!value.trim() || 'نام متغیر نمی‌تواند خالی باشد',
                    value_required: value => !!value.trim() || !this.secret_obj.selected || 'مقدار متغیر نمی‌تواند خالی باشد',
                    secret_required: value => !!value.trim() || this.secret_obj.selected || 'مقدار متغیر نمی‌تواند خالی باشد',
                    no_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست',
                    regex: value => new RegExp('^[a-zA-Z1-9_]+$').test(value) || 'فقط حروف کوچک، حروف بزرگ، underscore و اعداد معتبر هستند',
                    secret_regex: value => new RegExp('^[a-z0-9]+([-.a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)',
                    redundant: value => (this.allowed_name === null ? this.manifest_model.environment_variable.env_list.filter(e => e.name === value).length === 0 : this.allowed_name === value || this.manifest_model.environment_variable.env_list.filter(e => e.name === value).length === 0) || 'مقدار تکراری است',
                    volume_mounts: {
                        is_root_addressed: value => value.toString().startsWith('/') || value.toString() === '' || 'آدرس وارد شده، باید از root (/) شروع شود',
                        no_slash: value => !value.toString().startsWith('/') || '/ مجاز نیست',
                        volume_name_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                        redundant: value => (this.allowed_name === null ? this.manifest_model.volumes.volume_list.filter(e => e.mount_path === value).length === 0 : this.allowed_name === value || this.manifest_model.volumes.volume_list.filter(e => e.mount_path === value).length === 0) || 'مقدار تکراری است',
                    },
                    port_mapping: {
                        valid_port: value => value >= 1 && value <= 65535 || value === null || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد',
                        redundant: value => (this.allowed_name === null ? this.manifest_model.port_mapping.port_map_list.filter(e => e.port === value).length === 0 : this.allowed_name === value || this.manifest_model.port_mapping.port_map_list.filter(e => e.port === value).length === 0) || 'مقدار تکراری است'
                    }
                },
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
                            validation_error: ''
                        },
                        image_pull_secret: {
                            label: 'image_pull_secret:',
                            tooltip: 'نام سکرت مربوط به رجیستری',
                            value_invalid: false,
                            validation_error: ''
                        },
                        path: {
                            label: 'path:',
                            tooltip: 'مشخص می‌کند سرویس بر روی مسیر خاصی اجرا شود',
                            value_invalid: false,
                            validation_error: ''
                        },
                        port: {
                            label: 'port:',
                            tooltip: 'پورتی که سرویس بر روی آن Expose شده است',
                            value_invalid: false,
                            validation_error: ''
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
                            validation_error: ''
                        },
                        replicas: {
                            label: 'replicas:',
                            tooltip: 'تعداد instance‌هایی که از این سرویس باید ساخته شود',
                            value_invalid: false,
                            validation_error: ''
                        },
                        env: {
                            label: 'env:',
                            tooltip: 'لیست‌ ‌environment variable‌های مورد نیاز سرویس',
                            value_invalid: false,
                            validation_error: '',
                            name: {
                                label: '- name:',
                                tooltip: 'نام environment variable',
                                value_invalid: false,
                                validation_error: ''
                            },
                            value: {
                                label: 'value:',
                                tooltip: 'مقدار مستقیم environment variable',
                                value_invalid: false,
                                validation_error: ''
                            },
                            secret: {
                                label: 'secret:',
                                tooltip: 'نام سکرتی که مقدار environment variable داخل آن ذخیره شده است.',
                                value_invalid: false,
                                validation_error: ''
                            },
                            hidden: {
                                label: 'hidden:',
                                tooltip: 'مشخص می‌کند مقدار environment variable نمایش داده شود یا خیر',
                                value_invalid: false,
                                validation_error: ''
                            },
                        },
                        volume_mounts: {
                            label: 'volume_mounts:',
                            tooltip: 'مشخص کردن محل‌های ذخیره‌سازی',
                            value_invalid: false,
                            validation_error: '',
                            mount_path: {
                                label: '- mount_path:',
                                tooltip: 'آدرس مسیری از سرویس که باید به محل ذخیره‌سازی متصل شود و از root آدرس دهی می‌شود',
                                value_invalid: false,
                                validation_error: ''
                            },
                            sub_path: {
                                label: 'aub_path:',
                                tooltip: 'نام محل ذخیره‌سازی دلخواه',
                                value_invalid: false,
                                validation_error: ''
                            },
                            volume_name: {
                                label: 'volume_name:',
                                tooltip: 'در صورت نیاز، نام dedicated volume که باید به سرویس متصل شود',
                                value_invalid: false,
                                validation_error: ''
                            },
                        },
                        command: {
                            label: 'command:',
                            tooltip: 'دستورات سرویس',
                            value_invalid: false,
                            validation_error: '',
                        },
                        command_args: {
                            label: 'command_args:',
                            tooltip: 'argumentهای دستور command',
                            value_invalid: false,
                            validation_error: '',
                        },
                        post_start_commands: {
                            label: 'post_start_command:',
                            tooltip: 'دستور یا دستوراتی که هنگام شروع سرویس اجرا می‌شوند',
                            value_invalid: false,
                            validation_error: '',
                        },
                        pre_stop_commands: {
                            label: 'pre_stop_command:',
                            tooltip: 'دستور یا دستوراتی که قبل از توقف سرویس اجرا می‌شوند',
                            value_invalid: false,
                            validation_error: '',
                        },
                        port_mapping: {
                            label: 'port_mapping:',
                            tooltip: 'تخصیص پورت‌های داخلی سرویس در فضانام',
                            value_invalid: false,
                            validation_error: '',
                            port: {
                                label: '- port:',
                                tooltip: 'پورت جدید که قرار است target_port به آن map شود',
                                value_invalid: false,
                                validation_error: ''
                            },
                            target_port: {
                                label: 'target_port:',
                                tooltip: 'پورتی از سرویس که قرار است به پورت جدید map شود',
                                value_invalid: false,
                                validation_error: ''
                            },
                            protocol: {
                                label: 'protocol:',
                                tooltip: 'نوع پروتکول پورت (TCP/UDP)',
                                value_invalid: false,
                                validation_error: ''
                            },
                        },
                        liveness_probe: {
                            label: 'liveness_probe:',
                            tooltip: 'مکانیزم تشخیص سلامت و فعال بودن سرویس',
                            value_invalid: false,
                            validation_error: '',
                            initial_delay_seconds: {
                                label: 'initial_delay_seconds:',
                                tooltip: 'زمان اولیه تا اولین صدا کردن متد',
                                value_invalid: false,
                                validation_error: ''
                            },
                            period_seconds: {
                                label: 'period_seconds:',
                                tooltip: 'میزان زمان بر حسب ثانیه که فندق بین هر بار صدا کردن متد صبر می‌کند',
                                value_invalid: false,
                                validation_error: ''
                            },
                            timeout_seconds: {
                                label: 'timeout_seconds:',
                                tooltip: 'میزان زمانی که فندق منتظر پاسخ میماند تا خطای timeout دهد',
                                value_invalid: false,
                                validation_error: ''
                            },
                            http_get: {
                                label: 'http_get:',
                                tooltip: 'دستور http get که برای تشخیص آمادگی صدا زده می‌شود',
                                value_invalid: false,
                                validation_error: '',
                                path: {
                                    label: 'path:',
                                    tooltip: 'آدرس متد مورد نظر که از root شروع می‌شود',
                                    value_invalid: false,
                                    validation_error: ''
                                },
                                port: {
                                    label: 'port:',
                                    tooltip: 'پورت متد مورد نظر',
                                    value_invalid: false,
                                    validation_error: ''
                                },
                            },
                        },
                        readiness_probe: {
                            label: 'readiness_probe:',
                            tooltip: 'مکانیزم تشخیص آمادگی سرویس',
                            value_invalid: false,
                            validation_error: '',
                            initial_delay_seconds: {
                                label: 'initial_delay_seconds:',
                                tooltip: 'زمان اولیه تا اولین صدا کردن متد',
                                value_invalid: false,
                                validation_error: ''
                            },
                            period_seconds: {
                                label: 'period_seconds:',
                                tooltip: 'میزان زمان بر حسب ثانیه که فندق بین هر بار صدا کردن متد صبر می‌کند',
                                value_invalid: false,
                                validation_error: ''
                            },
                            timeout_seconds: {
                                label: 'timeout_seconds:',
                                tooltip: 'میزان زمانی که فندق منتظر پاسخ میماند تا خطای timeout دهد',
                                value_invalid: false,
                                validation_error: ''
                            },
                            http_get: {
                                label: 'http_get:',
                                tooltip: 'دستور http get که برای تشخیص آمادگی صدا زده می‌شود',
                                value_invalid: false,
                                validation_error: '',
                                path: {
                                    label: 'path:',
                                    tooltip: 'آدرس متد مورد نظر که از root شروع می‌شود',
                                    value_invalid: false,
                                    validation_error: ''
                                },
                                port: {
                                    label: 'port:',
                                    tooltip: 'پورت متد مورد نظر',
                                    value_invalid: false,
                                    validation_error: ''
                                },
                            },
                        },
                        resources: {
                            label: 'resources:',
                            tooltip: 'تخصیص منابع مورد نیاز سرویس',
                            value_invalid: false,
                            validation_error: '',
                            memory: {
                                label: 'memory (Mi):',
                                tooltip: 'میزان رم سرویس بر حسب مگابایت',
                                value_invalid: false,
                                validation_error: ''
                            },
                        },
                    }
                }
            }
        },
        methods: {
            addDomain() {
                var redundant = false;
                let input = {target: {value: this.domain}};
                console.log(input)
                this.validateDomain(input);

                if (this.domain) {
                    if (this.domain.trim() !== '') {
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

                if (!this.validateEnvironmentVariable())
                    return;

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

                if (!this.validateVolumeMounts()) {
                    return;
                }

                var volume = {};
                if (this.manifest_model.volumes.volume.mount_path) {
                    volume.mount_path = this.manifest_model.volumes.volume.mount_path
                }


                if (this.manifest_model.volumes.volume.sub_path) {
                    volume.sub_path = this.manifest_model.volumes.volume.sub_path
                }


                if (this.manifest_model.volumes.volume.volume_name) {
                    volume.volume_name = this.manifest_model.volumes.volume.volume_name
                }

                this.manifest_model.volumes.volume_list.push(volume);

                // console.log(this.manifest_model.volumes.volume_list);

                this.manifest_model.volumes.volume.mount_path = null;
                this.manifest_model.volumes.volume.sub_path = null;
                this.manifest_model.volumes.volume.volume_name = null;

            },
            removeVolume(index) {
                this.manifest_model.volumes.volume_list.splice(index, 1)
            },
            addPortMap() {

                if (!this.validatePortMapping()) {
                    return;
                }

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
            removeServiceCommand(index) {
                this.manifest_model.service_commands.splice(index, 1);
            },
            addServiceCommand(input) {
                if (this.command.trim() !== '') {
                    this.manifest_model.service_commands.push(this.command);
                    this.command = '';
                }
            },
            removeServiceCommandArg(index) {
                this.manifest_model.service_command_args.splice(index, 1);
            },
            addServiceCommandArg(input) {
                if (this.command_args.trim() !== '') {
                    this.manifest_model.service_command_args.push(this.command_args);
                    this.command_args = '';
                }
            },
            removePostStartCommand(index) {
                this.manifest_model.post_start_commands.splice(index, 1);
            },
            addPostStartCommand(input) {
                if (this.post_start_command.trim() !== '') {
                    this.manifest_model.post_start_commands.push(this.post_start_command);
                    this.post_start_command = '';
                }
            },
            removePreStopCommand(index) {
                this.manifest_model.pre_stop_commands.splice(index, 1);
            },
            addPreStopCommand(input) {
                if (this.pre_stop_command.trim() !== '') {
                    this.manifest_model.pre_stop_commands.push(this.pre_stop_command);
                    this.pre_stop_command = '';
                }
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
            },
            validateImagePullPolicy(input) {
                if (input.target.value === '') {
                    this.keys.spec.image_pull_policy.value_invalid = true;
                    this.keys.spec.image_pull_policy.validation_error = 'مقدار ImagePullPolicy اجباری است';
                    return false;
                }

                if (input.target.value !== 'Always' && input.target.value !== 'IfNotPresent') {
                    this.keys.spec.image_pull_policy.value_invalid = true;
                    this.keys.spec.image_pull_policy.validation_error = 'مقدار ImagePullPolicy باید یکی از ۲ حالت Always یا IfNotPresent باشد';
                    return false;
                }

                this.keys.spec.image_pull_policy.value_invalid = false;

            },
            validateImagePullSecret(input) {

                if (this.rules.secret_regex(input.target.value) !== true) {
                    this.keys.spec.image_pull_secret.value_invalid = true;
                    this.keys.spec.image_pull_secret.validation_error = 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)';
                    return false;
                }

                this.keys.spec.image_pull_secret.value_invalid = false;
                this.keys.spec.image_pull_secret.validation_error = '';

            },
            validatePath(input) {

                if (!input.target.value.toString().startsWith('/') && input.target.value.trim() !== '') {
                    this.keys.spec.path.value_invalid = true;
                    this.keys.spec.path.validation_error = 'مقدار path باید از روت آدرس دهی شود';
                    return false;
                }

                this.keys.spec.path.value_invalid = false;

            },
            validateServiceName(input) {

                if (input.target.value === '') {
                    this.keys.name.value_invalid = true;
                    this.keys.name.validation_error = 'مقدار نام سرویس اجباری است';
                    return false;
                }

                if (!new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(input.target.value)) {
                    this.keys.name.value_invalid = true;
                    this.keys.name.validation_error = 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)';
                    return false;
                }

                if (input.target.value.length > 100) {
                    this.keys.name.value_invalid = true;
                    this.keys.name.validation_error = 'طول نام سرویس نمی‌تواند بیش از ۱۰۰ کاراکتر باشد';
                    return false;
                }

                this.keys.name.value_invalid = false;

            }, validatePort(input) {
                if (input.target.value === '') {
                    this.keys.spec.port.value_invalid = true;
                    this.keys.spec.port.validation_error = 'مقدار پورت اجباری است';
                    return false;
                }
                if (input.target.value > 65535 || input.target.value < 1) {
                    this.keys.spec.port.value_invalid = true;
                    this.keys.spec.port.validation_error = 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد';
                    return false;
                }

                this.keys.spec.port.value_invalid = false;

            }, validateReplicas(input) {
                if (input.target.value === '') {
                    this.keys.spec.replicas.value_invalid = true;
                    this.keys.spec.replicas.validation_error = 'مقدار رپلیکا حداقل باید ۱ باشد';
                    return false;
                }

                this.keys.spec.replicas.value_invalid = false;

            }, validateDomain(input) {

                if (!input.target.value) {
                    this.keys.spec.domains.value_invalid = true;
                    this.keys.spec.domains.validation_error = 'مقدار دامنه خالی است';
                    return false;
                }

                if (input.target.value === '') {
                    this.keys.spec.domains.value_invalid = true;
                    this.keys.spec.domains.validation_error = 'مقدار دامنه خالی است';
                    return false;
                }

                this.keys.spec.domains.value_invalid = false;

            },
            validateEnvironmentVariable() {


                if (this.manifest_model.environment_variable.name === null) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'نام environment variable نمی‌تواند خالی باشد';
                    return false;
                }

                if (this.manifest_model.environment_variable.name.trim().length === 0) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'نام environment variable نمی‌تواند خالی باشد';
                    return false;
                }

                if (this.rules.no_space(this.manifest_model.environment_variable.name.trim()) !== true) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'نام environment variable نمی‌تواند شامل space باشد';
                    return false;
                }

                if (this.rules.regex(this.manifest_model.environment_variable.name.trim()) !== true) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'فقط حروف کوچک، حروف بزرگ، underscore و اعداد معتبر هستند';
                    return false;
                }

                if (this.rules.redundant(this.manifest_model.environment_variable.name.trim()) !== true) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'مقدار تکراری است';
                    return false;
                }

                if (this.manifest_model.environment_variable.value === null && this.manifest_model.environment_variable.secret === null) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'حداقل یکی از مقادیر secret و یا value را باید وارد کنید';
                    return false;
                }

                if (this.manifest_model.environment_variable.secret && this.rules.secret_regex(this.manifest_model.environment_variable.secret)) {
                    this.keys.spec.env.value_invalid = true;
                    this.keys.spec.env.validation_error = 'نام secret وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)';
                    return false;
                }

                this.keys.spec.env.value_invalid = false;
                return true;
            },
            validateVolumeMounts() {

                if (this.manifest_model.volumes.volume.mount_path === null) {
                    this.keys.spec.volume_mounts.value_invalid = true;
                    this.keys.spec.volume_mounts.validation_error = 'مقدار mount_path نمی‌تواند خالی باشد';
                    return false;
                }


                if (this.manifest_model.volumes.volume.mount_path.trim().length === 0) {
                    this.keys.spec.volume_mounts.value_invalid = true;
                    this.keys.spec.volume_mounts.validation_error = 'مقدار mount_path نمی‌تواند خالی باشد';
                    return false;
                }

                if (this.rules.volume_mounts.is_root_addressed(this.manifest_model.volumes.volume.mount_path) !== true) {
                    this.keys.spec.volume_mounts.value_invalid = true;
                    this.keys.spec.volume_mounts.validation_error = 'آدرس وارد شده، باید از root (/) شروع شود';
                    return false;

                }

                if (this.rules.no_space(this.manifest_model.volumes.volume.mount_path) !== true) {
                    this.keys.spec.volume_mounts.value_invalid = true;
                    this.keys.spec.volume_mounts.validation_error = 'فاصله در mount_path مجاز نیست';
                    return false;
                }

                if (this.rules.volume_mounts.redundant(this.manifest_model.volumes.volume.mount_path) !== true) {
                    this.keys.spec.volume_mounts.value_invalid = true;
                    this.keys.spec.volume_mounts.validation_error = 'مقدار mount_path تکراری است';
                    return false;
                }

                if (this.manifest_model.volumes.volume.sub_path !== null) {
                    if (this.rules.volume_mounts.no_slash(this.manifest_model.volumes.volume.sub_path) !== true) {
                        this.keys.spec.volume_mounts.value_invalid = true;
                        this.keys.spec.volume_mounts.validation_error = 'مقدار / در sub_path مجاز نیست';
                        return false;
                    }
                }

                if (this.manifest_model.volumes.volume.volume_name !== null) {

                    if (this.rules.volume_mounts.volume_name_regex(this.manifest_model.volumes.volume.volume_name.trim()) !== true) {
                        this.keys.spec.volume_mounts.value_invalid = true;
                        this.keys.spec.volume_mounts.validation_error = 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)';
                        return false;
                    }

                    if (this.rules.volume_mounts.no_space(this.manifest_model.volumes.volume.volume_name.trim()) !== true) {
                        this.keys.spec.volume_mounts.value_invalid = true;
                        this.keys.spec.volume_mounts.validation_error = 'فاصله در volume_name مجاز نیست';
                        return false;
                    }

                }

                this.keys.spec.volume_mounts.value_invalid = false;
                return true;
            },
            validatePortMapping() {

                if (this.manifest_model.port_mapping.port_map.port === null) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار port اجباری است';
                    return false;
                }

                if (this.manifest_model.port_mapping.port_map.port.toString().trim().length === 0) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار port اجباری است';
                    return false;
                }

                if (this.manifest_model.port_mapping.port_map.target_port === null) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار target_port اجباری است';
                    return false;
                }


                if (this.manifest_model.port_mapping.port_map.target_port.toString().trim().length === 0) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار target_port اجباری است';
                    return false;
                }

                if (this.rules.port_mapping.valid_port(this.manifest_model.port_mapping.port_map.port) !== true) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار port باید بین ۱ تا ۶۵۵۳۵ باشد';
                    return false;
                }

                if (this.rules.port_mapping.valid_port(this.manifest_model.port_mapping.port_map.target_port) !== true) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار target_port باید بین ۱ تا ۶۵۵۳۵ باشد';
                    return false;
                }

                if (this.rules.port_mapping.redundant(this.manifest_model.port_mapping.port_map.port) !== true) {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار port_mapping تکراری است';
                    return false;
                }

                if (this.manifest_model.port_mapping.port_map.protocol !== 'TCP' && this.manifest_model.port_mapping.port_map.protocol !== 'UDP') {
                    this.keys.spec.port_mapping.value_invalid = true;
                    this.keys.spec.port_mapping.validation_error = 'مقدار protocol تنها می‌تواند UDP یا TCP باشد';
                    return false;
                }

                this.keys.spec.port_mapping.value_invalid = false;
                return true;
            },
            validateMemory(input) {
                if (!input.target.value) {
                    this.manifest_model.service.memory.amount = 200;
                    return false;
                }

                if (input.target.value < 0) {
                    this.manifest_model.service.memory.amount = 200;
                    return false;
                }
            },
            validateLivenessPort(input) {

                if (!input.target.value) {
                    this.keys.spec.liveness_probe.value_invalid = false;
                    return;
                }

                if (input.target.value > 65535 || input.target.value < 1) {
                    this.keys.spec.liveness_probe.value_invalid = true;
                    this.keys.spec.liveness_probe.validation_error = 'مقدار port باید بین ۱ تا ۶۵۵۳۵ باشد';
                    return false;
                }

                this.keys.spec.liveness_probe.value_invalid = false;
            },
            validateLivenessPath(input) {

                if (!input.target.value) {
                    this.keys.spec.liveness_probe.value_invalid = false;
                    return;
                }

                if (!input.target.value) {
                    this.keys.spec.liveness_probe.value_invalid = true;
                    this.keys.spec.liveness_probe.validation_error = 'مقدار path اجباری است';
                    return false;
                }

                this.keys.spec.liveness_probe.value_invalid = false;

            },
            validateReadinessPort(input) {

                if (!input.target.value) {
                    this.keys.spec.readiness_probe.value_invalid = false;
                    return;
                }

                if (input.target.value > 65535 || input.target.value < 1) {
                    this.keys.spec.readiness_probe.value_invalid = true;
                    this.keys.spec.readiness_probe.validation_error = 'مقدار port باید بین ۱ تا ۶۵۵۳۵ باشد';
                    return false;
                }

                this.keys.spec.readiness_probe.value_invalid = false;
            },
            validateReadinessPath(input) {

                if (!input.target.value) {
                    this.keys.spec.readiness_probe.value_invalid = false;
                    return;
                }

                if (!input.target.value) {
                    this.keys.spec.readiness_probe.value_invalid = true;
                    this.keys.spec.readiness_probe.validation_error = 'مقدار path اجباری است';
                    return false;
                }

                this.keys.spec.readiness_probe.value_invalid = false;

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

    .cli-input-key-label
        text-align: left
        color: #27fffd
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

    .invalid-message
        width 100%
        color #fe135c
        text-align center
        font-size .9em
        padding-top 6px
        padding-bottom 6px

</style>
