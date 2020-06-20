<template>

    <div class="row" style="width: 100%; margin-left: 0; margin-right: 0;">

        <div class="container-fluid col-lg-11 col-md-11 col-xs-12 col-sm-12">

            <div style="width: 100%;">

                <div v-if="page_status === 'ticket_details'" class="right" style="float: right;"><p
                        class="title_header">
                    {{page_title}}/{{ticket_details !== null ? ticket_details.id : '_'}}</p>
                </div>
                <div v-else class="right" style="float: right;"><p class="title_header">
                    {{new_ticket_title}}</p>
                </div>

                <div class="support-header-container">

                    <div class="support-header-action-container">

                        <button v-if="page_status === 'ticket_details'"
                                class="support-new-ticket-button"
                                @click="page_status = 'new_ticket'">
                            {{new_ticket_text}}
                        </button>

                    </div>

                    <div v-if="page_status === 'ticket_details'"
                         class="support-header-ticket-details">

                        <p class="ticket-details-id">{{ticket_details !== null ? ticket_details.id : ''}}</p>

                        <div class="ticket-details-divider"></div>

                        <p class="ticket-details-title">{{ticket_details !== null ? ticket_details.title : ''}}</p>

                        <img src="../../../components/Dashboard/header/icons/arrow-point-to-right.svg"
                             alt="back"
                             @click="backToIndex"
                             class="ticket-details-button">

                    </div>

                    <div v-else class="support-header-ticket-details">
                        <p class="ticket-details-title">{{ticket_details_title}}</p>
                    </div>

                </div>

                <div v-if="page_status === 'ticket_details'"
                     class="support-ticket-details-container">

                    <ticket-complete-row
                            v-if="ticket_details"
                            :header="titleRowComplete"
                            :func="replaceTicketDetails"
                            class="ticket-complete-row"
                            :is_simple="page_status === 'ticket_details'"
                            :cel-specs="tickets.results">
                    </ticket-complete-row>

                    <div v-if="ticket_details" class="ticket-conversation-container">
                        <div id="conversation_view" class="conversation-view">

                            <div :class="[!ticket_details.user.is_admin ? 'user-reply-container' : 'admin-reply-container']">
                                <div :class="[!ticket_details.user.is_admin ? 'user-reply' : 'admin-reply']">
                                    <div>
                                        <img :src="require('../../../assets/svg/' + (!ticket_details.user.is_admin ?
                                         'ic-person' : 'ic-support-person') + '.svg')"
                                             :alt="!ticket_details.user.is_admin ? 'ic-person' : 'ic-support-person'">
                                        <p class="reply-username">{{ticket_details.user.username}}</p>
                                    </div>
                                    <div class="reply-message-divider"></div>
                                    <pre :disabled="'true'"
                                       dir="auto"
                                       class="reply-message">
                                        {{ticket_details.description}}
                                    </pre>
                                </div>
                                <div v-if="ticket_details.files.length > 0"
                                     class="ticket-attachment-container row"
                                     style="margin-left: 0; margin-right: 0;">

                                    <div v-for="(file, index) in ticket_details.files.length < 5 ? ticket_details.files : ticket_details.files.slice(0, 4)"
                                         :key="file.id"
                                         class="col-lg-6 col-md-6 col-sm-6 col-xs-6">

                                        <img v-if="index < 3"
                                             :id="`img-${ticket_details.id}-${file.id}`"
                                             class="attachment-image"
                                             alt=""
                                             @click="showTicketImages(ticket_details.files, index)"
                                             :src="getTicketFiles(file.id, `img-${ticket_details.id}-${file.id}`)">

                                        <img v-else-if="index < 4 && ticket_details.files.length < 5"
                                             :id="`img-${ticket_details.id}-${file.id}`"
                                             class="attachment-image"
                                             alt=""
                                             @click="showTicketImages(ticket_details.files, index)"
                                             :src="getTicketFiles(file.id, `img-${ticket_details.id}-${file.id}`)">

                                        <img v-else
                                             class="attachment-image"
                                             @click="showTicketImages(ticket_details.files, 0)"
                                             src="../../../assets/svg/ic-more-attachment.svg"
                                             alt="more">

                                        <img src="../../../assets/svg/ic-see.svg"
                                             alt="view-attachment"
                                             class="attachment-zoom">

                                    </div>

                                </div>
                                <p class="reply-date">{{ticket_details.created_at}}</p>
                            </div>


                            <div v-if="ticket_details.replies.length > 0"
                                 :id="index === ticket_details.replies.length - 1 ? 'last-reply' : ''"
                                 v-for="(reply, index) in ticket_details.replies"
                                 :class="[!reply.user.is_admin ? 'user-reply-container' : 'admin-reply-container']">
                                <div :class="[!reply.user.is_admin ? 'user-reply' : 'admin-reply']">
                                    <div>
                                        <img :src="require('../../../assets/svg/' + (!reply.user.is_admin ? 'ic-person' : 'ic-support-person') + '.svg')"
                                             :alt="!reply.user.is_admin ? 'ic-person' : 'ic-support-person'">
                                        <p class="reply-username">{{reply.user.username}}</p>
                                    </div>
                                    <div class="reply-message-divider"></div>
                                    <pre :disabled="'true'"
                                       dir="auto"
                                       class="reply-message">
                                        {{reply.answer}}
                                    </pre>
                                </div>
                                <div v-if="reply.files.length > 0"
                                     class="ticket-attachment-container row"
                                     style="margin-left: 0; margin-right: 0;">

                                    <div v-for="(file, index) in reply.files.length < 5 ? reply.files : reply.files.slice(0, 4)"
                                         :key="file.id"
                                         class="col-lg-6 col-md-6 col-sm-6 col-xs-6">

                                        <img v-if="index < 3"
                                             :id="`img-${reply.id}-${file.id}`"
                                             class="attachment-image"
                                             alt="attachment"
                                             @click="showTicketImages(reply.files, index)"
                                             :src="getTicketFiles(file.id, `img-${reply.id}-${file.id}`)">

                                        <img v-else-if="index < 4 && reply.files.length < 5"
                                             :id="`img-${reply.id}-${file.id}`"
                                             class="attachment-image"
                                             alt="attachment"
                                             @click="showTicketImages(reply.files, index)"
                                             :src="getTicketFiles(file.id, `img-${reply.id}-${file.id}`)">

                                        <img v-else
                                             class="attachment-image"
                                             @click="showTicketImages(reply.files, 0)"
                                             src="../../../assets/svg/ic-more-attachment.svg"
                                             alt="more">

                                        <img src="../../../assets/svg/ic-see.svg"
                                             alt="view-attachment"
                                             class="attachment-zoom">

                                    </div>

                                </div>
                                <p class="reply-date">{{reply.created_at}}</p>
                            </div>
                        </div>

                        <div v-if="ticket_details.status !== 'CLOSED' && source"
                             style=" width: 100%; height: max-content; max-width: 658px; overflow-x: auto; background-color: rgba(0, 0, 0, 0.1); margin: 0;">

                            <div id="thumbnail-container"
                                 class="attachment-preview-container">
                            </div>

                        </div>

                        <div v-if="ticket_details.status !== 'CLOSED'"
                             class="chat-input-container">

                            <div class="send-message-action-container">
                                <img src="../../../assets/svg/ic-send-message.svg"
                                     alt="send"
                                     @click="e => sendReply(e, ticket_details.id)">
                            </div>

                            <div class="message-input-container">

                                <div class="upload-btn-wrapper2">

                                    <input accept="image/png, image/jpg, text/plain, application/pdf"
                                           @change="e => changeFiles(e.target)"
                                           type="file"
                                           multiple
                                           ref="upload"
                                           @click="e => e.target.value = null && alert(e.target.value)"
                                           name="files[]"
                                           id="source_1"/>

                                    <img id='file'
                                         ref='file'
                                         src="../../../assets/svg/ic-attach-file.svg"
                                         alt="attach"
                                         @click="notifyUpload"
                                         class="button-attach-file">

                                </div>

                                <div class="message-input-divider"></div>

                                <textarea class="message-input"
                                          type="text"
                                          dir="auto"
                                          @input="e => this.ticket_reply = e.target.value"
                                          ref="ticket_message"
                                          :rows="this.ticket_reply.split(/\r\n|\r|\n/).length"
                                          @keyup.enter="e => sendReply(e, ticket_details.id)"
                                          :placeholder="enter_message">
                                </textarea>

                            </div>

                        </div>

                    </div>

                </div>

                <div v-else class="new-ticket-container">

                    <div class="new-ticket-right-pane">

                        <div class="new-ticket-title-container">

                            <div class="new-ticket-title-inner-container">

                                <p class="new-ticket-label">{{ticket_title_label}}</p>
                                <p class="new-ticket-input-counter">{{this.ticket_title.length}}/120</p>

                            </div>

                            <textarea name="title_text"
                                      maxlength="120"
                                      class="new-ticket-title-input"
                                      dir="auto"
                                      @input="e => this.ticket_title = e.target.value"
                                      :placeholder="ticket_title_hint">
                            </textarea>

                        </div>

                        <div class="new-ticket-department-container">

                            <div class="new-ticket-department-selection">

                                <div class="department-selection-label-container">

                                    <p>{{ this.selected_department ?
                                        this.selected_department.local_name :
                                        this.select_department_label }}
                                    </p>

                                    <img src="../../../assets/svg/arrow.svg"/>

                                </div>

                                <div class="department-selection-list-container">

                                    <p @click="chooseDepartment(index)"
                                       v-for="(dep, index) in department_options">
                                        {{dep.local_name}}
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div class="new-ticket-attachment-container"
                             :style="{borderRadius: source ? '2px 2px 0 0' : '2px'}">

                            <input accept="image/png, image/jpg, text/plain, application/pdf"
                                   @change="e => changeFiles(e.target)"
                                   type="file"
                                   multiple
                                   @click="e => e.target.value = null && alert(e.target.value)"
                                   name="files[]"
                                   id="source_2"
                                   ref="upload"/>

                            <div class="new-ticket-attachment-label-container"
                                 @click="notifyUpload">

                                <p>{{attachment_title}}</p>

                                <img src="../../../assets/svg/ic-attach-file.svg"/>

                            </div>

                        </div>

                        <transition name="fade">

                            <div v-if="source"
                                 class="new-ticket-attachment-preview-container">

                                <div id="thumbnail-container-2"
                                     class="attachment-preview-container">
                                </div>

                            </div>

                        </transition>

                    </div>

                    <div class="new-ticket-message-text-input">

                        <div style="width: 100%; display: flex; flex-direction: row; background-color: #0045ff; padding: 8px 16px;">
                            <p style="font-size: 1em; font-weight: normal; font-family: iran-yekan; width: 100%;
                                      color: #fefefe; margin-bottom: 0;">
                                {{ticket_description_label}}</p>

                            <p style="font-size: .8em; font-weight: normal; font-family: iran-sans;
                                      color: #fefefe; margin-bottom: auto; margin-top: auto; margin-right: auto">
                                {{this.ticket_description.length}}/1500
                            </p>
                        </div>

                        <textarea name="message"
                                  maxlength="1500"
                                  dir="auto"
                                  @input="e => this.ticket_description = e.target.value"
                                  :placeholder="ticket_description_hint">
                        </textarea>

                    </div>

                </div>

            </div>

            <div v-if="page_status === 'new_ticket'" class="support-header-container">

                <div class="support-footer-action-container">

                    <button class="support-new-ticket-button"
                            @click="sendNewTicket">
                        {{apply_ticket_text}}
                    </button>

                    <button class="support-cancel-ticket-button"
                            @click="cancelNewTicket">
                        {{cancel_text}}
                    </button>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import TitleRow from "~/components/Dashboard/profile/title-row"
    import Moment from 'moment-jalaali'
    import File from "~/components/elements/file";
    import TicketCompleteRow from "../../../components/Dashboard/support/ticket-complete-row"
    import {formData} from "../../../utils/formData";
    import ErrorReporter from "../../../utils/ErrorReporter";

    export default {
        name: "_id",
        layout: 'dashboard',
        components: {
            TicketCompleteRow,
            TitleRow,
            File,
            Moment

        }, data() {
            return {
                message: '',
                page_title: 'تیکت',
                ticket_details_title: 'ایجاد تیکت جدید',
                page_status: 'ticket_details',
                new_ticket_title: 'تیکت جدید...',
                ticket_id: this.$route.params.ticket,
                source: null,
                search_hint: 'جست‌و‌جو در تیکت‌ها...',
                cancel_text: 'انصراف',
                new_ticket_text: 'تیکت جدید',
                apply_ticket_text: 'ارسال تیکت',
                titleRowComplete: [
                    {title: 'شماره', width: '8%'},
                    {title: 'وضعیت', width: '12%'},
                    {title: 'تاریخ', width: '15%'},
                    {title: 'بخش', width: '10%'},
                    {title: 'موضوع تیکت', width: '55%'}
                ],
                titleRowSimple: [
                    {title: 'شماره', width: '8%'},
                    {title: 'وضعیت', width: '12%'},
                    {title: 'موضوع تیکت', width: '80%'}
                ],
                is_simple: false,
                tickets: {},
                ticket_details: null,
                enter_message: 'پیام خود را وارد نمایید...',
                ticket_reply: '',
                view_attachment: 'مشاهده پیوست',
                attachments: [],
                select_department_label: 'انتخاب بخش:',
                show_departments: false,
                selected_department: null,
                department_title: 'انتخاب بخش:',
                attachment_title: 'پیوست:',
                ticket_title: '',
                ticket_title_label: 'عنوان تیکت:',
                ticket_title_hint: 'عنوان تیکت را وارد نمایید...',
                ticket_description: '',
                ticket_description_label: 'متن تیکت:',
                ticket_description_hint: 'متن تیکت را وارد نمایید...',
                department_options: [
                    {
                        local_name: 'مالی و حسابداری',
                        name: 'SALE'
                    },
                    {
                        local_name: 'فنی',
                        name: 'TECHNICAL'
                    },
                ]
            }
        },
        methods: {
            async sendNewTicket() {

                this.$store.commit("SET_DATA", {data: true, id: "loading"});

                if (this.ticket_title === '') {
                    this.$notify({
                        title: 'تیتر تیکت را وارد نکرده‌اید',
                        time: 4000,
                        type: "error"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    return
                }

                if (this.ticket_description === '') {
                    this.$notify({
                        title: 'متن تیکت را وارد نکرده‌اید',
                        time: 4000,
                        type: "error"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    return
                }

                if (this.selected_department === null) {
                    this.$notify({
                        title: 'بخش مربوطه برای پاسخگویی را انتخاب نکرده‌اید',
                        time: 4000,
                        type: "error"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    return
                }


                let fd = formData([
                    {
                        name: 'title',
                        value: this.ticket_title
                    },
                    {
                        name: 'description',
                        value: this.ticket_description
                    },
                    {
                        name: 'department',
                        value: this.selected_department.name
                    },
                ]);

                if (this.source) {
                    for (let file of this.source)
                        fd.append('file', file)
                }

                try {
                    let ticket_object = await this.$store.dispatch("sendNewTicket", {formData: fd});
                    this.$router.replace(`/dashboard/support/${ticket_object.id}`);
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});

                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: ErrorReporter(e, this.$data),
                            time: 4000,
                            type: "error"
                        });
                    }
                }

            },
            cancelNewTicket() {
                this.selected_department = null;
                this.show_departments = false;
                this.ticket_title = '';
                this.ticket_description = '';
                this.page_status = 'ticket_details';
                if (this.source) {
                    document.getElementById('thumbnail-container-2').innerHTML = '';
                    this.source = null;
                }
            },
            chooseDepartment(index) {
                this.selected_department = this.department_options[index];
                this.show_departments = false;
            },
            async getData() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {
                    this.tickets = await this.$store.dispatch("getTickets");
                    this.tickets.results = this.tickets.results.map(({id, title, description, files, user, created_at, status, department}) => {
                        return {
                            id,
                            title,
                            description,
                            files,
                            user,
                            created_at: Moment(created_at).format('HH:mm jYYYY/jMM/jDD'),
                            status: status === 'PENDING' ? `<div class="ticket-status-pending"><p>در حال بررسی</p></div>` :
                                status === 'CLOSED' ? `<div class="ticket-status-closed"><p>بسته شده</p></div>` :
                                    status === 'ADMIN_ANSWER' ? `<div class="ticket-status-admin-answer"><p>پاسخ پشتیبان</p></div>` :
                                        status === 'USER_ANSWER' ? `<div class="ticket-status-user-answer"><p>در انتظار پاسخ</p></div>` : '',
                            department: department === 'TECHNICAL' ? 'فنی' : 'حسابداری'
                        };
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
            async getReplies(ticket_id) {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {
                    let ticket_replies = await this.$store.dispatch("getTicketReplies", ticket_id);

                    this.ticket_details = {...ticket_replies};
                    this.ticket_details.created_at = Moment(ticket_replies.created_at).format('HH:mm jYYYY/jMM/jDD');

                    await this.$nextTick();

                    this.ticket_details.replies = ticket_replies.replies.map(({id, files, user, created_at, answer}) => {
                        return {
                            id,
                            files,
                            user,
                            created_at: Moment(created_at).format('HH:mm jYYYY/jMM/jDD'),
                            answer
                        };
                    });

                    this.$nextTick();
                    document.getElementById('conversation_view').scrollTop = 99999999;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});

                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: ErrorReporter(e, this.$data),
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
            async getTicketFiles(file_id, element_id) {

                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {
                    let response = await this.$store.dispatch("getTicketFiles", file_id);
                    var reader = new window.FileReader();
                    reader.readAsDataURL(response);
                    reader.onload = function () {
                        if (response.type === 'text/plain') {
                            document.getElementById(element_id).src = require('../../../assets/svg/ic-file-text.svg')
                        } else if (response.type === 'application/pdf') {
                            document.getElementById(element_id).src = require('../../../assets/svg/ic-pdf-file.svg')
                        } else {
                            document.getElementById(element_id).src = reader.result;
                        }
                    };
                    await this.$nextTick();
                    document.getElementById('conversation_view').scrollTop = 99999999;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});

                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
            async sendReply(e, ticket_id) {

                if (e.shiftKey === true) {
                    return;
                }

                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {

                    if (this.ticket_reply.length === 0) {
                        this.$notify({
                            title: 'متن تیکت را وارد نکرده‌اید.',
                            time: 4000,
                            type: "error"
                        });
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        return;
                    }

                    let fd = formData([
                        {
                            name: 'answer',
                            value: this.ticket_reply
                        }
                    ]);

                    if (this.source) {
                        for (let file of this.source)
                            fd.append('file', file)
                    }

                    let response = await this.$store.dispatch("sendTicketReply", {ticket_id: ticket_id, formData: fd});
                    this.ticket_reply = '';
                    this.$refs.ticket_message.value = '';
                    if (this.source) {
                        const thumbnailNode = document.getElementById('thumbnail-container');
                        thumbnailNode.innerHTML = '';
                        this.source = null;
                    }
                    response.created_at = Moment(response.created_at).format('HH:mm jYYYY/jMM/jDD');
                    this.ticket_details.replies.push(response);
                    this.$nextTick();
                    document.getElementById('conversation_view').scrollTop = 99999999;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
            replaceTicketDetails(index) {
                if (this.tickets.results[index].id !== parseInt(this.ticket_id))
                    this.$router.replace(`/dashboard/support/${this.tickets.results[index].id}`);

            },
            backToIndex() {
                this.$router.replace('/dashboard/support');
            },
            changeFiles(target) {

                var files = target.files;

                if (this.source) {
                    if (document.getElementById(this.page_status === 'ticket_details' ? 'thumbnail-container' : 'thumbnail-container-2').children.length > 0)
                        document.getElementById(this.page_status === 'ticket_details' ? 'thumbnail-container' : 'thumbnail-container-2').innerHTML = ''
                }

                this.$nextTick(() => {
                    this.source = null;

                    if (files) {

                        this.source = files;

                        for (const [key, value] of Object.entries(this.source)) {
                            this.readSourceImage(value)
                        }
                    }
                })

            },
            notifyUpload() {
                this.$refs.upload.click()
            },
            readSourceImage(file) {
                var reader = new window.FileReader();
                reader.readAsDataURL(file);
                var vm = this;
                reader.onload = function () {
                    var DOM_div = document.createElement("div");
                    DOM_div.id = `thumbnail-${file.name}`;
                    DOM_div.className = 'preview-style';

                    var DOM_img = document.createElement("img");
                    DOM_img.className = 'main-img';

                    if (reader.result.indexOf('application/pdf') !== -1) {
                        DOM_img.src = require('../../../assets/svg/ic-pdf-file.svg')
                    } else if (reader.result.indexOf('text/plain') !== -1) {
                        DOM_img.src = require('../../../assets/svg/ic-file-text.svg');
                    } else {
                        DOM_img.src = reader.result;
                    }

                    var DOM_remove_btn = document.createElement("img");
                    DOM_remove_btn.className = 'remove-thumb-btn';
                    DOM_remove_btn.src = require('../../../assets/svg/ic_delete.svg');

                    DOM_div.appendChild(DOM_img);
                    DOM_div.appendChild(DOM_remove_btn);

                    document.getElementById(vm.page_status === 'ticket_details' ? 'thumbnail-container' : 'thumbnail-container-2').appendChild(DOM_div);

                    document.getElementById(`thumbnail-${file.name}`).addEventListener('click', function () {
                        vm.source = Array.from(vm.source).filter(function (item) {
                            return item.name !== file.name
                        });

                        if (vm.source.length === 0) {
                            vm.source = null
                        }
                        document.getElementById(vm.page_status === 'ticket_details' ? 'thumbnail-container' : 'thumbnail-container-2').removeChild(document.getElementById(`thumbnail-${file.name}`))
                    }, false);
                }
            },
            showTicketImages(images, index) {
                let image_object = {
                    selected_image: images[index],
                    images: images
                };
                this.$store.commit('SET_DATA', {data: image_object, id: 'ticket_images'})
            }
        },
        created() {
            this.getData();
            this.getReplies(this.ticket_id)
        }, mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
        },
        beforeDestroy() {
            this.$store.commit("SET_DATA", {data: null, id: "ticket_images"});
        }
    }
</script>

<style lang="stylus" scoped>

    input,
    input::-webkit-input-placeholder
        font-size .9em
        white-space nowrap
        overflow-x fragments


    textarea::placeholder
        font-size .9em
        white-space nowrap
        overflow-x fragments
        direction rtl
        padding-top 2px


    .title_header
        font-family yekan-number-regular
        font-style normal
        font-weight bold
        font-size 1.8em
        font-stretch normal
        line-height 1.75
        padding-top 18px
        color #7c7c7c
        letter-spacing normal
        padding-bottom 16px

    .support-header-container
        width 100%
        display flex
        flex-direction row
        @media only screen and (max-width 992px)
            flex-direction column

        div.support-header-action-container
            display flex
            flex-direction row
            flex .45
            width 100%
            @media only screen and (max-width 992px)
                margin-bottom 16px

            button.support-new-ticket-button
                height 45px
                width 200px
                background-color #00dcf5
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                border-radius 3px
                color #333
                font-size 1em
                outline none
                font-family iran-yekan
                transition all .3s ease-in-out
                @media only screen and (max-width 992px)
                    height 34px
                    width 150px

            button.support-new-ticket-button:hover
                background-color #00E5FF
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.25)


            button.support-apply-ticket-button
                outline none

            button.support-apply-ticket-button:hover
            button.support-cancel-ticket-button
                height 45px
                width 200px
                background-color #f53388
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                border-radius 3px
                color #fefefe
                font-size 1em
                outline none
                font-family iran-yekan
                margin-right 6px
                transition all .3s ease-in-out
                @media only screen and (max-width 992px)
                    height 34px
                    width 150px

            button.support-cancel-ticket-button:hover
                background-color #ff4095
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.25)


        div.support-footer-action-container
            display flex
            flex-direction row
            flex .45
            padding-top 16px
            margin-right auto
            margin-left unset
            width max-content
            @media only screen and (max-width 992px)
                margin-bottom 16px
                margin-left auto
                margin-right auto

            button.support-new-ticket-button
                height 45px
                width 200px
                background-color #00dcf5
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                border-radius 3px
                color #333
                font-size 1em
                outline none
                font-family iran-yekan
                transition all .3s ease-in-out
                @media only screen and (max-width 992px)
                    height 34px
                    width 150px

            button.support-new-ticket-button:hover
                background-color #00E5FF
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.25)


            button.support-apply-ticket-button
                outline none

            button.support-apply-ticket-button:hover
            button.support-cancel-ticket-button
                height 45px
                width 200px
                background-color #f53388
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                border-radius 3px
                color #fefefe
                font-size 1em
                outline none
                font-family iran-yekan
                margin-right 6px
                transition all .3s ease-in-out
                @media only screen and (max-width 992px)
                    height 34px
                    width 150px

            button.support-cancel-ticket-button:hover
                background-color #ff4095
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.25)


        div.support-header-search-bar
            width 100%
            box-shadow 0 3px 6px rgba(0, 0, 0, 0.12)
            background-color #fefefe
            border-radius 3px
            height 45px
            flex 0.55
            flex-direction row
            display flex
            padding 4px 4px
            transition all .3s ease-in-out
            @media only screen and (max-width 992px)
                height 34px
                padding 2px 2px


            div.support-search-bar-action-container
                flex 0.07
                height 100%
                width 100%
                display flex

                img
                    width 18px
                    height 18px
                    margin auto
                    filter invert(1)
                    opacity .5
                    cursor pointer
                    transition all .3s ease-in-out
                    @media only screen and (max-width 992px)
                        width 16px
                        height 16px

            div.support-header-search-container
                background-color #F2F2F2
                flex 0.93
                height 100%
                width 100%
                border-radius 3px

                input
                    font-family iran-yekan
                    outline none
                    width 100%
                    height 100%
                    padding 0 8px

        div.support-header-search-bar:focus-within
            box-shadow 0 1px 6px 3px rgba(0, 0, 0, 0.17)

            div.support-search-bar-action-container
                img
                    opacity 1

        div.support-header-ticket-details
            width 100%
            box-shadow 0 3px 6px rgba(0, 0, 0, 0.07)
            background-color #fefefe
            border-radius 2px
            height 45px
            flex 0.55
            flex-direction row
            display flex
            padding 4px 4px
            transition all .3s ease-in-out
            @media only screen and (max-width 992px)
                padding 2px 2px

            p.ticket-details-id
                font-size 1em
                color #111
                margin auto 0
                padding 0 12px
                font-family iran-sans

            div.ticket-details-divider
                width 1px
                background-color #7f828b
                border-radius 2px
                margin 4px 0

            p.ticket-details-title
                font-size 1em
                color #111
                margin auto 0
                padding 0 12px

            img.ticket-details-button
                transform rotate(-90deg)
                margin-right auto
                margin-left 8px
                cursor pointer


    .support-ticket-details-container
        width 100%
        display flex
        flex-direction row
        @media only screen and (max-width 992px)
            flex-direction column

        .ticket-complete-row
            margin-right 0
            flex .45
            margin-left 12px
            @media only screen and (max-width 992px)
                display none

        div.ticket-conversation-container
            flex .57
            margin-top 16px
            display flex
            flex-direction column

            div.conversation-view
                background-color #fefefe
                border-radius 2px
                box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
                width 100%
                min-height 450px
                max-height 500px
                overflow-y scroll
                display flow-root
                flex-direction column
                padding 16px

                div.user-reply-container
                    display flex
                    flex-direction column
                    width 50%
                    margin-left auto
                    @media only screen and (max-width 992px)
                        width 75%

                    div.user-reply
                        padding 12px 16px
                        border-radius 20px 0 20px 20px
                        background-color #00E5FF
                        flex-direction column
                        display flex

                        div
                            width max-content
                            display flex
                            flex-direction row

                            p.reply-username
                                margin 0
                                color #3c3c3c
                                font-family 'Helvetica Neue'
                                font-size .9em
                                font-weight normal
                                display flex
                                line-height 22px

                            img
                                width 22px
                                height 22px
                                padding 3px
                                border-radius 15px
                                border 1px solid #000
                                margin-left 8px
                                opacity .5
                                margin-top auto
                                margin-bottom auto


                        div.reply-message-divider
                            height 1px
                            background-color #000
                            width 100%
                            margin 8px 0
                            opacity .2

                        pre.reply-message
                            color #3c3c3c
                            font-family iran-yekan
                            font-size .8em
                            margin-bottom 0
                            line-height normal
                            white-space pre-line
                            white-space -moz-pre-wrap
                            white-space -o-pre-wrap
                            word-wrap break-word
                            unicode-bidi plaintext
                            overflow-wrap break-word

                    p.reply-date
                        color #7C7C7C
                        font-family iran-sans
                        font-size .7em
                        margin 0 16px 0 0

                    div.ticket-attachment-container
                        width 100%
                        margin-left auto
                        margin-top 12px

                        div
                            padding 2px
                            position relative
                            display flex
                            transition all .3s ease-in-out

                            img.attachment-image
                                width 100%
                                height 100%
                                max-height 90px
                                cursor pointer
                                object-fit cover
                                border-radius 5px
                                transition all .3s ease-in-out

                            img.attachment-zoom
                                width 42px
                                height 42px
                                top 25%
                                left 36%
                                opacity 0
                                padding 12px
                                background-color rgba(27, 28, 32, 0.4)
                                border-radius 15px
                                position absolute
                                pointer-events none
                                transition all .3s ease-in-out

                        div:hover

                            img.attachment-image
                                filter blur(2px)

                            img.attachment-zoom
                                opacity 1


                div.admin-reply-container
                    display flex
                    flex-direction column
                    width 50%
                    margin-right auto
                    @media only screen and (max-width 992px)
                        width 75%

                    div.admin-reply
                        padding 12px 16px
                        border-radius 0 20px 20px 20px
                        background-color #2979FF
                        flex-direction column
                        display flex

                        div
                            width 100%
                            display flex
                            direction ltr
                            flex-direction row


                            p.reply-username
                                margin 0
                                color #fefefe
                                font-family 'Helvetica Neue'
                                font-size .9em
                                font-weight normal
                                display flex
                                line-height 22px

                            img
                                width 22px
                                height 22px
                                padding 3px
                                border-radius 15px
                                border 1px solid #000
                                margin-right 8px
                                filter invert(1)
                                opacity .75
                                margin-top auto
                                margin-bottom auto

                        div.reply-message-divider
                            height 1px
                            background-color #fff
                            margin 8px 0
                            opacity .2

                        pre.reply-message
                            color #fefefe
                            font-family iran-yekan
                            font-size .8em
                            margin-bottom 0
                            white-space pre-line
                            white-space -moz-pre-wrap
                            white-space -o-pre-wrap
                            word-wrap break-word
                            line-height normal
                            unicode-bidi plaintext
                            overflow-wrap break-word


                    p.reply-date
                        color #7C7C7C
                        font-family iran-sans
                        font-size .7em
                        margin-right auto
                        margin-left 16px

                    div.ticket-attachment-container
                        width 100%
                        margin-left auto
                        margin-top 12px
                        direction ltr

                        div
                            padding 2px
                            position relative
                            display flex
                            transition all .3s ease-in-out

                            img.attachment-image
                                width 100%
                                height 100%
                                max-height 90px
                                cursor pointer
                                object-fit cover
                                border-radius 5px
                                transition all .3s ease-in-out

                            img.attachment-zoom
                                width 42px
                                height 42px
                                top 25%
                                left 36%
                                opacity 0
                                padding 12px
                                background-color rgba(27, 28, 32, 0.4)
                                border-radius 15px
                                position absolute
                                pointer-events none
                                transition all .3s ease-in-out

                        div:hover

                            img.attachment-image
                                filter blur(2px)

                            img.attachment-zoom
                                opacity 1


            div.chat-input-container
                background-color #fefefe
                border-radius 2px
                box-shadow 0 2px 6px rgba(0, 0, 0, 0.07)
                width 100%
                min-height 44px
                height max-content
                display flex
                flex-direction row
                padding 4px 8px
                margin-top 2px

                div.send-message-action-container
                    flex .05
                    display flex
                    margin-left 8px

                    img
                        margin auto
                        cursor pointer
                        width 18px
                        height 18px
                        filter none
                        transition all .3s ease-in-out
                        transform scale(.9)

                    img:hover
                        transform scale(1)
                        filter drop-shadow(0 2px 6px rgba(0, 0, 0, .3))

                div.message-input-container
                    display flex
                    flex .95
                    flex-direction row
                    background-color #F2F2F2
                    border-radius 20px
                    height 100%
                    padding 8px 0

                    div.message-input-divider
                        width 1px
                        margin 1px 0 1px 12px
                        background-color #cfcfcf

                    textarea.message-input
                        padding-left 12px
                        font-size .9em
                        font-family yekan-number-regular
                        color #3c3c3c
                        width 100%
                        line-height normal
                        outline none
                        margin-bottom 0
                        resize none

    .attachment-preview-container
        display inline-flex
        list-style none


    .upload-btn-wrapper2
        overflow hidden
        display flex
        position relative
        padding: 0 20px;
        justify-content: space-between;
        align-items: center;
        transform translateX(8px)

        img.button-attach-file
            top auto
            left auto
            cursor pointer
            width 18px
            height 18px
            opacity .6
            position absolute
            transition all .3s ease-in-out

        img.button-attach-file:hover
            opacity 1

        input[type=file]
            opacity 0
            top auto
            left auto
            margin auto
            position absolute
            height 18px
            width 18px


    .new-ticket-container
        width 100%
        display flex
        flex-direction row
        @media only screen and (max-width 992px)
            flex-direction column

        div.new-ticket-right-pane
            margin-right 0
            flex .45
            margin-left 12px
            @media only screen and (max-width 992px)
                margin-left 0
                flex unset

            div.new-ticket-title-container
                width 100%
                border-radius 2px
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)
                display flex
                flex-direction column
                background-color #fefefe
                margin-top 16px
                transition all .3s ease-in-out

                div.new-ticket-title-inner-container
                    width 100%
                    display flex
                    border-top-right-radius 2px
                    border-top-left-radius 2px
                    flex-direction row
                    background-color #0045ff
                    padding 8px 16px

                textarea.new-ticket-title-input
                    width 100%
                    padding 12px 16px
                    font-family yekan-number-regular
                    font-size 1em
                    background-color #fefefe
                    outline none
                    border-bottom-left-radius 2px
                    border-bottom-right-radius 2px
                    line-height 1.75
                    height 75px
                    vertical-align middle
                    resize none

            div.new-ticket-title-container:hover
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.45)


            div.new-ticket-department-container
                width 100%
                display flex
                flex-direction column
                margin-top 8px

                div.new-ticket-department-selection
                    width 100%
                    background-color #fefefe
                    box-shadow 0 2px 6px rgba(0, 0, 0, 0.25)
                    display flex
                    flex-direction column
                    border-radius 2px
                    overflow-y auto
                    transition all .3s ease-in-out

                    div.department-selection-label-container
                        width 100%
                        display flex
                        flex-direction row
                        background-color #0045ff
                        height 45px

                        p
                            font-size 1em
                            font-weight normal
                            font-family iran-yekan
                            width 100%
                            color #fefefe
                            padding 0 16px
                            margin-bottom auto
                            margin-top auto

                        img
                            transform rotate(180deg)
                            filter invert(0)
                            width 24px
                            margin-left 12px
                            padding 4px
                            height 24px
                            margin-right auto
                            margin-top 11px

                    div.department-selection-list-container
                        width 100%
                        min-height 100px
                        max-height 250px
                        display flex
                        flex-direction column
                        border-radius 2px
                        overflow-y auto
                        @media only screen and (max-width 992px)
                            min-height 80px
                            max-height 200px

                        p
                            width 100%
                            line-height 36px
                            font-size .9em
                            font-family iran-yekan
                            margin 0
                            padding 0 16px
                            cursor pointer
                            transition all .3s ease-in-out

                        p:hover
                            background-color rgba(127, 130, 139, 0.15)


            div.new-ticket-attachment-container
                overflow hidden
                display flex
                position relative
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.25)
                width 100%
                height 45px
                margin-top 8px
                background-color #fefefe
                transition all .3s ease-in-out

                input
                    opacity 0
                    top auto
                    left auto
                    margin auto
                    position absolute
                    height 100%
                    width 100%

                div.new-ticket-attachment-label-container
                    cursor pointer
                    height 100%
                    position absolute
                    background-color #00dffa
                    width 100%
                    display flex
                    flex-direction row
                    transition all .3s ease-in-out


                    p
                        font-size 1em
                        font-weight normal
                        font-family iran-yekan
                        width 100%
                        padding 0 16px
                        margin-bottom auto
                        margin-top auto
                        color #2c2c2c

                    img
                        transform rotate(180deg) scale(1.1)
                        width 16px
                        height 16px
                        margin auto auto auto 16px
                        filter invert(0)

            div.new-ticket-attachment-container:hover
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.45)

                div.new-ticket-attachment-label-container
                    background-color #00E5FF

            div.new-ticket-attachment-preview-container
                width 100%
                height max-content
                max-width 520px
                overflow-x auto
                background-color rgba(0, 0, 0, 0.1)
                border-bottom-left-radius 2px
                border-bottom-right-radius 2px
                margin 0

        div.new-ticket-message-text-input
            flex .57
            margin-top 16px
            display flex
            height max-content
            overflow-y scroll
            flex-direction column
            background-color #fefefe
            border-radius 2px
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.25)
            transition all .3s ease-in-out
            @media only screen and (max-width 992px)
                flex unset
                margin-top 8px

            textarea
                width 100%
                min-height 395px
                max-height 500px
                font-family yekan-number-regular
                font-size 1em
                outline none
                background-color #fefefe
                border-bottom-right-radius 2px
                border-bottom-left-radius 2px
                padding 16px
                line-height 1.75
                resize none
                @media only screen and (max-width 992px)
                    min-height 200px
                    max-height 400px

        div.new-ticket-message-text-input:hover
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.45)

    .new-ticket-label
        font-size 1em
        font-weight normal
        font-family iran-yekan
        width 100%
        color #fefefe
        border-top-left-radius 2px
        border-top-right-radius 2px
        margin-bottom 0


    .new-ticket-input-counter
        font-size .8em
        font-weight normal
        font-family iran-sans
        color #fefefe
        margin-bottom auto
        margin-top auto
        margin-right auto


