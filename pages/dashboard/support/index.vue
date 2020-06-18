<template>

    <div class="row" style="width: 100%; margin-left: 0; margin-right: 0;">

        <div class="container-fluid col-lg-11 col-md-11 col-xs-12 col-sm-12">

            <div style="width: 100%;">
                <transition name="fade">
                    <div v-if="page_status === 'index'" class="right" style="float: right;"><p
                            class="title_header">{{page_title}}</p>
                    </div>
                    <div v-else class="right" style="float: right;"><p class="title_header">
                        {{new_ticket_title}}</p>
                    </div>
                </transition>

                <div class="support-header-container">

                    <div class="support-header-action-container">

                        <button v-if="page_status === 'index'"
                                class="support-new-ticket-button"
                                @click="page_status = 'new_ticket'">
                            {{new_ticket_text}}
                        </button>

                    </div>

                    <!--<div v-if="page_status !== 'index'" class="support-header-search-bar">-->

                        <!--<div class="support-search-bar-action-container">-->
                            <!--<img src="../../../assets/svg/ic-search.svg" alt="search">-->
                        <!--</div>-->


                        <!--<div class="support-header-search-container">-->
                            <!--<input :placeholder="search_hint">-->
                        <!--</div>-->

                    <!--</div>-->

                    <div v-if="page_status !== 'index'" class="support-header-ticket-details">
                        <p class="ticket-details-title">{{new_ticket_title}}</p>
                    </div>

                </div>

                <div v-if="page_status === 'index'" style="margin-left: 0; margin-right: 0">

                    <ticket-complete-row
                            v-if="tickets.results"
                            style="margin-left: 0; margin-right: 0;"
                            :header="titleRowComplete"
                            :func="displayTicketDetails"
                            :is_simple="is_simple"
                            :cel-specs="tickets.results">
                    </ticket-complete-row>

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
                                      v-model="ticket_title"
                                      class="new-ticket-title-input"
                                      @input="e => this.ticket_title = e.target.value"
                                      :placeholder="ticket_title_hint">
                            </textarea>

                        </div>

                        <div class="new-ticket-department-container">

                            <transition name="fade">

                                <div v-if="!show_departments"
                                     class="new-ticket-department-label-container"
                                     @click="show_departments = !show_departments">

                                    <p>{{ this.selected_department ?
                                        this.selected_department.local_name :
                                        this.select_department_label }}
                                    </p>

                                    <img src="../../../assets/svg/arrow.svg"/>

                                </div>

                                <div v-if="show_departments"
                                     class="new-ticket-department-selection">

                                    <div @click="show_departments = !show_departments"
                                         class="department-selection-label-container">

                                        <p>{{department_title}}</p>

                                        <img src="../../../assets/svg/arrow.svg"
                                             alt="open"/>

                                    </div>

                                    <div class="department-selection-divider"></div>

                                    <div class="department-selection-list-container">

                                        <p @click="chooseDepartment(index)"
                                           v-for="(dep, index) in department_options">
                                            {{dep.local_name}}
                                        </p>

                                    </div>

                                </div>
                            </transition>

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

                        <div style="width: 100%; display: flex; flex-direction: row; background-color: #0045ff; padding: 12px 16px;">
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
                                  @input="e => this.ticket_description = e.target.value"
                                  v-model="ticket_description"
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
        name: 'index',
        layout: 'dashboard',
        components: {
            TicketCompleteRow,
            TitleRow,
            File,
            Moment

        }, data() {
            return {
                message: '',
                page_title: 'پشتیبانی',
                page_status: 'index',
                new_ticket_title: 'تیکت جدید...',
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
                is_simple: false,
                tickets: {},
                ticket_replies: {},
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
            chooseDepartment(index) {
                this.selected_department = this.department_options[index];
                this.show_departments = false;
            },
            cancelNewTicket() {
                this.selected_department = null;
                this.show_departments = false;
                this.ticket_title = '';
                this.ticket_description = '';
                this.page_status = 'index';
                if (this.source) {
                    document.getElementById('thumbnail-container-2').innerHTML = '';
                    this.source = null;
                }
            },
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

                }catch (e) {
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
            displayTicketDetails(index) {
                this.$router.push(`/dashboard/support/${this.tickets.results[index].id}`);
            },
            changeFiles(target) {

                var files = target.files;

                if (this.source) {
                    if (document.getElementById(this.page_status === 'index' ? 'thumbnail-container' : 'thumbnail-container-2').children.length > 0)
                        document.getElementById(this.page_status === 'index' ? 'thumbnail-container' : 'thumbnail-container-2').innerHTML = ''
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

                    document.getElementById(vm.page_status === 'index' ? 'thumbnail-container' : 'thumbnail-container-2').appendChild(DOM_div);

                    document.getElementById(`thumbnail-${file.name}`).addEventListener('click', function () {
                        vm.source = Array.from(vm.source).filter(function (item) {
                            return item.name !== file.name
                        });
                        if (vm.source.length === 0) {
                            vm.source = null
                        }
                        document.getElementById(vm.page_status === 'index' ? 'thumbnail-container' : 'thumbnail-container-2').removeChild(DOM_div);
                    }, false);
                }
            },
        },
        created() {
            this.getData()
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


    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
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

    .attachment-preview-container
        display inline-flex
        list-style none

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
                flex unset
                margin-left 0

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
                    padding 12px 16px

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

                div.new-ticket-department-label-container
                    border-radius 2px
                    cursor pointer
                    height 45px
                    width 100%
                    display flex
                    flex-direction row
                    box-shadow 0 3px 6px rgba(0, 0, 0, 0.25)
                    background-color #0045ff
                    transition all .3s ease-in-out

                    p
                        font-size 1em
                        font-weight normal
                        font-family iran-yekan
                        width 100%
                        padding 0 16px
                        margin-bottom auto
                        margin-top auto
                        color #fefefe

                    img
                        transform rotate(180deg)
                        filter invert(0)
                        width 16px
                        height 16px
                        margin auto auto auto 16px

                div.new-ticket-department-selection
                    width 100%
                    background-color #fefefe
                    box-shadow 0 2px 6px rgba(0, 0, 0, 0.25)
                    display flex
                    flex-direction column
                    border-radius 2px
                    overflow-y auto
                    cursor pointer
                    transition all .3s ease-in-out

                    div.department-selection-label-container
                        width 100%
                        display flex
                        flex-direction row

                        p
                            font-size 1em
                            font-weight normal
                            font-family iran-yekan
                            width 100%
                            padding 0 16px
                            margin-bottom auto
                            margin-top 10px
                            opacity 0.4

                        img
                            transform rotate(180deg)
                            filter invert(1)
                            width 24px
                            margin-left 12px
                            padding 4px
                            height 24px
                            margin-right auto
                            margin-top 11px


                    div.department-selection-divider
                        height 1px
                        background-color #F2F2F2
                        margin 12px 16px

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
                            @media only screen and (max-width 992px)
                                line-height 32px


                        p:hover
                            background-color rgba(127, 130, 139, 0.25)


                div.new-ticket-department-label-container:hover
                    box-shadow 0 3px 6px rgba(0, 0, 0, 0.45)
                    background-color #005dff

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
                    background-color #0045ff
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
                        color #fefefe

                    img
                        transform rotate(180deg) scale(1.1)
                        width 16px
                        height 16px
                        margin auto auto auto 16px
                        filter invert(1)

            div.new-ticket-attachment-container:hover
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.45)

                div.new-ticket-attachment-label-container
                    background-color #005dff

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
                min-height 300px
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