</style>

<style lang="stylus">

    .ticket-status-pending
        display flex
        border-radius 5px
        margin 0 8px
        background-color rgba(0, 69, 255, 0.1)

        p
            margin auto
            color #0045FF
            font-size .9em

    .ticket-status-closed
        background-color rgba(96, 96, 96, 0.1)
        display flex
        border-radius 5px
        margin 0 8px

        p
            margin auto
            color rgba(96, 96, 96, 1)
            font-size .9em

    .ticket-status-admin-answer
        background-color rgba(60, 204, 56, 0.1)
        display flex
        border-radius 5px
        margin 0 8px

        p
            margin auto
            color rgba(60, 204, 56, 1)
            font-size .9em

    .ticket-status-user-answer
        background-color rgba(36, 213, 216, 0.1)
        display flex
        border-radius 5px
        margin 0 8px

        p
            margin auto
            color rgba(36, 213, 216, 1)
            font-size .9em

</style>

<style lang="css">

    .preview-style {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 6px 4px;
        border-radius: 3px;
        box-shadow: none;
        display: flex;
        transition: all .3s ease-in-out;
        cursor: pointer;
    }

    .preview-style .remove-thumb-btn {
        width: 48px;
        height: 48px;
        position: absolute;
        top: 26px;
        left: 26px;
        padding: 12px;
        opacity: 0;
        background-color: rgba(27, 28, 32, 0.4);
        border-radius: 15px;
        border: none;
        outline: none;
        pointer-events: none;
        transition: all .3s ease-in-out;
    }

    .main-img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        object-fit: cover;
        transition: all .3s ease-in-out;
    }

    .main-img:hover {
        filter: blur(2px);
        -webkit-filter: blur(2px);
    }

    .preview-style:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.37);
    }

    .preview-style:hover .remove-thumb-btn {
        opacity: 1;
        pointer-events: none;
    }


    .fade-enter-active {
        transition: opacity .3s ease-in-out;
    }

    .fade-enter, .fade-leave-to, .fade-leave-active {
        opacity: 0;
    }

</style>
